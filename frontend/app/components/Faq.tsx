import {type PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import {FaqsQueryResult} from '@/sanity.types'
import {dataAttr} from '@/sanity/lib/utils'

const UNCATEGORIZED = 'General'

const groupByCategory = (faqs: FaqsQueryResult) => {
  const groups = new Map<string, FaqsQueryResult>()

  for (const faq of faqs) {
    const category = faq.category || UNCATEGORIZED
    const existing = groups.get(category) ?? []
    existing.push(faq)
    groups.set(category, existing)
  }

  return groups
}

export default function Faq({faqs}: {faqs: FaqsQueryResult}) {
  if (!faqs.length) {
    return null
  }

  const groups = groupByCategory(faqs)

  return (
    <div className="space-y-12">
      {Array.from(groups.entries()).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-2xl text-gray-900 mb-6">{category}</h2>
          <dl className="space-y-8">
            {items.map((faq) => (
              <div
                key={faq._id}
                data-sanity={dataAttr({id: faq._id, type: 'faq', path: 'question'}).toString()}
              >
                <dt className="text-lg font-medium text-gray-900">{faq.question}</dt>
                <dd className="mt-2 prose text-gray-600">
                  <PortableText value={faq.answer as PortableTextBlock[]} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}
