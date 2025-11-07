// app/(components)/contact/page.tsx
'use client';

import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Have a question, partnership idea, or need support? We're here to help.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
                <ContactForm />
                <ContactInfo />
            </div>
        </div>
    );
}