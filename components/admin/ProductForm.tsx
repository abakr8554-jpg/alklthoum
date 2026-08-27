'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ActionForm } from '@/components/admin/ActionForm'
import { saveProductAction } from '@/app/admin/actions'

const CATEGORIES = [
  { value: 'seeds', label: 'Seeds — بذور' },
  { value: 'sona-plant-plastic', label: 'Sona Plant Plastic' },
  { value: 'hoses', label: 'Hoses — خراطيم' },
  { value: 'fertilizers-pesticides', label: 'Fertilizers & Pesticides — أسمدة ومبيدات' },
  { value: 'soil', label: 'Soil — تربة' },
]

export type ProductFormValues = {
  id?: string
  name?: string
  nameAr?: string
  slug?: string
  category?: string
  companyId?: string | null
  shortDescription?: string
  shortDescriptionAr?: string
  description?: string
  descriptionAr?: string
  images?: string
  published?: boolean
  aiRecommended?: boolean
}

interface ImageItem {
  url: string
  uploading?: boolean
  error?: string
}

export function ProductForm({
  product,
  companies,
}: {
  product?: ProductFormValues
  companies: { id: string; name: string }[]
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  // All images (existing + newly uploaded) as URL strings
  const initialImages: ImageItem[] = (product?.images || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((url) => ({ url }))

  const [images, setImages] = useState<ImageItem[]>(initialImages)

  // The value that goes into the hidden <input name="images">
  const imagesValue = images
    .filter((img) => !img.uploading && !img.error && img.url)
    .map((img) => img.url)
    .join('\n')

  const uploadFile = useCallback(async (file: File) => {
    const tempId = `uploading-${Date.now()}-${Math.random()}`
    const previewUrl = URL.createObjectURL(file)

    // Add placeholder
    setImages((prev) => [...prev, { url: previewUrl, uploading: true }])

    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const json = await res.json()

      if (!res.ok || json.error) throw new Error(json.error || 'Upload failed')

      // Replace placeholder with real URL
      setImages((prev) =>
        prev.map((img) =>
          img.url === previewUrl ? { url: json.url } : img,
        ),
      )
    } catch (err) {
      setImages((prev) =>
        prev.map((img) =>
          img.url === previewUrl
            ? { url: previewUrl, error: 'فشل الرفع' }
            : img,
        ),
      )
    }
  }, [])

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files).filter((f) => f.type.startsWith('image/'))
      arr.forEach((f) => uploadFile(f))
    },
    [uploadFile],
  )

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files)
    e.target.value = ''
  }

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx))
  }

  const retryUpload = (idx: number, file?: File) => {
    // Can only retry if we still have the blob URL (means it was a fresh upload attempt)
    const img = images[idx]
    if (!img) return
    removeImage(idx)
    // File object isn't stored, user needs to re-select
  }

  const isUploading = images.some((img) => img.uploading)

  return (
    <ActionForm action={saveProductAction}>
      {product?.id ? <input type="hidden" name="id" value={product.id} /> : null}

      {/* Hidden field carries final image URLs to the server action */}
      <input type="hidden" name="images" value={imagesValue} />

      <div className="admin-form-grid">
        {/* Names */}
        <div className="admin-field">
          <label htmlFor="name">الاسم بالإنجليزي</label>
          <input id="name" name="name" required defaultValue={product?.name || ''} placeholder="e.g. Hend Hybrid Cantaloupe F1" />
        </div>
        <div className="admin-field">
          <label htmlFor="nameAr">الاسم بالعربي</label>
          <input id="nameAr" name="nameAr" required defaultValue={product?.nameAr || ''} dir="rtl" placeholder="مثال: هند - هجين شمام" />
        </div>

        {/* Slug + Category */}
        <div className="admin-field">
          <label htmlFor="slug">
            Slug <span className="hint">(اختياري — يُولَّد تلقائياً)</span>
          </label>
          <input id="slug" name="slug" defaultValue={product?.slug || ''} />
        </div>
        <div className="admin-field">
          <label htmlFor="category">الفئة</label>
          <select id="category" name="category" required defaultValue={product?.category || 'seeds'}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Company */}
        <div className="admin-field admin-field-full">
          <label htmlFor="companyId">الشركة</label>
          <select id="companyId" name="companyId" defaultValue={product?.companyId || ''}>
            <option value="">— بدون شركة —</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Short descriptions */}
        <div className="admin-field admin-field-full">
          <label htmlFor="shortDescription">وصف قصير (إنجليزي)</label>
          <textarea id="shortDescription" name="shortDescription" rows={2} defaultValue={product?.shortDescription || ''} />
        </div>
        <div className="admin-field admin-field-full">
          <label htmlFor="shortDescriptionAr">وصف قصير (عربي)</label>
          <textarea id="shortDescriptionAr" name="shortDescriptionAr" rows={2} defaultValue={product?.shortDescriptionAr || ''} dir="rtl" />
        </div>

        {/* Full descriptions */}
        <div className="admin-field admin-field-full">
          <label htmlFor="description">الوصف الكامل (إنجليزي)</label>
          <textarea id="description" name="description" rows={5} defaultValue={product?.description || ''} />
        </div>
        <div className="admin-field admin-field-full">
          <label htmlFor="descriptionAr">الوصف الكامل (عربي)</label>
          <textarea id="descriptionAr" name="descriptionAr" rows={5} defaultValue={product?.descriptionAr || ''} dir="rtl" />
        </div>

        {/* ── IMAGE UPLOAD ─────────────────────────────────── */}
        <div className="admin-field admin-field-full">
          <label>
            الصور
            {images.length > 0 && (
              <span className="hint" style={{ marginInlineStart: 8 }}>
                ({images.filter((i) => !i.error).length} صورة
                {isUploading ? ' — جارٍ الرفع…' : ''})
              </span>
            )}
          </label>

          {/* Image grid */}
          {images.length > 0 && (
            <div className="img-preview-row" style={{ marginBottom: 10 }}>
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`img-thumb-wrap ${img.uploading ? 'uploading' : ''} ${img.error ? 'img-error' : ''}`}
                >
                  <img src={img.url} alt="" className="img-thumb" />

                  {img.uploading && (
                    <div className="img-uploading-overlay">
                      <span className="img-spinner">↻</span>
                    </div>
                  )}

                  {img.error && (
                    <div className="img-uploading-overlay img-error-overlay">
                      <span style={{ fontSize: 10, color: '#fff', textAlign: 'center', padding: 2 }}>
                        {img.error}
                      </span>
                    </div>
                  )}

                  {!img.uploading && (
                    <button
                      type="button"
                      className="img-thumb-remove"
                      onClick={() => removeImage(idx)}
                      title="حذف"
                    >
                      ✕
                    </button>
                  )}

                  {img.uploading && (
                    <span className="img-new-badge">رفع…</span>
                  )}
                </div>
              ))}

              {/* +Add more tile */}
              <button
                type="button"
                className="img-thumb-wrap img-add-more"
                onClick={() => fileInputRef.current?.click()}
              >
                <span className="img-add-icon">+</span>
                <span className="img-add-label">إضافة</span>
              </button>
            </div>
          )}

          {/* Drop zone (shown when no images) */}
          {images.length === 0 && (
            <div
              className={`img-drop-zone ${isDragging ? 'dragging' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="img-drop-icon">📷</div>
              <p className="img-drop-text">اسحب الصور هنا أو اضغط للاختيار</p>
              <p className="img-drop-hint">PNG · JPG · WEBP — يمكن اختيار أكثر من صورة</p>
            </div>
          )}

          {/* Compact drop zone when images exist */}
          {images.length > 0 && (
            <div
              className={`img-drop-zone img-drop-zone-sm ${isDragging ? 'dragging' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <p className="img-drop-text" style={{ fontSize: 13 }}>
                📷 اسحب المزيد من الصور هنا أو اضغط للاختيار
              </p>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        {/* ── END IMAGE SECTION ─────────────────────────────── */}

        {/* Toggles */}
        <div className="admin-field">
          <label className="admin-check">
            <input type="checkbox" name="published" defaultChecked={product?.published ?? true} />
            منشور
          </label>
        </div>
        <div className="admin-field">
          <label className="admin-check">
            <input type="checkbox" name="aiRecommended" defaultChecked={product?.aiRecommended ?? false} />
            موصى به بالذكاء الاصطناعي
          </label>
        </div>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn admin-btn-primary" disabled={isUploading}>
          {isUploading ? '⏳ جارٍ رفع الصور…' : '💾 حفظ المنتج'}
        </button>
        <Link href="/admin/products" className="admin-btn admin-btn-secondary">
          إلغاء
        </Link>
      </div>
    </ActionForm>
  )
}
