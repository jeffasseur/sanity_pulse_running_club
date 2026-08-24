import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

/**
 * Full-width quote/statement section: an optional icon above a single large
 * oversized quote. Learn more: https://www.sanity.io/docs/studio/object-type
 */

export const introTextSection = defineType({
  name: 'introTextSection',
  title: 'Intro Text Section',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'quote',
      media: 'icon',
    },
    prepare({title, media}) {
      return {
        title: title || 'Untitled Intro Text Section',
        subtitle: 'Intro Text Section',
        media,
      }
    },
  },
})
