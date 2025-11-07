// app/(components)/about/components/PartnerLogos.tsx
import Image from 'next/image';
import { type Partner } from '@/types';

type PartnerLogosProps = {
    partners: Partner[];
};

export default function PartnerLogos({ partners }: PartnerLogosProps) {
    return (
        <section>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Our Partners</h2>
            <div className="flex flex-wrap justify-center items-center gap-8">
                {partners.map((partner) => (
                    <a
                        key={partner.name}
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 hover:opacity-100 transition-opacity"
                    >
                        <div className="relative h-16 w-32 bg-muted rounded">
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
        </section>
    );
}