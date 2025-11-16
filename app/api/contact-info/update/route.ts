// app/api/contact-info/update/route.ts
// app/api/contact-info/update/route.ts
import { NextResponse } from "next/server";
import {writeClient} from "@/sanity/lib/writeClient";


export async function POST(req: Request) {
    try {
        const { id, hotline, email, address, social } = await req.json();

        if (!id) return NextResponse.json({ error: "Missing document ID" }, { status: 400 });

        const updated = await writeClient
            .patch(id)
            .set({ hotline, email, address, social })
            .commit();

        return NextResponse.json(updated);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}
