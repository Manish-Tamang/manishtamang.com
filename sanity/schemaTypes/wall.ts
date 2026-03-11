import { defineType, defineField } from 'sanity'

export const wall = defineType({
    name: 'wall',
    title: 'Wall',
    type: 'document',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: false,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'uploadedAt',
            title: 'Uploaded At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            readOnly: true,
        }),
    ],
    preview: {
        select: {
            image: 'image',
        },
        prepare({ image }) {
            return {
                title: 'Wall Item',
                media: image,
            }
        }
    }
})
