// app/admin/seed-contact/page.tsx

'use client';

import { useState } from 'react';

export default function SeedContactPage() {
    const [message, setMessage] = useState('');

    const handleSeed = async () => {
        const res = await fetch('/api/contact/seed', { method: 'POST' });
        const data = await res.json();
        setMessage(data.message || 'Done');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
            <h1 className="text-3xl font-bold mb-6">Seed Contact Info</h1>
            <button
                onClick={handleSeed}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
                Seed Data
            </button>
            {message && <p className="mt-4 text-lg text-gray-700">{message}</p>}
        </div>
    );
}
