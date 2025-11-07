// app/(components)/counselling/page.tsx
'use client';

import ResourceGrid from './components/ResourceGrid';
import BookingPanel from './components/BookingPanel';
import ContactBand from './components/ContactBand';
import { resources } from '@/constants/counsellingData';

export default function CounsellingPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Support</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Free counselling, mental health resources, and personal development tools designed for Nigerian youth.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <ResourceGrid resources={resources} />
                </div>
                <div className="lg:col-span-1">
                    <BookingPanel />
                </div>
            </div>

            <ContactBand />
        </div>
    );
}