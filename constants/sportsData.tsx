// constants/sportsData.tsx
// Static data for Sports section

import { type Event, type News } from '@/types';


export const events: Event[] = [
    {
        _id: 'event-1',
        title: 'Lagos Youth Football Tournament 2025',
        slug: { current: 'lagos-youth-football-2025' },
        date: '2025-12-15',
        time: '09:00',
        location: 'National Stadium, Surulere',
        sport: 'Football',
        description:
            'Annual under-17 tournament with scouts from top Nigerian clubs. Free entry for players.',
        image: {
            asset: { _ref: 'image-event-1', _type: 'reference' },
            alt: 'Football tournament',
        },
        registrationLink: 'https://forms.gle/football2025',
        isFree: true,
        ageGroup: '13–17',
        spotsLeft: 87,
        publishedAt: '2025-11-01T08:00:00Z',
    },
    {
        _id: 'event-2',
        title: 'Abuja Basketball Skills Clinic',
        slug: { current: 'abuja-basketball-clinic' },
        date: '2025-11-30',
        time: '10:00',
        location: 'Moshood Abiola Stadium',
        sport: 'Basketball',
        description:
            '3-day intensive training with certified coaches. Limited to 50 participants.',
        image: {
            asset: { _ref: 'image-event-2', _type: 'reference' },
            alt: 'Basketball clinic',
        },
        isFree: false,
        ageGroup: '14–19',
        spotsLeft: 12,
        publishedAt: '2025-10-20T12:00:00Z',
    },
];

export const news: News[] = [
    {
        _id: 'news-1',
        title: 'Nigerian U-15 Team Wins West African Championship',
        slug: { current: 'u15-west-africa-champions' },
        excerpt:
            'Our youth team defeats Ghana 3-1 in final to claim regional title for the first time in 5 years.',
        body: [],
        image: {
            asset: { _ref: 'image-news-1', _type: 'reference' },
            alt: 'U-15 team with trophy',
        },
        publishedAt: '2025-11-05T16:45:00Z',
        tags: ['Football', 'National Team'],
    },
    {
        _id: 'news-2',
        title: 'New Sports Complex Opens in Port Harcourt',
        slug: { current: 'ph-sports-complex' },
        excerpt:
            'State-of-the-art facility with Olympic-size pool and indoor courts now open to youth programs.',
        body: [],
        image: {
            asset: { _ref: 'image-news-2', _type: 'reference' },
            alt: 'New sports complex',
        },
        publishedAt: '2025-11-03T11:20:00Z',
        tags: ['Infrastructure', 'Rivers State'],
    },
];