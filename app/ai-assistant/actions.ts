'use server'

import { products as catalogProducts } from '@/lib/data'

export interface AIAnalysisResult {
  plantName: string
  plantNameAr: string
  diseaseName: string
  diseaseNameAr: string
  confidence: number
  severity: 'low' | 'medium' | 'high'
  description: string
  descriptionAr: string
  cause: string
  causeAr: string
  treatmentSteps: string[]
  treatmentStepsAr: string[]
  preventionTips: string[]
  preventionTipsAr: string[]
  recommendedProductIds: string[]
  diseaseId?: string
  /** true when returned by the offline demo fallback (no API key / API error) */
  demo?: boolean
}

const MOCK_RESULT: AIAnalysisResult = {
  plantName: 'Tomato',
  plantNameAr: 'الطماطم',
  diseaseName: 'Early Blight',
  diseaseNameAr: 'اللفحة المبكرة',
  confidence: 87,
  severity: 'medium',
  description:
    'Early blight is a common fungal disease caused by Alternaria solani. It presents as dark brown spots with characteristic concentric rings on lower leaves, giving a target-board appearance.',
  descriptionAr:
    'اللفحة المبكرة هي مرض فطري شائع ناجم عن Alternaria solani. يظهر على شكل بقع بنية داكنة بحلقات متحدة المركز على الأوراق السفلية.',
  cause:
    'Caused by the fungus Alternaria solani. Favored by warm temperatures (24–29°C), wet conditions, and overhead irrigation.',
  causeAr:
    'يسببه الفطر Alternaria solani. يزدهر في درجات الحرارة الدافئة (24–29 درجة مئوية) والظروف الرطبة والري فوق الرأس.',
  treatmentSteps: [
    'Apply copper-based or mancozeb fungicide immediately',
    'Remove and destroy heavily infected lower leaves',
    'Stake plants to improve airflow',
    'Apply organic mulch to prevent soil splash',
    'Re-apply fungicide every 7–10 days during wet periods',
  ],
  treatmentStepsAr: [
    'ضع مبيداً فطرياً نحاسياً أو مانكوزيب فوراً',
    'أزل وأتلف الأوراق السفلية المصابة بشدة',
    'دعّم النباتات لتحسين تدفق الهواء',
    'ضع تغطية عضوية لمنع رذاذ التربة',
    'أعد تطبيق المبيد الفطري كل 7–10 أيام خلال الفترات الرطبة',
  ],
  preventionTips: [
    'Rotate crops — avoid solanaceous plants in the same bed for 2+ years',
    'Choose resistant tomato varieties',
    'Use drip irrigation instead of overhead watering',
    'Apply preventive fungicide before wet weather forecasts',
    'Remove plant debris at end of season',
  ],
  preventionTipsAr: [
    'دوّر المحاصيل — تجنب نباتات العائلة الباذنجانية في نفس الأرض لأكثر من عامين',
    'اختر أصناف طماطم مقاومة',
    'استخدم الري بالتنقيط بدلاً من الري فوق الرأس',
    'ضع مبيداً فطرياً وقائياً قبل توقعات الطقس الرطب',
    'أزل بقايا النباتات في نهاية الموسم',
  ],
  recommendedProductIds: [],
  diseaseId: 'early-blight',
}

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash'

// A few sensible product picks for the offline demo, resolved to REAL catalog ids.
function demoRecommendations(): string[] {
  const picks = catalogProducts.filter((p) => p.aiRecommended).slice(0, 3)
  return (picks.length ? picks : catalogProducts.slice(0, 3)).map((p) => p.id)
}

export async function analyzeImage(
  base64Image: string,
  mimeType = 'image/jpeg',
): Promise<AIAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY

  // ── Gemini Vision path ──────────────────────────────────────────────────────
  if (apiKey) {
    try {
      // Build a compact catalog the model can recommend from. Uses the SAME
      // product ids the results UI resolves against, so picks always render.
      const catalog = catalogProducts
        .slice(0, 40)
        .map((p) => `- ID:"${p.id}" | ${p.name} | ${p.category} | ${p.shortDescription}`)
        .join('\n')

      const prompt = `You are an expert agricultural plant pathologist. Look at the plant image very carefully and identify the plant and any disease, pest damage, deficiency or stress visible.

Return ONLY a JSON object with EXACTLY these fields:
{
  "plantName": "English plant name",
  "plantNameAr": "اسم النبات بالعربية",
  "diseaseName": "English disease/problem name",
  "diseaseNameAr": "اسم المرض بالعربية",
  "confidence": 0-100 integer (how sure you are),
  "severity": "low" | "medium" | "high",
  "description": "2-3 sentence English description of what you see and the disease",
  "descriptionAr": "وصف بالعربية 2-3 جمل",
  "cause": "English explanation of the cause and favouring conditions",
  "causeAr": "شرح السبب بالعربية",
  "treatmentSteps": ["step 1", "step 2", "step 3", "step 4"],
  "treatmentStepsAr": ["خطوة 1", "خطوة 2", "خطوة 3", "خطوة 4"],
  "preventionTips": ["tip 1", "tip 2", "tip 3"],
  "preventionTipsAr": ["نصيحة 1", "نصيحة 2", "نصيحة 3"],
  "recommendedProductIds": ["id1", "id2"]
}

Product catalog — pick 1 to 3 relevant product IDs for treatment/improvement, using the EXACT IDs shown:
${catalog}

Rules:
- Base your answer ONLY on what is actually visible in the image. Do NOT default to tomato/early blight.
- If the plant looks healthy, set diseaseName to "Healthy Plant" and diseaseNameAr to "نبات سليم", severity "low", and give general care tips.
- If the image is not a plant, set plantName to "Unknown", diseaseName to "Not a plant image", confidence low, and leave arrays short.
- severity must be exactly "low", "medium" or "high"; confidence is an integer 0-100.
- Arabic fields must be natural Arabic, not transliteration.
- recommendedProductIds must be EXACT IDs from the catalog above (or an empty array if none fit).
- Return ONLY the JSON, no markdown, no commentary.`

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { inlineData: { mimeType: mimeType || 'image/jpeg', data: base64Image } },
                  { text: prompt },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 2048,
              responseMimeType: 'application/json',
            },
          }),
        },
      )

      if (!res.ok) {
        const body = await res.text().catch(() => '')
        throw new Error(`Gemini API ${res.status}: ${body.slice(0, 300)}`)
      }

      const data = await res.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const parsed = JSON.parse(cleaned) as AIAnalysisResult

      // Keep only product ids that actually exist so the UI can render them.
      const validIds = new Set(catalogProducts.map((p) => p.id))
      let rec = (parsed.recommendedProductIds || []).filter((id) => validIds.has(id))

      // Fallback: match by crop / AI-recommended flag if the model gave none.
      if (rec.length === 0) {
        const plant = (parsed.plantName || '').toLowerCase()
        rec = catalogProducts
          .filter(
            (p) =>
              p.aiRecommended ||
              p.targetCrops.some((c) => plant.includes(c.toLowerCase())),
          )
          .slice(0, 3)
          .map((p) => p.id)
      }

      return {
        ...parsed,
        confidence: Math.max(0, Math.min(100, Math.round(Number(parsed.confidence) || 0))),
        severity: (['low', 'medium', 'high'] as const).includes(parsed.severity)
          ? parsed.severity
          : 'medium',
        recommendedProductIds: rec,
      }
    } catch (err) {
      console.error('Gemini analysis failed, falling back to demo result:', err)
      // Fall through to demo
    }
  }

  // ── Offline demo fallback (no API key or API error) ─────────────────────────
  await new Promise((r) => setTimeout(r, 1200))
  return { ...MOCK_RESULT, recommendedProductIds: demoRecommendations(), demo: true }
}
