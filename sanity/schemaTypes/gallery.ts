import { defineType, defineField } from 'sanity'

export const gallery = defineType({
    name: 'gallery',
    title: 'Gallery',
    type: 'document',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            description: 'Alternative text for accessibility',
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
            description: 'Optional caption for the image',
        }),
        defineField({
            name: 'format',
            title: 'Layout Format',
            type: 'string',
            description: 'Choose the visual shape of the image in the grid',
            options: {
                list: [
                    { title: 'Standard Square (1x1)', value: '1x1' },
                    { title: 'Horizontal Wide (2x1)', value: '2x1' },
                    { title: 'Vertical Tall (1x2)', value: '1x2' },
                    { title: 'Large Square (2x2)', value: '2x2' },
                    { title: 'Extra Wide (3x1)', value: '3x1' },
                    { title: 'Cinematic Wide (4x1)', value: '4x1' },
                ],
                layout: 'radio', // This makes it even more visual as a list of options
            },
            initialValue: '1x1',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Order in which the image appears (lower numbers appear first)',
            validation: (Rule) => Rule.required(),
            initialValue: 0,
        }),
        defineField({
            name: 'uploadedAt',
            title: 'Uploaded At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'caption',
            media: 'image',
            order: 'order',
            format: 'format',
        },
        prepare({ title, media, order, format }) {
            return {
                title: title || 'Untitled Image',
                subtitle: `Order: ${order} | Format: ${format || '1x1'}`,
                media,
            }
        },
    },
})
