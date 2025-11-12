// app/(components)/about/components/MissionSection.tsx
// app/(components)/about/components/MissionSection.tsx
export default function MissionSection({ mission }: { mission: string }) {
    return (
        <section className="mb-20">
            <div className="relative group">
                <div className="absolute inset-0 translate-x-6 translate-y-6 bg-[#E2E8F0] rounded-3xl" />
                <div className="relative bg-gradient-to-br from-[#0A84FF]/5 to-emerald-50 rounded-3xl border-2 border-[#CBD5E1] p-12 md:p-20 text-center shadow-xl transition-all duration-500 group-hover:shadow-2xl">
                    <h2 className="text-4xl font-black text-slate-900 mb-8">
                        Our Global Mission
                    </h2>
                    <p className="text-xl text-slate-700 max-w-5xl mx-auto leading-relaxed font-light">
                        {mission}
                    </p>

                </div>
            </div>
        </section>
    );
}