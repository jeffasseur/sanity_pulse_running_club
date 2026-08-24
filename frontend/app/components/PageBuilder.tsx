import BlockRenderer from '@/app/components/BlockRenderer'
import {dataAttr} from '@/sanity/lib/utils'
import {PageBuilderSection} from '@/sanity/lib/types'

// Shared shape for any document with a page builder (e.g. `page`, `homePage`)
type PageData = {
  _id: string
  _type: string
  pageBuilder?: PageBuilderSection[] | null
}

type PageBuilderPageProps = {
  page: PageData | null
}

/**
 * The PageBuilder component is used to render the blocks from the `pageBuilder` field in the Page type in your Sanity Studio.
 */

function RenderSections({
  pageBuilderSections,
  page,
}: {
  pageBuilderSections: PageBuilderSection[]
  page: PageData | null
}) {
  if (!page) {
    return null
  }
  return (
    <div
      data-sanity={dataAttr({
        id: page._id,
        type: page._type,
        path: `pageBuilder`,
      }).toString()}
    >
      {pageBuilderSections.map((block, index: number) => (
        <BlockRenderer
          key={block._key}
          index={index}
          block={block}
          pageId={page._id}
          pageType={page._type}
        />
      ))}
    </div>
  )
}

export default function PageBuilder({page}: PageBuilderPageProps) {
  const pageBuilderSections = page?.pageBuilder || []

  return pageBuilderSections.length > 0 ? (
    <RenderSections pageBuilderSections={pageBuilderSections} page={page} />
  ) : null
}
