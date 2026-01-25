export const post = {
    name: "post",
    title: "Post",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            description: "The main headline or title of the blog post",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            description: "A URL-friendly version of the title, used in the post URL",
            options: {
                source: "title",
                maxLength: 96,
            },
        },
        {
            name: "content",
            title: "Content",
            type: "markdown",
            description:
                "The main body content of the post, written in Markdown format",
        },
        {
            name: "excerpt",
            title: "Excerpt",
            type: "string",
            description:
                "A short summary of the post, typically used in previews or meta descriptions",
        },
        {
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            description:
                "The featured image for the post, displayed at the top or in previews",
            options: {
                hotspot: true,
            },
        },
        {
            name: "date",
            title: "Date",
            type: "datetime",
            description: "The publication date and time of the post",
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "coverImage",
        },
    },
};
