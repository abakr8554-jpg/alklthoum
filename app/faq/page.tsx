import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FaqList from '@/components/FaqList'
import { getFaqs } from '@/lib/cms/queries'

export const metadata = {
  title: 'FAQ | Al Kalthoum Group',
  description: 'Frequently asked questions about Al Kalthoum Group products and services.',
}

export default async function FaqPage() {
  const faqs = await getFaqs(true)
  const items = faqs.map((f) => ({
    id: f.id,
    question: f.question,
    questionAr: f.questionAr,
    answer: f.answer,
    answerAr: f.answerAr,
  }))

  return (
    <main id="top">
      <Header variant="solid" />
      <section className="page-hero" style={{ background: 'var(--ink)', minHeight: 280 }}>
        <div className="page-hero-content">
          <p className="kicker light">Help</p>
          <h1 className="page-hero-title">
            Frequently asked <em>questions</em>
          </h1>
        </div>
      </section>
      <FaqList items={items} />
      <Footer />
    </main>
  )
}
