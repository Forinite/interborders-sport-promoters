// app/api/story/delete/route.ts
import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';

export const runtime = 'nodejs';

export async function DELETE(req: Request) {
    console.log('DELETE /api/story/delete — START');

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing story ID' }, { status: 400 });
        }

        const story = await writeClient.getDocument(id);
        if (!story) {
            return NextResponse.json({ error: 'Story not found' }, { status: 404 });
        }

        // Delete image asset
        if (story.image?.asset?._ref) {
            const assetId = story.image.asset._ref.replace('image-', '').split('-')[0];
            await writeClient.delete(`image-${assetId}`).catch(() => {});
        }

        await writeClient.delete(id);
        console.log('Story deleted:', id);

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('DELETE ERROR:', err);
        return NextResponse.json(
            { error: err.message || 'Failed to delete story' },
            { status: 500 }
        );
    }
}