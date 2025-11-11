// lib/queries.ts
export const STORIES_QUERY = `*[_type == "story"] | order(publishedAt desc) {
  _id, title, slug, excerpt, author, publishedAt, image, tags
}`;

export const STORY_QUERY = `*[_type == "story" && slug.current == $slug][0] {
  _id, title, slug, excerpt, author, publishedAt, image, tags, body
}`;

export const EVENTS_QUERY = `*[_type == "event"] | order(date desc) {
  _id, title, slug, sport, date, time, location, ageGroup, isFree, spotsLeft, registrationLink, description, image
}`;

export const EVENT_QUERY = `*[_type == "event" && slug.current == $slug][0] {
  _id, title, slug, sport, date, time, location, ageGroup, isFree, spotsLeft, registrationLink, description, image
}`;

export const NEWS_QUERY = `*[_type == "news"] | order(publishedAt desc) {
  _id, title, slug, excerpt, publishedAt, image
}`;

export const NEWS_ARTICLE_QUERY = `*[_type == "news" && slug.current == $slug][0] {
  _id, title, slug, excerpt, publishedAt, image, body
}`;

export const RESOURCES_QUERY = `*[_type == "resource"] | order(_createdAt desc) {
  _id, title, format, summary, fileUrl, videoUrl, image
}`;

export const RESOURCE_QUERY = `*[_type == "resource" && _id == $id][0] {
  _id, title, format, summary, fileUrl, videoUrl, image, body
}`;