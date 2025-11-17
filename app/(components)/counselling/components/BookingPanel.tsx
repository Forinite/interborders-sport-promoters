// app/(components)/counselling/components/BookingPanel.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    CustomSelect,
    CustomSelectTrigger,
    CustomSelectValue,
    CustomSelectContent,
    CustomSelectItem
} from '@/components/ui/custom-select';
import { User, Mail, Phone, Calendar as CalIcon, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import {cn} from "@/lib/utils";

export default function BookingPanel() {
    const [selectedDate, setSelectedDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate) return;

        setIsSubmitting(true);
        await new Promise(res => setTimeout(res, 1400));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="sticky top-6 lg:top-8">
            {/* Card with Depth */}
            <div className="relative group">
                <div className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 bg-[#E2E8F0] rounded-3xl opacity-70 transition-all duration-500 group-hover:translate-x-8 group-hover:translate-y-8" />
                <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 sm:translate-x-2 sm:translate-y-2 bg-[#F1F5F9] rounded-3xl border-2 border-[#CBD5E1] opacity-80" />

                <div className="relative bg-white rounded-3xl border-2 border-[#CBD5E1] shadow-2xl p-6 sm:p-8 transition-all duration-500 group-hover:shadow-[0_20px_60px_-15px_rgba(10,132,255,0.2)] group-hover:-translate-y-1 overflow-hidden">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h3 className="text-2xl sm:text-3xl font-black text-[#1E293B] leading-tight">
                            Book Free Session
                        </h3>
                        <p className="mt-2 text-sm sm:text-base text-[#64748B] font-medium">
                            100% Confidential • Free • Certified Counsellors
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Full Name */}
                        <div className="relative">
                            <User className="absolute left-4 top-4 h-5 w-5 text-[#0A84FF]" />
                            <Input
                                placeholder="Full Name"
                                className="pl-12 h-14 text-base border-[#CBD5E1] focus:border-[#0A84FF] focus:ring-4 focus:ring-[#0A84FF]/10 transition-all"
                                required
                                disabled={isSubmitting || isSubmitted}
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <Mail className="absolute left-4 top-4 h-5 w-5 text-[#0A84FF]" />
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className="pl-12 h-14 text-base border-[#CBD5E1] focus:border-[#0A84FF] focus:ring-4 focus:ring-[#0A84FF]/10 transition-all"
                                required
                                disabled={isSubmitting || isSubmitted}
                            />
                        </div>

                        {/* Phone */}
                        <div className="relative">
                            <Phone className="absolute left-4 top-4 h-5 w-5 text-[#0A84FF]" />
                            <Input
                                type="tel"
                                placeholder="Phone Number"
                                className="pl-12 h-14 text-base border-[#CBD5E1] focus:border-[#0A84FF] focus:ring-4 focus:ring-[#0A84FF]/10 transition-all"
                                required
                                disabled={isSubmitting || isSubmitted}
                            />
                        </div>

                        {/* DATE INPUT ONLY — NATIVE PICKER */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[#1E293B] font-bold text-sm sm:text-base">
                                <CalIcon className="h-5 w-5 text-[#0A84FF]" /> Preferred Date
                            </label>
                            <div className="relative">
                                <CalIcon className="absolute left-4 top-4 h-5 w-5 text-[#0A84FF] pointer-events-none z-10" />
                                <Input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={today}
                                    className="pl-12 h-14 text-base border-2 border-[#CBD5E1] focus:border-[#0A84FF] focus:ring-4 focus:ring-[#0A84FF]/10 transition-all appearance-none"
                                    required
                                    disabled={isSubmitting || isSubmitted}
                                />
                            </div>
                        </div>

                        {/* Time Select */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[#1E293B] font-bold text-sm sm:text-base">
                                <Clock className="h-5 w-5 text-[#0A84FF]" /> Preferred Time
                            </label>
                            <CustomSelect disabled={isSubmitting || isSubmitted}>
                                <CustomSelectTrigger className="h-14 border-2 border-[#CBD5E1] hover:border-[#0A84FF] hover:bg-[#0A84FF]/5 transition-all">
                                    <Clock className="h-5 w-5 text-[#0A84FF]" />
                                    <CustomSelectValue placeholder="Choose a time slot" />
                                </CustomSelectTrigger>
                                <CustomSelectContent>
                                    <CustomSelectItem value="10am">10:00 AM – 11:00 AM</CustomSelectItem>
                                    <CustomSelectItem value="2pm">2:00 PM – 3:00 PM</CustomSelectItem>
                                    <CustomSelectItem value="5pm">5:00 PM – 6:00 PM</CustomSelectItem>
                                </CustomSelectContent>
                            </CustomSelect>
                        </div>

                        {/* Message */}
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-[#0A84FF]" />
                            <Textarea
                                placeholder="Briefly describe what you'd like to discuss (optional)"
                                rows={4}
                                className="pl-12 pt-4 text-base border-2 border-[#CBD5E1] focus:border-[#0A84FF] focus:ring-4 focus:ring-[#0A84FF]/10 resize-none transition-all"
                                disabled={isSubmitting || isSubmitted}
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isSubmitting || isSubmitted || !selectedDate}
                            className={cn(
                                "w-full h-16 text-lg font-bold rounded-2xl shadow-xl transition-all duration-300 flex items-center justify-center gap-3",
                                isSubmitted
                                    ? "bg-emerald-600 hover:bg-emerald-700"
                                    : "bg-gradient-to-r from-[#0A84FF] to-[#0052CC] hover:shadow-2xl hover:scale-[1.01]"
                            )}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Sending...
                                </>
                            ) : isSubmitted ? (
                                <>
                                    <CheckCircle2 className="h-6 w-6" />
                                    Request Sent!
                                </>
                            ) : (
                                <>
                                    <CalIcon className="h-6 w-6" />
                                    Send Request
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-[#64748B] font-medium">
                            Avg response: <span className="text-[#0A84FF] font-bold">under 2 hours</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}