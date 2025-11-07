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