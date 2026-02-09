import { PlayIcon } from "@sanity/icons";

export const recentFavorite = {
    name: "recentFavorite",
    title: "Recent Favorite Track",
    type: "document",
    icon: PlayIcon,
    fields: [
        {
            name: "title",
            title: "Track Title",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "artist",
            title: "Artist",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "album",
            title: "Album Name",
            type: "string",
        },
        {
            name: "albumImageUrl",
            title: "Album Cover Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "songUrl",
            title: "Spotify / Song URL",
            type: "url",
            validation: (Rule: any) => Rule.required().uri({
                scheme: ["http", "https"],
            }),
        },
    ],
};
