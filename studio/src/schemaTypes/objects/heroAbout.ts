import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

/**
 * Hero/about section: centered heading and subheading, a full-width image
 * gallery strip, and a row of stats. Learn more: https://www.sanity.io/docs/studio/object-type
 */

export const heroAbout = defineType({
  name: 'heroAbout',
  title: 'Hero About',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      description: 'Displayed side by side as a horizontal strip. Three images fit the layout best.',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          title: 'Stat',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'value', subtitle: 'label'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'images.0',
    },
    prepare({title, media}) {
      return {
        title: title || 'Untitled Hero About',
        subtitle: 'Hero About',
        media,
      }
    },
  },
})
