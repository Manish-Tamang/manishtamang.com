import { UserIcon } from "@sanity/icons";

export const aboutProfile = {
    name: "aboutProfile",
    title: "About Profile",
    type: "document",
    icon: UserIcon,
    fields: [
        {
            name: "heading",
            title: "Page Heading",
            type: "string",
            description: "The main heading (e.g., 'About')",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "intro",
            title: "Intro Paragraph",
            type: "text",
            description: "The large intro text (e.g., 'Hi, I'm Manish Tamang...')",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "bio",
            title: "Bio Paragraph",
            type: "markdown",
            description: "The main bio description with markdown support for links and formatting.",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "socialLinks",
            title: "Social Links",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "platform",
                            title: "Platform",
                            type: "string",
                            options: {
                                list: [
                                    { title: "GitHub", value: "github" },
                                    { title: "Twitter/X", value: "twitter" },
                                    { title: "LinkedIn", value: "linkedin" },
                                    { title: "Daily.dev", value: "dailydev" },
                                    { title: "Instagram", value: "instagram" },
                                ],
                            },
                        },
                        {
                            name: "url",
                            title: "URL",
                            type: "url",
                            validation: (Rule: any) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: {
                            platform: "platform",
                            url: "url",
                        },
                        prepare({ platform, url }: any) {
                            return {
                                title: platform,
                                subtitle: url,
                            };
                        },
                    },
                },
            ],
        },
    ],
};
