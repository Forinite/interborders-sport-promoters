// app/(components)/contact/components/ContactInfo.tsx
import { contactInfo } from '@/constants/counsellingData';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactInfo() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                            <p className="font-medium">{contactInfo.hotline}</p>
                            <p className="text-sm text-muted-foreground">Mon–Fri, 9AM–5PM</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                            <p className="font-medium">{contactInfo.email}</p>
                            <p className="text-sm text-muted-foreground">Response within 24hrs</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                            <p className="font-medium">{contactInfo.address}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Office Hours
                </h4>
                <p className="text-sm">Monday–Friday: 9:00 AM – 5:00 PM</p>
                <p className="text-sm">Saturday: 10:00 AM – 2:00 PM</p>
                <p className="text-sm">Sunday: Closed</p>
            </div>
        </div>
    );
}