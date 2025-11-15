// app/api/news/add/route.ts
import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const title = formData.get('title') as string;
        const excerpt = formData.get('excerpt') as string;
        const publishedAt = formData.get('publishedAt') as string;
        const author = formData.get('author') as string;
        const tagsRaw = formData.get('tags') as string;
        const body = formData.get('body') as string;
        const file = formData.get('image') as File | null;

        if (!title || !body || !file) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const imageAsset = await writeClient.assets.upload('image', buffer, {
            filename: file.name,
            contentType: file.type,
        });

        const slug = `${slugify(title, { lower: true, strict: true })}-${uuidv4().slice(0, 6)}`;

        const news = await writeClient.create({
            _type: 'news',
            title,
            slug: { _type: 'slug', current: slug },
            excerpt: excerpt || null,
            publishedAt: publishedAt || new Date().toISOString(),
            author: author || null,
            tags: tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [],
            body: [{ _type: 'block', children: [{ _type: 'span', text: body }] }],
            image: { _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } },
        });

        return NextResponse.json({ success: true, news });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}