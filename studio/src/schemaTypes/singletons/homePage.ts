import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

import {pageBuilderField} from '../objects/pageBuilder'

/**
 * Homepage schema singleton. Learn more about singletons:
 * https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
    pageBuilderField(),
    defineField({
      name: 'heroGallery',
      title: 'Hero Gallery',
      description: 'Images to display in the hero section of the homepage.',
      type: 'array',
      of: [{type: 'image'}],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: 'featuredRuns',
      title: 'Featured Runs',
      description: 'Runs to spotlight on the homepage, e.g. the next few upcoming runs.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'run'}]}],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description: 'Overrides the default social sharing image for the homepage.',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Important for accessibility and SEO.',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage',
      }
    },
  },
})
