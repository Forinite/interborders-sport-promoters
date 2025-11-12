// app/(components)/contact/components/ContactForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(res => setTimeout(res, 1200));
        setIsSubmitting(false);
        setIsSent(true);
        setTimeout(() => setIsSent(false), 4000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                placeholder="Full Name"
                required
                className="h-12 text-base border-slate-300 focus:border-[#0A84FF] focus:ring-2 focus:ring-[#0A84FF]/20"
            />
            <Input
                type="email"
                placeholder="Email Address"
                required
                className="h-12 text-base border-slate-300 focus:border-[#0A84FF] focus:ring-2 focus:ring-[#0A84FF]/20"
            />
            <Input
                placeholder="Subject"
                required
                className="h-12 text-base border-slate-300 focus:border-[#0A84FF] focus:ring-2 focus:ring-[#0A84FF]/20"
            />
            <Textarea
                placeholder="Your message..."
                rows={5}
                required
                className="text-base border-slate-300 focus:border-[#0A84FF] focus:ring-2 focus:ring-[#0A84FF]/20 resize-none"
            />
            <Button
                type="submit"
                disabled={isSubmitting || isSent}
                className={`w-full h-14 text-base font-semibold rounded-lg shadow-md transition-all ${
                    isSent
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-gradient-to-r from-[#0A84FF] to-[#0052CC] hover:shadow-lg'
                }`}
            >
                {isSubmitting ? 'Sending...' : isSent ? (
                    <>
                        <CheckCircle2 className="mr-2 h-5 w-5" /> Sent Successfully!
                    </>
                ) : (
                    <>
                        <Send className="mr-2 h-5 w-5" /> Send Message
                    </>
                )}
            </Button>
        </form>
    );
}
