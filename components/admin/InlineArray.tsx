'use client';

import { useState } from 'react';
import {writeClient} from "@/sanity/lib/writeClient";

interface InlineArrayProps {
    docId: string;
    field: string;
    defaultValue: string[];
}

export default function InlineArray({ docId, field, defaultValue }: InlineArrayProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [items, setItems] = useState<string[]>(defaultValue || []);
    const [saving, setSaving] = useState(false);

    const saveToSanity = async () => {
        setSaving(true);

        try {
            await writeClient.patch(docId).set({ [field]: items }).commit();
        } catch (err) {
            console.error('Save failed:', err);
        }

        setSaving(false);
        setIsEditing(false);
    };

    const addItem = () => {
        setItems([...items, ""]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, value: string) => {
        const updated = [...items];
        updated[index] = value;
        setItems(updated);
    };

    if (!isEditing) {
        return (
            <div
                className="cursor-pointer space-y-2"
                onClick={() => setIsEditing(true)}
            >
                {items.length === 0 && (
                    <p className="text-slate-500">No goals added yet.</p>
                )}

                {items.map((item, idx) => (
                    <p key={idx} className="text-lg">{item}</p>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {items.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                    <input
                        value={item}
                        onChange={(e) => updateItem(idx, e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <button
                        onClick={() => removeItem(idx)}
                        className="px-2 py-1 bg-red-500 text-white rounded-lg"
                    >
                        ×
                    </button>
                </div>
            ))}

            <button
                onClick={addItem}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg"
            >
                + Add Goal
            </button>

            <button
                onClick={saveToSanity}
                className="px-4 py-2 bg-green-600 text-white rounded-lg ml-3"
            >
                {saving ? 'Saving...' : 'Save'}
            </button>
        </div>
    );
}
