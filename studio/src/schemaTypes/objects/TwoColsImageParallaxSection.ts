import {defineField, defineType} from 'sanity'

export const twoColsImageParallaxSection = defineType({
  name: 'twoColsImageParallaxSection',
  title: 'Two Columns Image Parallax Section',
  type: 'object',
  icon: () => '🖼️',
  fields: [
    defineField({
      name: 'imageLeft',
      title: 'Image Left',
      type: 'image',
    }),
    defineField({
      name: 'imageRight',
      title: 'Image Right',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'Two Columns Image Parallax Section',
    },
    prepare({title}) {
      return {
        title: title || 'Two Columns Image Parallax Section',
      }
    }
  },
})