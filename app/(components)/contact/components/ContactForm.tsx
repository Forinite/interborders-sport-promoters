// app/(components)/contact/components/ContactForm.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

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
        <form onSubmit={handleSubmit} className="space-y-5">
            <Input
                placeholder="Full Name"
                required
                className="h-12 text-base border-[#CBD5E1] focus:border-[#0A84FF] focus:ring-[#0A84FF]/20 transition-colors"
                disabled={isSubmitting || isSent}
            />
            <Input
                type="email"
                placeholder="Email Address"
                required
                className="h-12 text-base border-[#CBD5E1] focus:border-[#0A84FF] focus:ring-[#0A84FF]/20 transition-colors"
                disabled={isSubmitting || isSent}
            />
            <Input
                placeholder="Subject"
                required
                className="h-12 text-base border-[#CBD5E1] focus:border-[#0A84FF] focus:ring-[#0A84FF]/20 transition-colors"
                disabled={isSubmitting || isSent}
            />
            <Textarea
                placeholder="Your message..."
                rows={5}
                required
                className="text-base border-[#CBD5E1] focus:border-[#0A84FF] focus:ring-[#0A84FF]/20 resize-none transition-colors"
                disabled={isSubmitting || isSent}
            />
            <Button
                type="submit"
                disabled={isSubmitting || isSent}
                className={`w-full h-14 text-base font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2
          ${isSent
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-gradient-to-r from-[#0A84FF] to-[#0052CC] hover:shadow-xl hover:scale-[1.01]'
                } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                    </>
                ) : isSent ? (
                    <>
                        <CheckCircle2 className="h-5 w-5" />
                        Message Sent!
                    </>
                ) : (
                    <>
                        <Send className="h-5 w-5" />
                        Send Message
                    </>
                )}
            </Button>
        </form>
    );
}