// app/admin/dashboard/components/EditableContactInfo.tsx

"use client";

import { useState } from "react";

interface Social {
    whatsapp: string;
    twitter: string;
    instagram: string;
}

interface Contact {
    _id: string;
    hotline: string;
    email: string;
    address: string;
    social: Social;
}

export default function EditableContactInfo({ contact }: { contact: Contact }) {
    const [form, setForm] = useState({
        hotline: contact.hotline,
        email: contact.email,
        address: contact.address,
        social: contact.social || { whatsapp: "", twitter: "", instagram: "" },
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.startsWith("social.")) {
            const key = name.split(".")[1];
            setForm({ ...form, social: { ...form.social, [key]: value } });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/contact-info/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: contact._id, ...form }),
            });

            if (!res.ok) throw new Error("Failed to update");
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } catch (err) {
            console.error(err);
            alert("Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">Contact Info</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Hotline</label>
                    <input
                        name="hotline"
                        value={form.hotline}
                        onChange={handleChange}
                        className="w-full p-2 rounded border border-gray-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-2 rounded border border-gray-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full p-2 rounded border border-gray-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">WhatsApp</label>
                    <input
                        name="social.whatsapp"
                        value={form.social.whatsapp}
                        onChange={handleChange}
                        className="w-full p-2 rounded border border-gray-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Twitter</label>
                    <input
                        name="social.twitter"
                        value={form.social.twitter}
                        onChange={handleChange}
                        className="w-full p-2 rounded border border-gray-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Instagram</label>
                    <input
                        name="social.instagram"
                        value={form.social.instagram}
                        onChange={handleChange}
                        className="w-full p-2 rounded border border-gray-300"
                    />
                </div>

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>

                {success && <p className="text-green-500 mt-2">Saved successfully!</p>}
            </div>
        </div>
    );
}
