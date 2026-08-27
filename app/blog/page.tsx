import { getArticles } from '@/lib/cms/queries'
import BlogClient from './blog-client'

export const metadata = {
  title: 'Blog & Articles | Al Kalthoum Group',
  description: 'News, tips, and agricultural insights from Al Kalthoum Group.',
}

export default async function BlogPage() {
  const articles = await getArticles(true)
  return <BlogClient articles={articles} />
}
