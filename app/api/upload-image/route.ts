// app/api/upload-image/route.ts'

import {writeClient} from "@/sanity/lib/writeClient";


import { NextRequest, NextResponse } from 'next/server';



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
        const asset = await writeClient.assets.upload('image', buffer, {
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