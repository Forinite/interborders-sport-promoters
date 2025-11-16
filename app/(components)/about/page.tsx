// app/(components)/about/page.tsx
// app/(components)/about/page.tsx
import MissionSection from './components/MissionSection';
import TeamGrid from './components/TeamGrid';

import { mission, team, partners } from '@/constants/aboutData';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#FAFBFC]">
            <div className="max-w-7xl mx-auto px-6 py-20">

                {/* Hero Header — Global Authority */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A84FF] to-[#0052CC]">InterBoarder</span>
                        <br />Sport Promoters
                    </h1>
                    <p className="mt-8 text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                        We exist to unlock the potential of every young person through the power of sports, stories, and support —
                        no borders, no limits, no child left behind.
                    </p>
                </div>

                <MissionSection mission={mission} />
                <TeamGrid team={team} />
            </div>
        </div>
    );
}
