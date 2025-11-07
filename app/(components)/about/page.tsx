// app/(components)/about/page.tsx
import MissionSection from './components/MissionSection';
import TeamGrid from './components/TeamGrid';
import PartnerLogos from './components/PartnerLogos';
import { mission, team, partners } from '@/constants/aboutData';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About YouthSportNG</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    We exist to unlock the potential of every Nigerian child through sports, stories, and support.
                </p>
            </div>

            <MissionSection mission={mission} />
            <TeamGrid team={team} />
            <PartnerLogos partners={partners} />
        </div>
    );
}