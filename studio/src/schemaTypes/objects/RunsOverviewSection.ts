import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const runsOverviewSection = defineType({
  name: 'runsOverviewSection',
  title: 'Runs Overview Section',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Example: Opkomende runs'
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Example: Volgende runs op de planning.'
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
          description: 'Example: Bekijk alle runs'
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'runs',
      title: 'Runs',
      type: 'string',
      options: {
        list: [
          {title: 'Upcoming runs', value: 'upcomingRuns'},
          {title: 'Past runs', value: 'pastRuns'},
          {title: 'All runs', value: 'allRuns'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'eyebrow',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled Runs Overview Section',
        subtitle: subtitle || 'Runs Overview Section',
      }
    },
  },
})
