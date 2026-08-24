import {CogIcon, HomeIcon} from '@sanity/icons'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['settings', 'homePage', 'assist.instruction.context']
// Ordered manually via the orderable-document-list pane below, so exclude from the default list.
const ORDERABLE_TYPES = ['faq']

export const structure: StructureResolver = (S: StructureBuilder, context) =>
  S.list()
    .title('Website Content')
    .items([
      ...S.documentTypeListItems()
        // Remove the "assist.instruction.context" and "settings" content  from the list of content types
        .filter(
          (listItem: any) =>
            !DISABLED_TYPES.includes(listItem.getId()) &&
            !ORDERABLE_TYPES.includes(listItem.getId()),
        )
        // Pluralize the title of each document type.  This is not required but just an option to consider.
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),
      // FAQs are manually ordered via drag-and-drop, backed by @sanity/orderable-document-list
      orderableDocumentListDeskItem({type: 'faq', title: 'FAQs', S, context}),
      // Homepage Singleton in order to view/edit the one particular document for the Homepage.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Homepage')
        .child(S.document().schemaType('homePage').documentId('homePage'))
        .icon(HomeIcon),
      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
