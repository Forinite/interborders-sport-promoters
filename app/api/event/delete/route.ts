// app/api/event/delete/route.ts
import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';

export const runtime = 'nodejs';

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

        const event = await writeClient.getDocument(id);
        if (event?.image?.asset?._ref) {
            await writeClient.delete(event.image.asset._ref).catch(() => {});
        }
        await writeClient.delete(id);
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}