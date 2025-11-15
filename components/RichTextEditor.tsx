// components/RichTextEditor.tsx
// components/RichTextEditor.tsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Link2, Heading2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface Props {
    value: any;
    onChange: (value: any) => void;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Write your article...' }: Props) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder }),
        ],
        content: value,
        onUpdate: ({ editor }) => onChange(editor.getJSON()),
        immediatelyRender: false, // ← CRITICAL FIX
    }, []);

    // Prevent SSR render
    if (!isMounted || !editor) {
        return (
            <div className="border border-slate-300 rounded-lg p-4 min-h-64 bg-slate-50">
                <p className="text-slate-400">Loading editor...</p>
            </div>
        );
    }

    return (
        <div className="border border-slate-300 rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-300 p-2 flex gap-1 flex-wrap">
                <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-slate-200' : ''}>
                    <Bold className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-slate-200' : ''}>
                    <Italic className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-slate-200' : ''}>
                    <Heading2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-slate-200' : ''}>
                    <List className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-slate-200' : ''}>
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => {
                    const url = window.prompt('URL');
                    if (url) editor.chain().focus().setLink({ href: url }).run();
                }}>
                    <Link2 className="h-4 w-4" />
                </Button>
            </div>
            <EditorContent editor={editor} className="prose prose-sm max-w-none p-4 min-h-64" />
        </div>
    );
}