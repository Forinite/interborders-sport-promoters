//app/api/resources/add/route.ts


import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const title = formData.get('title') as string;
        const summary = formData.get('summary') as string;
        const format = formData.get('format') as 'pdf' | 'video' | 'article';
        const tagsRaw = formData.get('tags') as string;
        const publishedAt = formData.get('publishedAt') as string;
        const imageFile = formData.get('image') as File;
        const pdfFile = formData.get('file') as File | null;
        const videoUrl = formData.get('videoUrl') as string;
        const bodyJson = formData.get('body') as string;

        if (!title || !format || !imageFile) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        const imageAsset = await writeClient.assets.upload('image', imageBuffer, { filename: imageFile.name });

        let fileRef: string | undefined;
        if (format === 'pdf' && pdfFile) {
            const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
            const pdfAsset = await writeClient.assets.upload('file', pdfBuffer, { filename: pdfFile.name });
            fileRef = pdfAsset._id;
        }

        const slug = `${slugify(title, { lower: true, strict: true })}-${uuidv4().slice(0, 6)}`;

        const resource = await writeClient.create({
            _type: 'resource',
            title,
            slug: { _type: 'slug', current: slug },
            summary: summary || null,
            format,
            ...(fileRef && { file: { _type: 'file', asset: { _type: 'reference', _ref: fileRef } } }),
            videoUrl: format === 'video' ? videoUrl || null : null,
            body: format === 'article' ? JSON.parse(bodyJson || '[]') : null,
            image: { _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } },
            tags: tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [],
            publishedAt: publishedAt || null,
        });

        return NextResponse.json({ success: true, resource });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}