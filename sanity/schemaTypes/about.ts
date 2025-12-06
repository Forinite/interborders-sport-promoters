// sanity/schemaTypes/about.ts

import { defineType, defineField } from 'sanity';

export const about = defineType({
    name: 'about',
    title: 'About InterBoarder',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'team', title: 'Team & Partners' },
    ],
    fields: [
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle (below "About InterBoarder")',
            type: 'text',
            rows: 3,
            group: 'content',
        }),
        defineField({
            name: 'background',
            title: 'Background & History',
            type: 'text',
            rows: 3,
            group: 'content',
        }),
        defineField({
            name: 'purpose',
            title: 'Purpose',
            type: 'text',
            rows: 3,
            group: 'content',
        }),
        defineField({
            name: 'mission',
            title: 'Mission Statement',
            type: 'text',
            rows: 3,
            group: 'content',
        }),
        defineField({
            name: 'vision',
            title: 'Vision Statement',
            type: 'text',
            rows: 3,
            group: 'content',
        }),

        {
            name: 'goals',
            title: 'Goals',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'goal',
                    fields: [
                        {
                            name: 'title',
                            title: 'Goal Title',
                            type: 'string',
                            validation: (Rule: any) => Rule.required()
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'string',
                            validation: (Rule: any) => Rule.required()
                        },
                        {
                            name: 'priority',
                            title: 'Priority',
                            type: 'number',
                            validation: (Rule: any) => Rule.required().min(1)
                        }
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'description'
                        }
                    }
                }
            ]
        }

        // Team & Partners can stay as separate docs or move here later
    ],
    preview: {
        prepare: () => ({ title: 'About Page Content' }),
    },
});