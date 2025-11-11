// sanity/schemas/resource.ts

import { defineType, defineField } from 'sanity';

export const resource = defineType({
    name: 'resource',
    title: 'Counselling Resource',
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
            name: 'summary',
            title: 'Summary',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'format',
            title: 'Format',
            type: 'string',
            options: {
                list: [
                    { title: 'PDF', value: 'pdf' },
                    { title: 'Video', value: 'video' },
                    { title: 'Article', value: 'article' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'fileUrl',
            title: 'PDF File URL',
            type: 'url',
            hidden: ({ parent }) => parent?.format !== 'pdf',
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
            hidden: ({ parent }) => parent?.format !== 'video',
        }),
        defineField({
            name: 'body',
            title: 'Article Body',
            type: 'array',
            of: [{ type: 'block' }],
            hidden: ({ parent }) => parent?.format !== 'article',
        }),
        defineField({
            name: 'image',
            title: 'Thumbnail',
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
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'format',
            media: 'image',
        },
    },
});