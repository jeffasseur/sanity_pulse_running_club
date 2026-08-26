import {defineField, defineType} from 'sanity'
import {BarChartIcon} from '@sanity/icons'

/**
 * Stats/metrics section: a dark headline block (label, heading, two stat
 * tiles) with a decorative bar chart underneath. The two stat values (member
 * count, recent distance) are fetched live from the Strava club API at
 * render time — see frontend/lib/strava.ts — not editable here. Learn more:
 * https://www.sanity.io/docs/studio/object-type
 */

export const statsSection = defineType({
  name: 'statsSection',
  title: 'Stats Section',
  type: 'object',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Example: Performance metrics',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Example: Proof that clarity actually scales',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'eyebrow',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled Stats Section',
        subtitle: subtitle || 'Stats Section',
      }
    },
  },
})
