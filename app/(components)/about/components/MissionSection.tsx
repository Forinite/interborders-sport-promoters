// app/(components)/about/components/MissionSection.tsx
export default function MissionSection({ mission }: { mission: string }) {
    return (
        <section className="mb-16">
            <div className="bg-green-50 rounded-lg p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg max-w-4xl mx-auto leading-relaxed">{mission}</p>
            </div>
        </section>
    );
}