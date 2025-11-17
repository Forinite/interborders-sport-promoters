// app/(components)/contact/page.tsx
// app/(components)/contact/page.tsx
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default async function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-[#F9FAFB] to-[#F1F5F9] overflow-hidden">

            <div className="container mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 max-w-7xl">

                {/* Hero Header */}
                <header className="text-center mb-12 sm:mb-16 md:mb-20">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1E293B] leading-tight">
            <span className="relative inline-block">
              <span className="absolute -translate-x-1 -translate-y-1 text-[#E2E8F0] select-none opacity-70 text-3xl sm:text-4xl md:text-5xl">
                GET IN TOUCH
              </span>
              <span className="relative">GET IN TOUCH</span>
            </span>
                    </h1>
                    <p className="mt-6 text-base sm:text-lg md:text-xl text-[#475569] max-w-3xl mx-auto leading-relaxed font-light">
                        Partnership • Press • Support • Feedback — we’re listening 24/7.
                    </p>
                </header>

                {/* Grid Layout — Mobile Stacked */}
                <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
                    {/* Contact Form Card */}
                    <div className="relative group">
                        <div className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 bg-[#E2E8F0] rounded-2xl opacity-70 transition-all duration-500 group-hover:translate-x-8 group-hover:translate-y-8" />
                        <div className="relative bg-white rounded-2xl border-2 border-[#CBD5E1] shadow-xl p-6 sm:p-8 md:p-10 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#0A84FF] to-[#0052CC] rounded-xl flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg">
                                    ISP
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">Send a Message</h2>
                                    <p className="text-sm sm:text-base text-[#64748B]">Reply in <span className="text-[#0A84FF] font-bold">24 hours</span> or less</p>
                                </div>
                            </div>
                            <ContactForm />
                        </div>
                    </div>

                    {/* Contact Info Card */}
                    <div className="relative group">
                        <div className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 bg-[#0A84FF]/20 rounded-2xl opacity-70 transition-all duration-500 group-hover:translate-x-8 group-hover:translate-y-8" />
                        <div className="relative bg-gradient-to-br from-[#0A84FF] to-[#0052CC] rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 text-white transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 overflow-hidden">
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                            <div className="relative z-10">
                                <ContactInfo />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Badge */}
                <div className="mt-16 text-center">
                    <p className="text-xs text-[#94A3B8] tracking-wider font-medium">
                        © 2025 ISP • Global Youth Sports Network • Contact Command v22.0
                    </p>
                </div>
            </div>
        </div>
    );
}