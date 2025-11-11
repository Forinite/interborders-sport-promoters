// app/admin/dashboard/Modals/Stories/DeleteStoryModal.tsx
'use client';

import { Button } from '@/components/ui/button';
import { client } from '@/sanity/lib/client';
import { useModal } from '../ModalContext';
import { useToast } from '@/components/ui/use-toast';
import { Story } from '@/types';
import {useState} from "react";

interface DeleteStoryModalProps {
    story: Story;
}

export default function DeleteStoryModal({ story }: DeleteStoryModalProps) {
    const { closeModal } = useModal();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await client.delete(story._id);
            toast({ title: 'Deleted', description: 'Story removed permanently.' });
            closeModal();
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Delete Story</h3>
            <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to delete "<strong>{story.title}</strong>"? This action cannot be undone.
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