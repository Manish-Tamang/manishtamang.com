import { ShareIcon } from "@sanity/icons";

export const social = {
    name: "social",
    title: "Social Links",
    type: "document",
    icon: ShareIcon,
    fields: [
        {
            name: "platform",
            title: "Platform Name",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "url",
            title: "profile URL",
            type: "url",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "icon",
            title: "Icon Name",
            type: "string",
            description: "Name of the icon to use (e.g., 'GitHub', 'Twitter', 'LinkedIn')",
        },
    ],
};
