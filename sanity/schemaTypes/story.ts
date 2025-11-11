// sanity/schemasType/story.ts
export default {
    name: 'story',
    title: 'Success Story',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
        },
        {
            name: 'author',
            title: 'Author',
            type: 'string',
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
        },
        {
            name: 'image',
            title: 'Featured Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{ type: 'block' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'author',
            media: 'image',
        },
    },
};