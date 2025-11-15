// sanity/schemasType/story.ts

import { defineType, defineField } from 'sanity';

export const story = defineType({
    name: 'story',
    title: 'Success Story',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
        }),
        defineField({
            name: 'image',
            title: 'Featured Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'featured',
            title: 'Featured Story',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'author',
            media: 'image',
        },
    },
});