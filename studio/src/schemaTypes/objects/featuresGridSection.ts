import {defineArrayMember, defineField, defineType} from 'sanity'
import {ThLargeIcon} from '@sanity/icons'

/**
 * Features/audience section: a centered heading, a grid of full-bleed image
 * cards with overlaid text, and a CTA bar below. Learn more:
 * https://www.sanity.io/docs/studio/object-type
 */

export const featuresGridSection = defineType({
  name: 'featuresGridSection',
  title: 'Features Grid Section',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      description: 'Three cards fit the layout best.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'featureCard',
          title: 'Card',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {title: 'heading', media: 'image'},
          },
        }),
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'boldText',
          title: 'Bold Text',
          type: 'string',
          description: 'Example: Need a custom setup?',
        }),
        defineField({
          name: 'bodyText',
          title: 'Body Text',
          type: 'string',
          description: 'Example: We might say no. But nicely.',
        }),
        defineField({
          name: 'button',
          title: 'Button',
          type: 'button',
        }),
      ],
      options: {collapsible: true},
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'cards.0.image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Untitled Features Grid Section',
        subtitle: 'Features Grid Section',
        media,
      }
    },
  },
})
