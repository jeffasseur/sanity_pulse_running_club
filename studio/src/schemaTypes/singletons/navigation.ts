import { defineType, defineField, defineArrayMember } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Site Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Navigation Title',
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Links',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'item',
          title: 'Navigation Item',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
            }),
            defineField({
              name: 'link',
              title: 'Nav Link',
              type: 'link',
              validation: (Rule) => Rule.required().error('A link is required for each navigation item'),
              options: {collapsible: true, collapsed: false},
            }),
          ],
        }),
      ],
    }),
  ],
})