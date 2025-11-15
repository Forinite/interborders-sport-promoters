// app/api/event/add/route.ts
import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const title = formData.get('title') as string;
        const sport = formData.get('sport') as string;
        const date = formData.get('date') as string;
        const time = formData.get('time') as string;
        const location = formData.get('location') as string;
        const ageGroup = formData.get('ageGroup') as string;
        const isFree = formData.get('isFree') === 'true';
        const spotsLeft = formData.get('spotsLeft') ? Number(formData.get('spotsLeft')) : null;
        const registrationLink = formData.get('registrationLink') as string;
        const description = formData.get('description') as string;
        const file = formData.get('image') as File | null;

        if (!title || !date || !location || !file) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const imageAsset = await writeClient.assets.upload('image', buffer, {
            filename: file.name,
            contentType: file.type,
        });

        const slug = `${slugify(title, { lower: true, strict: true })}-${uuidv4().slice(0, 6)}`;

        const event = await writeClient.create({
            _type: 'event',
            title,
            slug: { _type: 'slug', current: slug },
            sport: sport || null,
            date,
            time: time || null,
            location,
            ageGroup: ageGroup || null,
            isFree,
            spotsLeft: spotsLeft || null,
            registrationLink: registrationLink || null,
            description: description || null,
            image: {
                _type: 'image',
                asset: { _type: 'reference', _ref: imageAsset._id },
            },
        });

        return NextResponse.json({ success: true, event });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}