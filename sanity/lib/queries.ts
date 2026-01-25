import { defineQuery } from "next-sanity";

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
