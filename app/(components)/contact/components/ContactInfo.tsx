// app/(components)/contact/components/ContactInfo.tsx
import { Phone, Mail, MapPin, Globe, Headphones, Clock } from 'lucide-react';
import { client } from '@/sanity/lib/client';

interface ContactInfoType {
    hotline?: string;
    email?: string;
    address?: string;
}

export default async function ContactInfo() {
    let contactInfo: ContactInfoType | null = null;
    try {
        contactInfo = await client.fetch<ContactInfoType>(`*[_type == "contactInfo"][0]{
      hotline,
      email,
      address
    }`);
    } catch (err) {
        console.error('Sanity contact fetch failed:', err);
    }

    const items = [
        {
            icon: <Headphones className="h-6 w-6" />,
            title: contactInfo?.hotline || '+234 800-ISP-HELP',
            subtitle: '24/7 Crisis Support • Free • Confidential',
        },
        {
            icon: <Mail className="h-6 w-6" />,
            title: contactInfo?.email || 'support@youthsportng.org',
            subtitle: 'Replies within 24 hours',
            href: contactInfo?.email ? `mailto:${contactInfo.email}` : 'mailto:support@youthsportng.org',
        },
        {
            icon: <MapPin className="h-6 w-6" />,
            title: 'Global HQ',
            subtitle: contactInfo?.address || 'Lagos, Nigeria',
        },
        {
            icon: <Globe className="h-6 w-6" />,
            title: 'Regional Offices',
            subtitle: 'London • Dubai • Nairobi • New York • São Paulo',
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl sm:text-3xl font-black mb-3">We’re Here 24/7</h3>
                <p className="text-white/90 text-sm sm:text-base">One mission. One team.</p>
            </div>

            <div className="space-y-6">
                {items.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                            {item.icon}
                        </div>
                        <div>
                            {item.href ? (
                                <a href={item.href} className="text-lg sm:text-xl font-bold hover:underline block">
                                    {item.title}
                                </a>
                            ) : (
                                <p className="text-lg sm:text-xl font-bold">{item.title}</p>
                            )}
                            <p className="text-sm text-white/80 mt-1">{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-6 border-t border-white/20">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 flex items-center gap-3">
                    <Clock className="h-6 w-6" />
                    <div>
                        <p className="font-bold text-sm sm:text-base">Live Support</p>
                        <p className="text-xs sm:text-sm text-white/80">Always open</p>
                    </div>
                </div>
            </div>
        </div>
    );
}