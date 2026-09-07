import 'server-only'

/**
 * Persist an uploaded file and return a public URL.
 *
 * On Vercel the filesystem is read-only, so we store to Vercel Blob when a
 * BLOB_READ_WRITE_TOKEN is present. Locally (no token) we fall back to writing
 * into public/uploads so `npm run dev` keeps working without any setup.
 */
export async function saveUpload(
  data: Buffer | ArrayBuffer,
  filename: string,
  contentType: string,
): Promise<string> {
  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data)

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import('@vercel/blob')
    const blob = await put(`uploads/${filename}`, buffer, {
      access: 'public',
      contentType,
      addRandomSuffix: false,
    })
    return blob.url
  }

  // Local dev fallback
  const { writeFile, mkdir } = await import('node:fs/promises')
  const path = await import('node:path')
  const dir = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, filename), buffer)
  return `/uploads/${filename}`
}
