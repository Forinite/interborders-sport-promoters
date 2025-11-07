// constants/counsellingData.tsx
// Static data for Counselling section

import { type Resource } from '@/types';

export const resources: Resource[] = [
    {
        _id: 'resource-1',
        title: 'Coping with Exam Stress',
        summary: '5 proven techniques used by top student-athletes to stay calm during exams.',
        format: 'pdf',
        fileUrl: '/pdfs/exam-stress-guide.pdf',
        image: {
            asset: { _ref: 'image-resource-1', _type: 'reference' },
            alt: 'Student studying',
        },
        tags: ['Exams', 'Anxiety'],
        publishedAt: '2025-11-01T09:00:00Z',
    },
    {
        _id: 'resource-2',
        title: 'Building Confidence in Sports',
        summary: 'Watch how visualization and positive self-talk transformed a shy player.',
        format: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=confidence101',
        image: {
            asset: { _ref: 'image-resource-2', _type: 'reference' },
            alt: 'Athlete visualizing',
        },
        tags: ['Confidence', 'Mindset'],
        publishedAt: '2025-10-28T14:00:00Z',
    },
    {
        _id: 'resource-3',
        title: 'Nutrition for Young Athletes',
        summary: 'Simple, affordable meals to fuel performance and recovery.',
        format: 'article',
        body: [],
        image: {
            asset: { _ref: 'image-resource-3', _type: 'reference' },
            alt: 'Healthy meal',
        },
        tags: ['Nutrition', 'Performance'],
        publishedAt: '2025-10-25T11:00:00Z',
    },
];

export const contactInfo = {
    hotline: '+234 800 123 4567',
    email: 'support@youthsportng.org',
    address: '123 Empowerment Road, Ikeja, Lagos',
    social: {
        whatsapp: '+2348001234567',
        twitter: 'https://x.com/YouthSportNG',
        instagram: 'https://instagram.com/youthsportng',
    },
};