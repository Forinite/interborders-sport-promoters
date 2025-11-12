// app/(components)/counselling/page.tsx
'use client';

import ResourceGrid from './components/ResourceGrid';
import BookingPanel from './components/BookingPanel';
import ContactBand from './components/ContactBand';
import { resources } from '@/constants/counsellingData';

export default function CounsellingPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="container mx-auto px-5 md:px-8 py-16 md:py-24 max-w-7xl">

                {/* National Healing Header */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-black text-[#1E293B] leading-tight">
            <span className="relative inline-block">
              <span className="absolute -translate-x-1.5 -translate-y-1.5 text-[#E2E8F0] select-none opacity-70">
                GET SUPPORT
              </span>
              <span className="relative">GET SUPPORT</span>
            </span>
                    </h1>

                    <p className="mt-8 text-xl md:text-2xl text-[#475569] max-w-4xl mx-auto leading-relaxed font-light">
                        Free counselling, mental health resources, and personal development tools designed for youth.
                    </p>

                    {/* Official Seal */}
                    <div className="mt-12 inline-flex items-center gap-6 px-10 py-6 bg-white border-4 border-[#CBD5E1] rounded-full shadow-2xl">
                        <div className="w-16 h-16 bg-[#0A84FF] rounded-full flex items-center justify-center">
                            <span className="text-white font-black text-2xl">ISP</span>
                        </div>
                        <div className="text-left">
                            <p className="text-2xl font-bold text-[#1E293B]">Youth</p>
                            <p className="text-sm text-[#64748B] font-medium">Mental Health & Development Division</p>
                        </div>
                    </div>
                </div>

                {/* Main Layout */}
                <div className="grid gap-12 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <ResourceGrid resources={resources} />
                    </div>
                    <div className="lg:col-span-1">
                        <BookingPanel />
                    </div>
                </div>

                <ContactBand />
            </div>
        </div>
    );
}