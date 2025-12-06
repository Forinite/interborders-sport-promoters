
import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import {writeClient} from "@/sanity/lib/writeClient";

export async function DELETE(request: Request) {
    try {

        // First, fetch the about document ID
        const aboutDocs = await writeClient.fetch(`*[_type == "about"][0]._id`)

        if (!aboutDocs) {
            return NextResponse.json(
                { message: 'No about document found to delete' },
                { status: 404 }
            )
        }

        // Create a patch that sets all fields to null or empty
        await writeClient
            .patch(aboutDocs)
            .set({
                heroSubtitle: null,
                background: null,
                purpose: null,
                mission: null,
                vision: null,
                goals: [], // For array fields, we set them to empty arrays
            })
            .commit()

        return NextResponse.json(
            { message: 'About section content cleared successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error clearing about section:', error)
        return NextResponse.json(
            { message: 'Error clearing about section content' },
            { status: 500 }
        )
    }
}