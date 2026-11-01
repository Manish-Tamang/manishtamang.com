import { site } from "@/lib/site"

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  alternateName: [site.handle, "Manish Gole Tamang"],
  url: site.url,
  description: site.description,
  author: {
    "@type": "Person",
    name: site.name,
    alternateName: [site.handle, "gole", "Manish Gole Tamang"],
    url: site.url,
  },
}

const author = {
  "@type": "Person",
  name: site.name,
  alternateName: [site.handle, "Manish Gole Tamang"],
  url: site.url,
}

export const blogPostingJsonLd = ({ title, description, url, image, published, modified }: {
  title: string
  description: string
  url: string
  image?: string
  published: Date
  modified?: Date
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  url,
  mainEntityOfPage: url,
  datePublished: published.toISOString(),
  dateModified: (modified ?? published).toISOString(),
  image: image ? new URL(image, site.url).href : new URL(site.ogImage, site.url).href,
  author,
  publisher: author,
})

/** JSON for a <script type="application/ld+json">, safe to inline in HTML. */
export const toJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c")
