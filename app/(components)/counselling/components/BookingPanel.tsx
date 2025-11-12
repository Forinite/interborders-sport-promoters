// app/(components)/counselling/components/BookingPanel.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
    CustomSelect,
    CustomSelectTrigger,
    CustomSelectValue,
    CustomSelectContent,
    CustomSelectItem
} from '@/components/ui/custom-select';
import { User, Mail, Phone, Calendar as CalIcon, Clock, MessageSquare } from 'lucide-react';

export default function BookingPanel() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div className="sticky top-24">
            <div className="relative bg-white/95 backdrop-blur-sm border border-slate-200 shadow-lg rounded-2xl p-8 transition-transform hover:-translate-y-1">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-800">Book a Free Session</h3>
                    <p className="mt-2 text-slate-500 text-sm">
                        100% confidential • Free • Certified counsellors
                    </p>
                </div>

                <form className="space-y-5">
                    {/* Name */}
                    <div className="relative">
                        <User className="absolute left-4 top-4 h-5 w-5 text-sky-600" />
                        <Input
                            placeholder="Full Name"
                            className="pl-12 h-12 border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-4 top-4 h-5 w-5 text-sky-600" />
                        <Input
                            type="email"
                            placeholder="Email Address"
                            className="pl-12 h-12 border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                        <Phone className="absolute left-4 top-4 h-5 w-5 text-sky-600" />
                        <Input
                            type="tel"
                            placeholder="Phone Number"
                            className="pl-12 h-12 border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                            required
                        />
                    </div>

                    {/* Date Picker */}
                    <div>
                        <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                            <CalIcon className="h-5 w-5 text-sky-600" /> Preferred Date
                        </label>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(d) => d < new Date()}
                            className="rounded-xl border border-slate-200 shadow-inner"
                        />
                    </div>

                    {/* Time Select */}
                    <CustomSelect>
                        <CustomSelectTrigger className="h-12 border border-slate-300 hover:border-sky-600 transition-colors">
                            <Clock className="h-5 w-5 text-sky-600" />
                            <CustomSelectValue placeholder="Preferred Time" />
                        </CustomSelectTrigger>
                        <CustomSelectContent>
                            <CustomSelectItem value="10am">10:00 AM - 11:00 AM</CustomSelectItem>
                            <CustomSelectItem value="2pm">2:00 PM - 3:00 PM</CustomSelectItem>
                            <CustomSelectItem value="5pm">5:00 PM - 6:00 PM</CustomSelectItem>
                        </CustomSelectContent>
                    </CustomSelect>

                    {/* Message */}
                    <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-sky-600" />
                        <Textarea
                            placeholder="Briefly describe what you'd like to discuss (optional)"
                            rows={4}
                            className="pl-12 pt-3 border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <Button className="w-full h-14 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-md transition-transform hover:-translate-y-0.5">
                        Send Request
                    </Button>
                </form>

                <p className="mt-5 text-center text-sm text-slate-500">
                    Avg response time: <span className="text-sky-600 font-semibold">under 2 hours</span>
                </p>
            </div>
        </div>
    );
}
