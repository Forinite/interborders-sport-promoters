// components/admin/InlineText.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {writeClient} from "@/sanity/lib/writeClient";


interface Props {
    docId: string;
    field: string;
    defaultValue?: string;
}

export default function InlineText({ docId, field, defaultValue = '' }: Props) {
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
                className="cursor-pointer hover:bg-slate-50 p-4 rounded-lg transition"
            >
                <p className="text-lg text-slate-700">{value || <span className="text-slate-400">Click to add text...</span>}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
      <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-3 border border-slate-300 rounded-lg resize-none min-h-32"
          autoFocus
      />
            <div className="flex gap-2">
                <Button onClick={save} disabled={loading} size="sm">
                    {loading ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="outline" size="sm" onClick={() => { setIsEditing(false); setValue(defaultValue); }}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}