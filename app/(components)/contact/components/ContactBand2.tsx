// app/(components)/counselling/components/ContactBand.tsx
import { contactInfo } from '@/constants/counsellingData';
import { Phone, MessageCircle, Mail } from 'lucide-react';

export default function ContactBand2() {
    return (
        <section className="mt-16 bg-green-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-6">
                Need Immediate Help?
            </h3>

            <div className="grid gap-6 md:grid-cols-3 text-center">
                {/* Hotline */}
                <div>
                    <Phone className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="font-semibold">{contactInfo.hotline}</p>
                    <p className="text-sm text-muted-foreground">
                        Mon–Fri, 9 AM–5 PM
                    </p>
                </div>

                {/* WhatsApp */}
                <div>
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="font-semibold">WhatsApp</p>
                    <a
                        href={`https://wa.me/${contactInfo.social.whatsapp.replace(
                            /\D/g,
                            ''
                        )}`}
                        className="text-sm text-green-600 hover:underline"
                    >
                        Chat Now
                    </a>
                </div>

                {/* Email */}
                <div>
                    <Mail className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="font-semibold">{contactInfo.email}</p>
                    <p className="text-sm text-muted-foreground">
                        Response within 24 hrs
                    </p>
                </div>
            </div>
        </section>
    );
}