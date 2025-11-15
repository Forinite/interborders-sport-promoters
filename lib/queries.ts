// lib/queries.ts

export const STORIES_QUERY = `*[_type == "story"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  author,
  publishedAt,
  image {
    asset->{
      _id,
      url
    }
  },
  tags,
  body,
  featured
}`;

export const EVENTS_QUERY = `*[_type == "event"] | order(date desc) {
  _id,
  title,
  slug,
  sport,
  date,
  time,
  location,
  ageGroup,
  isFree,
  spotsLeft,
  registrationLink,
  description,
  image {
    asset->{
      _id,
      url
    }
  }
}`;


export const NEWS_QUERY = `*[_type == "news"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  author,
  tags,
  body,
  image {
    asset->{
      _id,
      url
    }
  }
}`;

// lib/queries.ts


export const RESOURCES_QUERY = `*[_type == "resource"] | order(publishedAt desc) {
  _id,
  title,
  summary,
  format,
  "fileUrl": file.asset->url,
  videoUrl,
  image {
    asset->{
      _id,
      url
    },
    alt
  },
  tags,
  publishedAt
}`;
