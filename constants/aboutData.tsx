// constants/aboutData.tsx
// Static data for About page

import { type TeamMember, type Partner } from '@/types';

export const mission = `We believe every Nigerian child deserves access to sports and mental health support. Through structured programs, counselling, and community partnerships, we help youth build resilience, confidence, and purpose.`;

export const team: TeamMember[] = [
    {
        name: 'Dr. Aminu Bello',
        role: 'Founder & Executive Director',
        bio: 'Former national athlete with 15 years in youth development.',
        image: {
            asset: { _ref: 'image-team-1', _type: 'reference' },
            alt: 'Dr. Aminu Bello',
        },
        social: {
            twitter: 'https://x.com/draminu',
            linkedin: 'https://linkedin.com/in/aminubello',
        },
    },
    {
        name: 'Fatima Yusuf',
        role: 'Head of Counselling',
        bio: 'Licensed psychologist specializing in adolescent mental health.',
        image: {
            asset: { _ref: 'image-team-2', _type: 'reference' },
            alt: 'Fatima Yusuf',
        },
    },
];

export const partners: Partner[] = [
    {
        name: 'Lagos State Sports Commission',
        logo: { asset: { _ref: 'logo-lssc', _type: 'reference' }, alt: 'LSSC Logo' },
        website: 'https://lagossports.ng',
    },
    {
        name: 'Nike Community Impact',
        logo: { asset: { _ref: 'logo-nike', _type: 'reference' }, alt: 'Nike Logo' },
    },
];