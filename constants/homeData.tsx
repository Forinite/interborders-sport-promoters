// constants/homeData.ts
// Static data for Home page

import { type Story } from '@/types';

export const featuredStories: Story[] = [
    {
        _id: 'story-1',
        title: 'From Street Football to National Champion',
        slug: { current: 'from-street-to-champion' },
        excerpt:
            'How 16-year-old Aisha from Ajegunle used football to escape poverty and win a scholarship to train in Europe.',
        body: [],
        image: {
            asset: { _ref: 'image-hero-1', _type: 'reference' },
            alt: 'Aisha celebrating victory',
        },
        author: 'YouthSportNG Team',
        publishedAt: '2025-11-01T10:00:00Z',
        tags: ['Football', 'Scholarship', 'Lagos'],
        featured: true,
    },
    {
        _id: 'story-2',
        title: 'Overcoming Anxiety Through Basketball',
        slug: { current: 'basketball-mental-health' },
        excerpt:
            'Tunde shares how joining a local basketball team helped him manage exam stress and build lifelong confidence.',
        body: [],
        image: {
            asset: { _ref: 'image-hero-2', _type: 'reference' },
            alt: 'Tunde playing basketball',
        },
        publishedAt: '2025-10-28T14:30:00Z',
        tags: ['Basketball', 'Mental Health', 'Abuja'],
        featured: true,
    },
    {
        _id: 'story-3',
        title: 'Girls in Athletics: Breaking Barriers',
        slug: { current: 'girls-in-athletics' },
        excerpt:
            'Chioma leads an all-girls sprint team in Enugu, proving that speed has no gender.',
        body: [],
        image: {
            asset: { _ref: 'image-hero-3', _type: 'reference' },
            alt: 'Chioma running track',
        },
        publishedAt: '2025-10-25T09:15:00Z',
        tags: ['Athletics', 'Gender Equality', 'Enugu'],
        featured: true,
    },
];