// sanity/schemas/news.ts
export default {
    name: 'news',
    title: 'News Article',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title', type: 'string', validation: (R: any) => R.required() },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R: any) => R.required() },
        { name: 'excerpt', title: 'Excerpt', type: 'text' },
        { name: 'publishedAt', title: 'Published At', type: 'datetime' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
        { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
    ],
    preview: {
        select: { title: 'title', media: 'image' },
    },
};