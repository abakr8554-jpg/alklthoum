'use server'

import { getProducts } from '@/lib/cms/queries'

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
  recommendedProductIds: ['diamond-standard-46xxu', 'diamond-salt-destroy-nz62t', 'diamond-phosphoric-6xcdt'],
  diseaseId: 'early-blight',
}

export async function analyzeImage(base64Image: string): Promise<AIAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY

  // ── Gemini Vision path ──────────────────────────────────────────────────────
  if (apiKey) {
    try {
      const allProducts = await getProducts()
      const diamondProducts = allProducts.filter(p => p.companyId === 'diamond' || p.id.includes('diamond'))
      const productCatalogString = diamondProducts.map(p => `- ID: "${p.id}" | Name: ${p.name} | Description: ${p.shortDescription}`).join('\n')

      const prompt = `You are an expert agricultural plant pathologist AI. Analyze this plant image carefully.

Return a JSON object with EXACTLY these fields (no extra fields):
{
  "plantName": "English plant name",
  "plantNameAr": "Arabic plant name",
  "diseaseName": "English disease name",
  "diseaseNameAr": "Arabic disease name",
  "confidence": 85,
  "severity": "medium",
  "description": "2-3 sentence English description of the disease",
  "descriptionAr": "2-3 sentence Arabic description",
  "cause": "English cause explanation",
  "causeAr": "Arabic cause explanation",
  "treatmentSteps": ["step 1", "step 2", "step 3", "step 4"],
  "treatmentStepsAr": ["خطوة 1", "خطوة 2", "خطوة 3", "خطوة 4"],
  "preventionTips": ["tip 1", "tip 2", "tip 3"],
  "preventionTipsAr": ["نصيحة 1", "نصيحة 2", "نصيحة 3"],
  "recommendedProductIds": ["product-id-1", "product-id-2"]
}

Diamond Products Catalog (Our specialized agricultural products):
${productCatalogString}

Rules:
- severity must be exactly "low", "medium", or "high"
- confidence is an integer 0-100
- if plant appears healthy, set diseaseName to "Healthy Plant" and diseaseNameAr to "نبات صحي"
- IMPORTANT: You MUST pick 1 to 3 suitable product IDs from the "Diamond Products Catalog" above to fill "recommendedProductIds" if they are applicable to treat the disease or improve plant health. Only use the exact IDs provided.
- Return ONLY valid JSON, no markdown, no explanation`

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    inlineData: {
                      mimeType: 'image/jpeg',
                      data: base64Image,
                    },
                  },
                  { text: prompt },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 2048,
            },
          }),
        },
      )

      if (!res.ok) throw new Error(`Gemini API error: ${res.status}`)

      const data = await res.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const parsed = JSON.parse(cleaned) as AIAnalysisResult

      // Match recommended products from our catalog based on disease keywords
      const products = await getProducts(true)
      const matchedProducts = products
        .filter(
          (p) =>
            p.aiRecommended ||
            p.targetCrops.some((c) =>
              parsed.plantName.toLowerCase().includes(c.toLowerCase()),
            ),
        )
        .slice(0, 3)
        .map((p) => p.id)

      return {
        ...parsed,
        recommendedProductIds:
          parsed.recommendedProductIds?.length > 0
            ? parsed.recommendedProductIds
            : matchedProducts,
      }

    } catch (err) {
      console.error('Gemini analysis failed, falling back to mock:', err)
      // Fall through to mock
    }
  }

  // ── Mock/demo fallback ──────────────────────────────────────────────────────
  // Simulate a short delay like a real API call
  await new Promise((r) => setTimeout(r, 1800))
  return MOCK_RESULT
}
