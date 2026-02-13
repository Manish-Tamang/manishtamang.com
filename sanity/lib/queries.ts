import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(date desc) {
    title,
    "slug": slug.current,
    excerpt,
    thumbnail,
    date,
    projectUrl,
    githubUrl,
    techStack
}`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0] {
    "currentSlug": slug.current,
    title,
    date,
    thumbnail,
    content,
    projectUrl,
    githubUrl,
    techStack,
    excerpt
}`);

export const POSTS_QUERY = defineQuery(`*[_type == "post"] {
    title,
    slug,
    excerpt,
    date,
    coverImage,
    content
} | order(date desc)`);

export const POST_BY_SLUG_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0] {
    title,
    slug,
    excerpt,
    date,
    coverImage,
    content
}`);
export const FEATURED_POSTS_QUERY = defineQuery(`*[_type == "post"] {
    title,
    "slug": slug.current,
    excerpt,
    date,
    coverImage,
    "tag": category[0]
} | order(date desc)[0...3]`);
export const FEATURE_PROJECTS_QUERY = defineQuery(`*[_type == "featuredProjects"][0] {
    projects[]-> {
        title,
        tagline,
        excerpt,
        icon,
        "link": projectUrl,
        "image": thumbnail.asset->url
    }
}.projects`);

export const RECENT_FAVORITE_QUERY = defineQuery(`*[_type == "recentFavorite"][0] {
    title,
    artist,
    album,
    "albumImageUrl": albumImageUrl.asset->url,
    songUrl
}`);

export const FEATURED_IMAGE_QUERY = defineQuery(`*[_type == "featuredImage"][0] {
    "url": image.asset->url,
    alt,
    caption
}`);

export const TIMELINE_QUERY = defineQuery(`*[_type == "timeline"] | order(date desc) {
    title,
    month,
    year,
    description,
    "images": images[].asset->url,
    date
}`);

export const SOCIALS_QUERY = defineQuery(`*[_type == "social"] {
    platform,
    url,
    icon
}`);

export const ABOUT_PROFILE_QUERY = defineQuery(`*[_type == "aboutProfile"][0] {
    heading,
    intro,
    bio,
    socialLinks[] {
        platform,
        url
    }
}`);

export const GALLERY_QUERY = defineQuery(`*[_type == "gallery"] | order(order asc) {
    _id,
    "imageURL": image.asset->url,
    alt,
    caption,
    format,
    order,
    uploadedAt
}`);

