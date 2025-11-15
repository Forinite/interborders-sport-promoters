// app/api/story/edit/route.ts


import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

export const runtime = 'nodejs';

export async function PUT(req: Request) {
    console.log('PUT /api/story/edit — START');

    try {
        const formData = await req.formData();
        const id = formData.get('id') as string;
        const title = formData.get('title') as string;
        const excerpt = formData.get('excerpt') as string;
        const author = formData.get('author') as string;
        const body = formData.get('body') as string;
        const tagsRaw = formData.get('tags') as string;
        const featured = formData.get('featured') === 'true';
        const file = formData.get('image') as File | null;

        if (!id || !title || !body) {
            return NextResponse.json(
                { error: 'Missing required fields: id, title, body' },
                { status: 400 }
            );
        }

        // Fetch current story to preserve image if not updated
        const currentStory = await writeClient.getDocument(id);
        if (!currentStory) {
            return NextResponse.json({ error: 'Story not found' }, { status: 404 });
        }

        let imageRef = currentStory.image?.asset?._ref;

        // Upload new image if provided
        if (file && file.size > 0) {
            console.log('Uploading new image:', file.name);
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const imageAsset = await writeClient.assets.upload('image', buffer, {
                filename: file.name,
                contentType: file.type || 'application/octet-stream',
            });

            // Delete old image
            if (imageRef) {
                const oldAssetId = imageRef.replace('image-', '').replace(/-.*$/, '');
                await writeClient.delete(`image-${oldAssetId}`).catch(() => {});
            }

            imageRef = imageAsset._id;
        }

        const slugBase = slugify(title, { lower: true, strict: true });
        const slug = `${slugBase}-${uuidv4().slice(0, 6)}`;

        const updatedStory = await writeClient
            .patch(id)
            .set({
                title,
                slug: { _type: 'slug', current: slug },
                excerpt: excerpt || null,
                author: author || null,
                body: [
                    {
                        _type: 'block',
                        children: [{ _type: 'span', text: body }],
                    },
                ],
                featured,
                ...(imageRef && {
                    image: {
                        _type: 'image',
                        asset: { _type: 'reference', _ref: imageRef },
                    },
                }),
                tags: tagsRaw ? tagsRaw.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
            })
            .commit();

        console.log('Story updated:', updatedStory._id);
        return NextResponse.json({ success: true, story: updatedStory });
    } catch (err: any) {
        console.error('EDIT ERROR:', err);
        return NextResponse.json(
            { error: err.message || 'Failed to update story' },
            { status: 500 }
        );
    }
}