// app/api/add/route.ts
import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create Admin in Sanity
        const admin = await writeClient.create({
            _type: "adminAccount",
            name,
            email,
            hashedPassword,
        });

        return NextResponse.json({ success: true, admin });
    } catch (error) {
        console.error("Admin creation error:", error);
        return NextResponse.json(
            { error: "Failed to create admin" },
            { status: 500 }
        );
    }
}
