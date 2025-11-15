// app/api/resources/edit/route.ts

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
        const summary = formData.get('summary') as string;
        const format = formData.get('format') as 'pdf' | 'video' | 'article';
        const tagsRaw = formData.get('tags') as string;
        const publishedAt = formData.get('publishedAt') as string;
        const imageFile = formData.get('image') as File | null;
        const pdfFile = formData.get('file') as File | null;
        const videoUrl = formData.get('videoUrl') as string;
        const bodyJson = formData.get('body') as string;
        const oldImageRef = formData.get('oldImageRef') as string | null;
        const oldPdfRef = formData.get('oldPdfRef') as string | null;

        if (!id || !title || !format) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

        const current = await writeClient.getDocument(id);
        let imageRef = current.image?.asset?._ref;
        let fileRef = current.file?.asset?._ref;

        if (imageFile) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const asset = await writeClient.assets.upload('image', buffer, { filename: imageFile.name });
            imageRef = asset._id;
            if (oldImageRef) await writeClient.delete(oldImageRef).catch(() => {});
        }

        if (format === 'pdf' && pdfFile) {
            const buffer = Buffer.from(await pdfFile.arrayBuffer());
            const asset = await writeClient.assets.upload('file', buffer, { filename: pdfFile.name });
            fileRef = asset._id;
            if (oldPdfRef) await writeClient.delete(oldPdfRef).catch(() => {});
        }

        const slug = `${slugify(title, { lower: true, strict: true })}-${uuidv4().slice(0, 6)}`;

        const updated = await writeClient
            .patch(id)
            .set({
                title,
                slug: { _type: 'slug', current: slug },
                summary: summary || null,
                format,
                ...(fileRef && { file: { _type: 'file', asset: { _type: 'reference', _ref: fileRef } } }),
                videoUrl: format === 'video' ? videoUrl || null : null,
                body: format === 'article' ? JSON.parse(bodyJson || '[]') : null,
                ...(imageRef && { image: { _type: 'image', asset: { _type: 'reference', _ref: imageRef } } }),
                tags: tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [],
                publishedAt: publishedAt || null,
            })
            .unset(format === 'pdf' ? ['videoUrl', 'body'] : format === 'video' ? ['file', 'body'] : ['file', 'videoUrl'])
            .commit();

        return NextResponse.json({ success: true, resource: updated });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}