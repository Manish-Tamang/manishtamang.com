import { ImageIcon } from "@sanity/icons";

export const featuredImage = {
    name: "featuredImage",
    title: "Featured Image Section",
    type: "document",
    icon: ImageIcon,
    fields: [
        {
            name: "image",
            title: "Featured Image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "alt",
            title: "Alt Text",
            type: "string",
            description: "Description of the image for accessibility",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "caption",
            title: "Caption (Optional)",
            type: "string",
            description: "A short caption to display below or as a tooltip",
        },
    ],
};
