// app/(components)/counselling/components/BookingPanel.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useToast } from '@/components/ui/use-toast';

export default function BookingPanel() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    // const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // toast({
        //     title: 'Booking Request Sent!',
        //     description: 'We\'ll confirm your session within 24 hours.',
        // });
    };

    return (
        <div className="sticky top-24 bg-card rounded-lg border p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Book a Free Session</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Your Name" required />
                <Input type="email" placeholder="Email" required />
                <Input type="tel" placeholder="Phone Number" required />

                <div className="space-y-2">
                    <label className="text-sm font-medium">Preferred Date</label>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border"
                    />
                </div>

                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Preferred Time" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10am">10:00 AM</SelectItem>
                        <SelectItem value="2pm">2:00 PM</SelectItem>
                        <SelectItem value="5pm">5:00 PM</SelectItem>
                    </SelectContent>
                </Select>

                <Textarea placeholder="Briefly describe your needs (optional)" rows={3} />

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Send Request
                </Button>
            </form>
        </div>
    );
}