// app/admin/dashboard/Modals/Resources/DeleteResourceModal.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { client } from '@/sanity/lib/client';
import { useModal } from '../ModalContext';
import { useToast } from '@/components/ui/use-toast';
import { Resource } from '@/types';

interface DeleteResourceModalProps {
    resource: Resource;
}

export default function DeleteResourceModal({ resource }: DeleteResourceModalProps) {
    const { closeModal } = useModal();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await client.delete(resource._id);
            toast({ title: 'Deleted', description: 'Resource removed permanently.' });
            closeModal();
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Delete Resource</h3>
            <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to delete "<strong>{resource.title}</strong>"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={closeModal} disabled={loading}>
                    Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete'}
                </Button>
            </div>
        </div>
    );
}