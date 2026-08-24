import type {Metadata} from 'next'

import Faq from '@/app/components/Faq'
import {sanityFetch} from '@/sanity/lib/live'
import {faqsQuery} from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'FAQ',
}

export default async function FaqPage() {
  const {data: faqs} = await sanityFetch({query: faqsQuery})

  return (
    <div className="container my-12 lg:my-24">
      <h1 className="text-4xl text-gray-900 sm:text-5xl mb-12">Frequently Asked Questions</h1>
      <Faq faqs={faqs} />
    </div>
  )
}
