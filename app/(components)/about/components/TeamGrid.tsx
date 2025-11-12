// app/(components)/about/components/TeamGrid.tsx

// app/(components)/about/components/TeamGrid.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Twitter } from 'lucide-react';
import {TeamMemberImage} from "@/constants/images";

export default function TeamGrid({ team }: { team: any[] }) {
    return (
        <section className="mb-20">
            <h2 className="text-3xl font-black text-center text-slate-900 mb-12">
                Leadership Team
            </h2>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {team.map((member, i) => (
                    <div
                        key={member.name}
                        className="relative group"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#E2E8F0] rounded-2xl opacity-60" />
                        <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 group-hover:translate-y-[-12px] overflow-hidden">
                            <div className="relative h-80 bg-gradient-to-b from-slate-100 to-slate-50">
                                <Image
                                    src={TeamMemberImage}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-slate-900">{member.name}</h3>
                                <p className="text-[#0A84FF] font-semibold text-lg">{member.role}</p>
                                <p className="mt-4 text-slate-600 leading-relaxed">{member.bio}</p>
                                <div className="flex gap-3 mt-6">
                                    {member.linkedin && (
                                        <a href={member.linkedin} className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-[#0A84FF] hover:text-white hover:border-[#0A84FF] transition-all">
                                            <Linkedin className="h-4 w-4" />
                                        </a>
                                    )}
                                    {member.twitter && (
                                        <a href={member.twitter} className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-[#0A84FF] hover:text-white hover:border-[#0A84FF] transition-all">
                                            <Twitter className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}