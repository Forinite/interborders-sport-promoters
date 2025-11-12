// app/(components)/contact/page.tsx
'use client';

import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#F8FAFC]">
            <div className="max-w-6xl mx-auto px-6 py-20">

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Whether you’re reaching out for partnership, press, or support — our team is always here to listen and help.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid gap-10 lg:grid-cols-2">
                    {/* Contact Form */}
                    <div className="relative group">
                        <div className="absolute inset-0 translate-x-4 translate-y-4 bg-slate-200 rounded-2xl opacity-60" />
                        <div className="relative bg-white rounded-2xl border border-slate-200 shadow-md p-8 md:p-10 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#0A84FF] to-[#0052CC] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                    ISP
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Send us a message</h2>
                                    <p className="text-sm text-slate-500">We reply within <span className="text-[#0A84FF] font-semibold">24 hours</span></p>
                                </div>
                            </div>
                            <ContactForm />
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="relative group">
                        <div className="absolute inset-0 translate-x-4 translate-y-4 bg-slate-200 rounded-2xl opacity-60" />
                        <div className="relative bg-gradient-to-br from-[#0A84FF] to-[#0052CC] rounded-2xl shadow-md p-8 md:p-10 text-white transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                            <ContactInfo />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
