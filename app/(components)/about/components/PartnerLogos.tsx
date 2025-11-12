// app/(components)/about/components/PartnerLogos.tsx

import Image from "next/image";

export default function PartnerLogos({ partners }: { partners: any[] }) {
    return (
        <section>
            <h2 className="text-3xl font-black text-center text-slate-900 mb-12">
                Trusted By Global Leaders
            </h2>
            <div className="bg-white border border-slate-200 rounded-3xl p-12 shadow-sm">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-10 items-center justify-items-center opacity-60 hover:opacity-100 transition-opacity">
                    {partners.map((partner) => (
                        <a
                            key={partner.name}
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <div className="relative h-20 w-40 bg-slate-50 rounded-xl flex items-center justify-center p-4 group-hover:bg-slate-100 transition-all">
                                    <Image
                                        src={`/images/partners/${partner.name.toLowerCase().replace(/\s/g, '-')}.png`}
                                        alt={partner.logo.alt || partner.name}
                                        fill
                                        className="object-contain p-4"
                                    />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
