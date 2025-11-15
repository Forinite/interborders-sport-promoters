// app/api/story/add/route.ts
// app/api/story/add/route.ts
import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

export const runtime = 'nodejs';

export async function POST(req: Request) {
    console.log('POST /api/story/add — START');

    try {
        const formData = await req.formData();
        console.log('FormData received:', Object.fromEntries(formData.entries()));

        const title = formData.get('title') as string;
        const excerpt = formData.get('excerpt') as string;
        const author = formData.get('author') as string;
        const body = formData.get('body') as string;
        const tagsRaw = formData.get('tags') as string;
        const featured = formData.get('featured') === 'true';
        const file = formData.get('image') as File | null;

        if (!title || !body || !file) {
            console.log('Validation failed:', { title, body, file: !!file });
            return NextResponse.json(
                { error: 'Missing required fields: title, body, image' },
                { status: 400 }
            );
        }

        const slug = `${slugify(title, { lower: true, strict: true })}-${uuidv4().slice(0, 6)}`;
        console.log('Generated slug:', slug);

        // Upload image
        console.log('Uploading image:', file.name, file.type, file.size);
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const imageAsset = await writeClient.assets.upload('image', buffer, {
            filename: file.name,
            contentType: file.type || 'application/octet-stream',
            label: 'story-image',
        });
        console.log('Image uploaded:', imageAsset._id);

        // Create story
        const story = await writeClient.create({
            _type: 'story',
            title,
            slug: { _type: 'slug', current: slug },
            excerpt: excerpt || null,
            author: author || null,
            publishedAt: new Date().toISOString(),
            image: {
                _type: 'image',
                asset: { _type: 'reference', _ref: imageAsset._id },
            },
            tags: tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [],
            body: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: body }],
                },
            ],
            featured,
        });

        console.log('Story created:', story._id);
        return NextResponse.json({ success: true, story });
    } catch (err: any) {
        console.error('FATAL ERROR in /api/story/add:', err);
        return NextResponse.json(
            { error: err.message || 'Internal server error' },
            { status: 500 }
        );
    }
}