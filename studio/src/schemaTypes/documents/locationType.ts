import {defineField, defineType} from 'sanity'
import {MarkerIcon} from '@sanity/icons'

export const locationType = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  icon: MarkerIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
    }),
  ],
})