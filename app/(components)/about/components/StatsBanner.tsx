// app/(components)/about/components/StatsBanner.tsx
export default function StatsBanner({ stats }: { stats: any[] }) {
    return (
        <div className="grid gap-8 md:grid-cols-4 mb-20">
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="relative group"
                    style={{ animationDelay: `${i * 150}ms` }}
                >
                    <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#E2E8F0] rounded-2xl opacity-60" />
                    <div className="relative bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm hover:shadow-xl transition-all duration-500 group-hover:translate-y-[-8px]">
                        <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0A84FF] to-[#0052CC]">
                            {stat.value}
                        </p>
                        <p className="mt-3 text-slate-600 font-semibold">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}