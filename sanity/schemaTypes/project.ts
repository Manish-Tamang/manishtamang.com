import { GoProjectSymlink } from "react-icons/go";

export const project = {
    name: "project",
    title: "Project",
    type: "document",
    icon: GoProjectSymlink,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "tagline",
            title: "Tagline",
            type: "string",
            description: "A short catchphrase or description (e.g., 'SaaS for Photobooth Management')",
        },
        {
            name: "icon",
            title: "Icon Text",
            type: "string",
            description: "1-2 uppercase characters to display as a small icon (e.g., 'YB')",
            validation: (Rule: any) => Rule.max(3).warning("Keep it short, preferably 1-2 characters"),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
        },
        {
            name: "content",
            title: "Content",
            type: "markdown",
        },
        {
            name: "excerpt",
            title: "Excerpt",
            type: "string",
        },
        {
            name: "thumbnail",
            title: "Thumbnail Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "date",
            title: "Date",
            type: "datetime",
        },
        {
            name: "projectUrl",
            title: "Project URL",
            type: "url",
            description: "Link to the live project (optional)",
        },
        {
            name: "githubUrl",
            title: "GitHub URL",
            type: "url",
            description: "Link to the project's GitHub repository (optional)",
        },
        {
            name: "techStack",
            title: "Tech Stack",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
            description:
                "Technologies used in this project (e.g., React, Node.js, Tailwind CSS)",
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "thumbnail",
        },
    },
};
