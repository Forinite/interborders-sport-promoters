// sanity/schemasType/event.ts

import { defineType, defineField } from 'sanity';

export const event = defineType({
    name: 'event',
    title: 'Sports Event',
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
            name: 'sport',
            title: 'Sport',
            type: 'string',
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'time',
            title: 'Time',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'ageGroup',
            title: 'Age Group',
            type: 'string',
        }),
        defineField({
            name: 'isFree',
            title: 'Free Entry?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'spotsLeft',
            title: 'Spots Left',
            type: 'number',
        }),
        defineField({
            name: 'registrationLink',
            title: 'Registration Link',
            type: 'url',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'location',
            media: 'image',
        },
    },
});