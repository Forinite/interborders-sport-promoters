// sanity/lib/queries.ts
import { groq } from 'next-sanity';
import { client } from './client';

export async function getFeaturedStories() {
    const query = groq`
    *[_type == "story" && featured == true] | order(publishedAt desc) [0...6] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      image,
      publishedAt,
      tags
    }
  `;

    return client.fetch(query, {}, { next: { revalidate: 600 } });
}


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

export const RESOURCES_QUERY = `*[_type == "resource"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  summary,
  format,
  videoUrl,
  body,
  tags,
  publishedAt,
  image { asset->{ _id, url } },
  file { asset->{ _id, url } }
}`;
;