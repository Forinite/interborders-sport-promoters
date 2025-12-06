// app/admin/dashboard/about/page.tsx
import { client } from '@/sanity/lib/client';
import { ABOUT_QUERY } from '@/lib/queries';
import InlineText from '@/components/admin/InlineText';
import InlineArray from "@/components/admin/InlineArray";

export const revalidate = 0;


export default async function AboutAdmin() {
    const about = await client.fetch(ABOUT_QUERY) || {};

    // Ensure the document exists
    const docId = about._id || 'about';
    console.log(about)

    // Example usage in a component or page


    return (
        <div className="p-8 max-w-6xl mx-auto space-y-16">
            <div className="text-center">
                <h1 className="text-5xl font-black bg-gradient-to-r from-[#0A84FF] to-[#0052CC] bg-clip-text text-transparent">
                    Edit About Page
                </h1>
                <p className="text-slate-600 mt-4">Click any section to edit</p>
            </div>

            <section className="bg-gradient-to-br from-[#0A84FF]/5 to-purple-500/5 rounded-3xl p-10">
                <h2 className="text-3xl font-black mb-6">Hero Subtitle</h2>
                <InlineText docId={docId} field="heroSubtitle" defaultValue={about.heroSubtitle} />
            </section>

            <section className="bg-white rounded-3xl shadow-2xl p-10">
                <h2 className="text-3xl font-black mb-6 text-[#0A84FF]">Background & History</h2>
                <InlineText docId={docId} field="background" defaultValue={about.background} />
            </section>

            <section className="bg-white rounded-3xl shadow-2xl p-10">
                <h2 className="text-3xl font-black mb-6 text-green-600">Purpose</h2>
                <InlineText docId={docId} field="purpose" defaultValue={about.purpose || ''} />
            </section>

            <section className="bg-gradient-to-br from-[#0A84FF]/10 to-[#0052CC]/10 rounded-3xl p-10">
                <h2 className="text-3xl font-black mb-6 text-[#0A84FF]">Mission Statement</h2>
                <InlineText docId={docId} field="mission" defaultValue={about.mission || ''} />
            </section>

            <section className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-10">
                <h2 className="text-3xl font-black mb-6 text-purple-600">Vision Statement</h2>
                <InlineText docId={docId} field="vision" defaultValue={about.vision || ''} />
            </section>

            <section className="bg-white rounded-3xl shadow-2xl p-10">
                <h2 className="text-3xl font-black mb-6 text-red-600">Goals & Objectives</h2>
                <InlineArray docId={docId} field="goals" defaultValue={about.goals || []} />            </section>

        </div>
    );
}