// constants/storiesData.tsx
// Static data for Stories page

import { type Story } from '@/types';

export const stories: Story[] = [
    {
        _id: 'story-4',
        title: 'From Dropout to Coach: My Journey',
        slug: { current: 'dropout-to-coach' },
        excerpt:
            'How sports gave me a second chance and now I mentor 30 kids every weekend.',
        body: [],
        image: {
            asset: { _ref: 'image-story-4', _type: 'reference' },
            alt: 'Coach with kids',
        },
        publishedAt: '2025-10-18T13:00:00Z',
        tags: ['Mentorship', 'Second Chance'],
    },
    {
        _id: 'story-5',
        title: 'Swimming Saved My Life',
        slug: { current: 'swimming-saved-me' },
        excerpt:
            'After losing my father, the pool became my therapy. Now I teach kids to swim for free.',
        body: [],
        image: {
            asset: { _ref: 'image-story-5', _type: 'reference' },
            alt: 'Swimmer in pool',
        },
        publishedAt: '2025-10-10T10:30:00Z',
        tags: ['Swimming', 'Grief', 'Community'],
    },
];