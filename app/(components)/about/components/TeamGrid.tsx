// app/(components)/about/components/TeamGrid.tsx
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { type TeamMember } from '@/types';

type TeamGridProps = {
    team: TeamMember[];
};

export default function TeamGrid({ team }: TeamGridProps) {
    return (
        <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Meet Our Team</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {team.map((member) => (
                    <Card key={member.name} className="text-center">
                        <CardHeader>
                            <div className="relative aspect-square mx-auto mb-4 w-32 rounded-full overflow-hidden bg-muted">
                                <Image
                                    src={`/images/team/${member.name.toLowerCase().replace(/\s/g, '-')}.jpg`}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-green-600">{member.role}</p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{member.bio}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}