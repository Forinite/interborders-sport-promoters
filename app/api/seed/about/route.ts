// app/api/seed/about/route.ts
import { NextResponse } from 'next/server';
import {writeClient} from "@/sanity/lib/writeClient";



const initialAboutData = {
    _type: 'about',
    _id: 'about', // forces singleton
    heroSubtitle:
        'We exist to unlock the potential of every young person through the power of sports, stories, and support — no borders, no limits, no child left behind.',
    background: [
        {
            _type: 'block',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    text: 'InterBoarder Sport Promoters was born in 2024 out of a deep conviction: every child, regardless of background, deserves access to sports and mental wellness. Founded by Dr. Aminu Bello, a former national athlete turned youth advocate, we saw too many talented Nigerian youth sidelined — not by lack of ability, but by lack of opportunity and support.',
                },
            ],
        },
        {
            _type: 'block',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    text: 'From street football in Lagos to rural communities in Kano, we witnessed firsthand how sports can transform lives — building confidence, teaching resilience, and creating lifelong bonds. But talent alone isn’t enough. Mental health challenges, trauma, and lack of guidance were holding too many back.',
                },
            ],
        },
        {
            _type: 'block',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    text: 'That’s why InterBoarder was created — to bridge the gap between raw potential and real opportunity.',
                },
            ],
        },
    ],
    purpose: [
        {
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: 'Our Purpose' }],
        },
        {
            _type: 'block',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    text: 'To empower the next generation of Nigerian youth by providing equal access to competitive sports, professional counselling, and personal development — creating leaders who will lift their communities and their country.',
                },
            ],
        },
    ],
    mission: [
        {
            _type: 'block',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    text: 'To identify, train, and support talented young athletes across Nigeria while providing comprehensive mental health and life-skills counselling — ensuring no child is left behind due to financial, social, or emotional barriers.',
                },
            ],
        },
    ],
    vision: [
        {
            _type: 'block',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    text: 'A Nigeria where every child — from the streets of Ajegunle to the villages of Sokoto — has the opportunity to discover their greatness through sports, heal through professional support, and rise to represent our nation on the global stage.',
                },
            ],
        },
    ],
    goals: [
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: '• Organize 100+ grassroots sports events annually across all 36 states' }],
        },
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: '• Provide free counselling to 10,000+ youth by 2030' }],
        },
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: '• Develop 500+ athletes to national and international competition level' }],
        },
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: '• Build partnerships with government, corporations, and global sports bodies' }],
        },
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: '• Establish InterBoarder Academies in every geopolitical zone' }],
        },
    ],
};

export async function GET() {
    try {
        // Check if document already exists
        const existing = await writeClient.getDocument('about');

        if (existing) {
            return NextResponse.json(
                { message: 'About page already seeded', data: existing },
                { status: 200 }
            );
        }

        // Create the singleton document
        await writeClient.createOrReplace(initialAboutData);

        return NextResponse.json(
            { message: 'About page seeded successfully!', data: initialAboutData },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Seed error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to seed about page' },
            { status: 500 }
        );
    }
}