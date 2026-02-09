import { StarIcon } from "@sanity/icons";

export const featuredProjects = {
    name: "featuredProjects",
    title: "Featured Projects",
    type: "document",
    icon: StarIcon,
    fields: [
        {
            name: "projects",
            title: "Featured Projects",
            type: "array",
            of: [{ type: "reference", to: [{ type: "project" }] }],
            validation: (Rule: any) => Rule.length(4).error("Please select exactly 4 projects to feature"),
        },
    ],
};
