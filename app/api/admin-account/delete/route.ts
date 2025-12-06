// app/api/admin-account/delete/route.ts

// app/api/admin-account/delete/route.ts
import { NextResponse } from "next/server";
import {writeClient} from "@/sanity/lib/writeClient";


export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Missing admin ID" },
                { status: 400 }
            );
        }

        // Delete document from Sanity
        await writeClient.delete(id);

        return NextResponse.json(
            { message: "Admin deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("DELETE ADMIN ERROR:", error);

        return NextResponse.json(
            { error: "Failed to delete admin" },
            { status: 500 }
        );
    }
}
