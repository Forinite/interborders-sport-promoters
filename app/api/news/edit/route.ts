// app/api/news/edit/route.ts
import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

export const runtime = 'nodejs';

export async function PUT(req: Request) {
    try {
        const formData = await req.formData();
        const id = formData.get('id') as string;
        const title = formData.get('title') as string;
        const excerpt = formData.get('excerpt') as string;
        const publishedAt = formData.get('publishedAt') as string;
        const author = formData.get('author') as string;
        const tagsRaw = formData.get('tags') as string;
        const body = formData.get('body') as string;
        const file = formData.get('image') as File | null;
        const oldImageRef = formData.get('oldImageRef') as string | null;

        if (!id || !title || !body) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const current = await writeClient.getDocument(id);
        let imageRef = current.image?.asset?._ref;

        if (file && file.size > 0) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const imageAsset = await writeClient.assets.upload('image', buffer, {
                filename: file.name,
                contentType: file.type,
            });
            imageRef = imageAsset._id;
            if (oldImageRef) await writeClient.delete(oldImageRef).catch(() => {});
        }

        const slug = `${slugify(title, { lower: true, strict: true })}-${uuidv4().slice(0, 6)}`;

        const updated = await writeClient
            .patch(id)
            .set({
                title,
                slug: { _type: 'slug', current: slug },
                excerpt: excerpt || null,
                publishedAt: publishedAt || null,
                author: author || null,
                tags: tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [],
                body: [{ _type: 'block', children: [{ _type: 'span', text: body }] }],
                ...(imageRef && { image: { _type: 'image', asset: { _type: 'reference', _ref: imageRef } } }),
            })
            .commit();

        return NextResponse.json({ success: true, news: updated });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}