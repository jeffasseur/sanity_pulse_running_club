import {defineField, defineType} from 'sanity'
import {BoltIcon} from '@sanity/icons'

export const runType = defineType({
  name: 'run',
  title: 'Run',
  type: 'document',
  icon: BoltIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'location'}],
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'distance',
      title: 'Distance (km)',
      type: 'number',
    }),
    defineField({
      name: 'pace',
      title: 'Pace (min/km)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',
    },
  },
})