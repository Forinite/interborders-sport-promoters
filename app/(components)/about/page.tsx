// app/(components)/about/page.tsx
// app/(components)/about/page.tsx
import { client } from '@/sanity/lib/client';
import { ABOUT_QUERY } from '@/lib/queries';
import { PortableText } from '@portabletext/react';
import {About} from "@/types";

export const revalidate = 60;

export default async function AboutPage() {
    const about:About = await client.fetch(ABOUT_QUERY);

    console.log(about.goals);
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#FAFBFC]">
            <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">

                {/* Hero */}
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A84FF] to-[#0052CC]">InterBoarder</span>
                        <br />Sport Promoters
                    </h1>
                    <p className="mt-8 text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                        {about.heroSubtitle || "We exist to unlock the potential of every young person through the power of sports, stories, and support — no borders, no limits, no child left behind."}
                    </p>
                </div>

                {/* Background */}
                {about.background && (
                    <section>
                        <h2 className="text-4xl font-black text-center mb-12">Our Background</h2>
                        <div className="prose prose-lg max-w-4xl mx-auto text-slate-700">
                            {about.background}
                        </div>
                    </section>
                )}

                {/* Purpose */}
                {about.purpose && (
                    <section className="bg-white rounded-3xl shadow-2xl p-12">
                        <h2 className="text-4xl font-black text-center mb-8">Our Purpose</h2>
                        <div className="prose prose-lg max-w-4xl mx-auto text-slate-700">
                            {about.purpose}
                        </div>
                    </section>
                )}

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-12">
                    {about.mission && (
                        <section className="bg-gradient-to-br from-[#0A84FF]/10 to-[#0052CC]/10 rounded-3xl p-12">
                            <h2 className="text-4xl font-black mb-6 text-[#0A84FF]">Mission</h2>
                            <div className="prose prose-lg text-slate-700">
                                {about.mission}
                            </div>
                        </section>
                    )}
                    {about.vision && (
                        <section className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-12">
                            <h2 className="text-4xl font-black mb-6 text-purple-600">Vision</h2>
                            <div className="prose prose-lg text-slate-700">
                               {about.vision}
                            </div>
                        </section>
                    )}
                </div>

                {/* Goals */}
                {about.goals && (
                    <section>
                        <h2 className="text-4xl font-black text-center mb-12">Our Goals</h2>
                        <div className="prose prose-lg max-w-4xl mx-auto text-slate-700">
                            <ul className="list-disc list-inside">
                                {about.goals.map((goal, i) => (
                                    <li key={1}>{goal}</li>
                                ))}
                            </ul>
                        </div>


                    </section>
                )}
            </div>
        </div>
    );
}