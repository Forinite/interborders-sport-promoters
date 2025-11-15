// app/admin/dashboard/Modals/Stories/DeleteStoryModal.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useModal } from '../ModalContext';
import { AlertTriangle, Trash2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface Story {
    _id: string;
    title: string;
}

interface DeleteStoryModalProps {
    story: Story;
}

export default function DeleteStoryModal({ story }: DeleteStoryModalProps) {
    const { closeModal } = useModal();
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await fetch(`/api/story/delete?id=${story._id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete');

            closeModal();
        } catch {
            alert('Failed to delete story');
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="p-6 sm:p-8 max-w-md mx-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">
                            Delete Story
                        </h3>
                        <p className="text-xs text-slate-500">Permanent action</p>
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="mt-6 space-y-5 text-center">
                {/* WARNING ICON */}
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-9 w-9 text-red-600" />
                </div>

                {/* MESSAGE */}
                <div>
                    <p className="text-base text-slate-700">
                        Are you sure you want to delete this story?
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                        This action <span className="font-semibold text-red-600">cannot be undone</span>.
                    </p>
                </div>

                {/* STORY PREVIEW */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl w-full">
                    <p className="text-sm font-medium text-slate-900 line-clamp-2 leading-tight">
                        "{story.title}"
                    </p>
                </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-slate-200">
                <Button
                    variant="outline"
                    onClick={closeModal}
                    disabled={deleting}
                    className="min-w-28"
                >
                    Cancel
                </Button>
                <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="min-w-36 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                >
                    {deleting ? (
                        <>Deleting...</>
                    ) : (
                        <>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Permanently
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}