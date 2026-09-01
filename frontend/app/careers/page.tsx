import type {Metadata} from 'next'

import CmsPageSection from '@/app/components/CmsPageSection'

export const metadata: Metadata = {
  title: 'Junior Webflow Developer',
  description: 'Open position at Pulse Running Club.',
}

export default function CareersPage() {
  return <CmsPageSection />
}
