import { CalendarIcon } from "@sanity/icons";

export const timeline = {
    name: "timeline",
    title: "Timeline",
    type: "document",
    icon: CalendarIcon,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "month",
            title: "Month",
            type: "string",
            options: {
                list: [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ],
            },
        },
        {
            name: "year",
            title: "Year",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "description",
            title: "Description",
            type: "markdown",
            description: "Detailed description of the milestone. Supports Markdown for links and highlights.",
        },
        {
            name: "images",
            title: "Images",
            type: "array",
            of: [{ type: "image", options: { hotspot: true } }],
        },
        {
            name: "date",
            title: "Sort Date",
            type: "date",
            description: "Used only for ordering the timeline entries in the UI.",
            validation: (Rule: any) => Rule.required(),
        },
    ],
    orderings: [
        {
            title: "Date, Newest",
            name: "dateDesc",
            by: [{ field: "date", direction: "desc" }],
        },
    ],
};
