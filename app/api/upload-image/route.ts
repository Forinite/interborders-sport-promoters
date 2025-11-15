// app/api/upload-image/route.ts
import { createClient } from 'next-sanity';
import { NextRequest, NextResponse } from 'next/server';

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID!,
    dataset: process.env.SANITY_DATASET!,
    apiVersion: '2025-11-07',
    token: process.env.SANITY_WRITE_TOKEN!,
    useCdn: false,
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: 'No valid file provided' }, { status: 400 });
        }

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload with explicit contentType
        const asset = await client.assets.upload('image', buffer, {
            filename: file.name,
            contentType: file.type || 'application/octet-stream',
            label: 'story-image',
        });

        return NextResponse.json({ assetId: asset._id });
    } catch (error: any) {
        console.error('Image upload failed:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to upload image' },
            { status: 500 }
        );
    }
}