import {defineField} from 'sanity'

/**
 * Shared page builder block list and field, reused by any document that needs
 * a page builder (e.g. `page`, `homePage`) so the set of available blocks stays
 * in sync across them.
 */

export const pageBuilderBlockTypes = [
  {type: 'callToAction'},
  {type: 'infoSection'},
  {type: 'heroAbout'},
  {type: 'runsOverviewSection'},
  {type: 'introTextSection'},
  {type: 'featuresGridSection'},
  {type: 'twoColsImageParallaxSection'},
]

export const pageBuilderField = () =>
  defineField({
    name: 'pageBuilder',
    title: 'Page builder',
    type: 'array',
    of: pageBuilderBlockTypes,
    options: {
      insertMenu: {
        // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/studio/array-type#efb1fe03459d
        views: [
          {
            name: 'grid',
            previewImageUrl: (schemaTypeName: string) =>
              `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
          },
        ],
      },
    },
  })
