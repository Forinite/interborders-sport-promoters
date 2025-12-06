// components/admin/InlineRichText.tsx
'use client';

import { useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { PortableText } from '@portabletext/react';
import {writeClient} from "@/sanity/lib/writeClient";

interface Props {
    docId: string;
    field: string;
    defaultValue?: any;
}

export default function InlineRichText({ docId, field, defaultValue = [] }: Props) {
    const [value, setValue] = useState(defaultValue);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const save = async () => {
        setLoading(true);
        await writeClient.patch(docId).set({ [field]: value }).commit();
        setLoading(false);
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div
                onClick={() => setIsEditing(true)}
                className="cursor-pointer hover:bg-slate-50 p-8 rounded-2xl transition prose prose-lg max-w-none"
            >
                {value && value.length > 0 ? (
                    <PortableText value={value} />
                ) : (
                    <p className="text-slate-400 italic">Click to add content...</p>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6 bg-white border border-slate-200 rounded-2xl shadow-lg">
            <RichTextEditor value={value} onChange={setValue} placeholder="Start writing..." />
            <div className="flex gap-3">
                <Button onClick={save} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button variant="outline" onClick={() => { setIsEditing(false); setValue(defaultValue); }}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}