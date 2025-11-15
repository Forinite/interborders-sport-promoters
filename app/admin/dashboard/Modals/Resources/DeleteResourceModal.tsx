// app/admin/dashboard/Modals/Resources/DeleteResourceModal.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useModal } from '../ModalContext';
import { AlertTriangle, Trash2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface Resource { _id: string; title: string; }
interface Props { resource: Resource; }

export default function DeleteResourceModal({ resource }: Props) {
    const { closeModal } = useModal();
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await fetch(`/api/resource/delete?id=${resource._id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            closeModal();
        } catch { alert('Failed to delete'); } finally { setDeleting(false); }
    };

    return (
        <div className="p-6 sm:p-8 max-w-md mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">Delete Resource</h3>
                        <p className="text-xs text-slate-500">Permanent action</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 space-y-5 text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-9 w-9 text-red-600" />
                </div>
                <div>
                    <p className="text-base text-slate-700">Delete this resource?</p>
                    <p className="text-sm text-slate-600 mt-1">
                        <span className="font-semibold text-red-600">Cannot be undone</span>.
                    </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl w-full">
                    <p className="text-sm font-medium text-slate-900 line-clamp-2 leading-tight">"{resource.title}"</p>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-slate-200">
                <Button variant="outline" onClick={closeModal} disabled={deleting} className="min-w-28">Cancel</Button>
                <Button variant="destructive" onClick={handleDelete} disabled={deleting} className="min-w-36 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-lg hover:shadow-xl">
                    {deleting ? <>Deleting...</> : <> <Trash2 className="mr-2 h-4 w-4" /> Delete Permanently </>}
                </Button>
            </div>
        </div>
    );
}