// types/index.tsx
// types/index.tsx
// All public-facing data types

export type Story = {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    body: any[]; // Portable Text
    image?: {
        asset: { _ref: string; _type: string };
        alt?: string;
    };
    author?: string;
    publishedAt: string;
    tags: string[];
    featured?: boolean;
};

export type Event = {
    _id: string;
    title: string;
    slug: { current: string };
    date: string;
    time?: string;
    location: string;
    sport: string;
    description: string;
    image?: {
        asset: { _ref: string; _type: string };
        alt?: string;
    };
    registrationLink?: string;
    isFree: boolean;
    ageGroup: string;
    spotsLeft?: number;
    publishedAt: string;
};

export type News = {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    body: any[];
    image?: {
        asset: { _ref: string; _type: string };
        alt?: string;
    };
    author?: string;
    publishedAt: string;
    tags: string[];
};

export type Resource = {
    _id: string;
    title: string;
    summary: string;
    format: 'pdf' | 'video' | 'article';
    fileUrl?: string;
    videoUrl?: string;
    body?: any[];
    image?: {
        asset: { _ref: string; _type: string };
        alt?: string;
    };
    tags: string[];
    publishedAt: string;
};

export type TeamMember = {
    name: string;
    role: string;
    bio: string;
    image?: {
        asset: { _ref: string; _type: string };
        alt?: string;
    };
    social?: {
        twitter?: string;
        linkedin?: string;
    };
};

export type Partner = {
    name: string;
    logo: {
        asset: { _ref: string; _type: string };
        alt?: string;
    };
    website?: string;
};