import {defineQuery} from 'next-sanity'

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

export const navigationQuery = defineQuery(`*[_type == "navigation"][0] {
    ...,
    items[]{
      ...,
      ${linkFields}
    }
  }
`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

// Shared by any document with a page builder (`page`, `homePage`), so the
// dereferencing logic for each block type only needs to be maintained once.
const pageBuilderProjection = /* groq */ `
  ...,
  _type == "callToAction" => {
    ...,
    button {
      ...,
      ${linkFields}
    }
  },
  _type == "infoSection" => {
    content[]{
      ...,
      markDefs[]{
        ...,
        ${linkReference}
      }
    }
  },
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ${pageBuilderProjection}
    },
  }
`)

export const sitemapData = defineQuery(`
  *[(_type == "page" || _type == "post" || _type == "run") && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

const runFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  description,
  image,
  "location": location->{name, address},
  date,
  distance,
  pace,
`

export const upcomingRunsQuery = defineQuery(`
  *[_type == "run" && defined(slug.current) && defined(date) && date >= now()] | order(date asc) {
    ${runFields}
  }
`)

export const pastRunsQuery = defineQuery(`
  *[_type == "run" && defined(slug.current) && defined(date) && date < now()] | order(date desc) {
    ${runFields}
  }
`)

export const runQuery = defineQuery(`
  *[_type == "run" && slug.current == $slug] [0] {
    ${runFields}
  }
`)

export const runPagesSlugs = defineQuery(`
  *[_type == "run" && defined(slug.current)]
  {"slug": slug.current}
`)

export const faqsQuery = defineQuery(`
  *[_type == "faq"] | order(orderRank asc) {
    _id,
    question,
    answer,
    category,
  }
`)

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0]{
    _id,
    _type,
    title,
    subtitle,
    "pageBuilder": pageBuilder[]{
      ${pageBuilderProjection}
    },
    "featuredRuns": featuredRuns[]->{
      ${runFields}
    },
    ogImage,
  }
`)
