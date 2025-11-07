// app/(components)/contact/components/ContactForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
// import { useToast } from '@/components/ui/use-toast';

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // toast({
        //     title: 'Message Sent!',
        //     description: 'We\'ll get back to you within 24 hours.',
        // });

        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name
                </label>
                <Input id="name" placeholder="John Doe" required />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                </label>
                <Input id="email" type="email" placeholder="john@example.com" required />
            </div>

            <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                </label>
                <Input id="subject" placeholder="Partnership Inquiry" required />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                </label>
                <Textarea
                    id="message"
                    placeholder="Tell us how we can help..."
                    rows={6}
                    required
                />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
        </form>
    );
}