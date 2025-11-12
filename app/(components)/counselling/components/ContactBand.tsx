// app/(components)/counselling/components/ContactBand.tsx

import { contactInfo } from '@/constants/counsellingData';
import { Phone, MessageCircle, Mail, Shield } from 'lucide-react';

export default function ContactBand() {
    return (
        <section className="mt-20 relative">
            {/* Depth accent */}
            <div className="absolute inset-0 translate-x-2 translate-y-2 bg-blue-100/60 rounded-2xl blur-[1px]" />

            <div className="relative bg-white/80 backdrop-blur-md rounded-2xl border border-blue-100 shadow-xl p-8 md:p-12 transition-all hover:shadow-2xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full shadow-sm">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-700 tracking-wide">
              24/7 Crisis Support
            </span>
                    </div>
                    <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-slate-900">
                        Need Help Right Now?
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                        You’re not alone — we’re here to listen and support you.
                    </p>
                </div>

                {/* Contact Options */}
                <div className="grid gap-8 md:grid-cols-3">
                    {/* Hotline */}
                    <div className="text-center group">
                        <div className="w-14 h-14 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
                            <Phone className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-lg font-semibold text-slate-800">{contactInfo.hotline}</p>
                        <p className="text-sm text-slate-500 mt-1">Call anytime • Free • Confidential</p>
                    </div>

                    {/* WhatsApp */}
                    <div className="text-center group">
                        <div className="w-14 h-14 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
                            <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-lg font-semibold text-slate-800">WhatsApp</p>
                        <a
                            href={`https://wa.me/${contactInfo.social.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-blue-600 hover:underline"
                        >
                            Chat Now →
                        </a>
                    </div>

                    {/* Email */}
                    <div className="text-center group">
                        <div className="w-14 h-14 mx-auto mb-4 bg-indigo-600 rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
                            <Mail className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-lg font-semibold text-slate-800">{contactInfo.email}</p>
                        <p className="text-sm text-slate-500 mt-1">Replies within 1 hour</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
