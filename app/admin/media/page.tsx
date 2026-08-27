import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/PageHeader'
import { MediaUploadForm } from '@/components/admin/MediaUploadForm'

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

export default async function MediaPage() {
  const assets = await prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <>
      <PageHeader
        title="الوسائط"
        description={`${assets.length} ملف`}
      />

      <div className="admin-card">
        <h2>رفع ملف</h2>
        <MediaUploadForm />
      </div>

      <div className="admin-card">
        <h2>مكتبة الوسائط</h2>
        {assets.length === 0 ? (
          <p className="admin-empty">لا توجد وسائط بعد.</p>
        ) : (
          <div className="admin-media-grid">
            {assets.map((a) => (
              <div key={a.id} className="admin-media-item">
                {a.mimeType.startsWith('image/') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.url} alt={a.alt || a.filename} />
                ) : (
                  <div
                    style={{
                      height: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#ebeae3',
                      color: '#5a6b62',
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {a.mimeType}
                  </div>
                )}
                <div className="admin-media-meta">
                  <strong title={a.filename}>{a.filename}</strong>
                  <div className="admin-mono">{a.url}</div>
                  <div>
                    {formatBytes(a.size)} · {a.folder}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
