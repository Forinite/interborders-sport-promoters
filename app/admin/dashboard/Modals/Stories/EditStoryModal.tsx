// app/admin/dashboard/Modals/Stories/EditStoryModal.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { client } from '@/sanity/lib/client';
import { useModal } from '../ModalContext';
import { useToast } from '@/components/ui/use-toast';
import { Story } from '@/types';

interface EditStoryModalProps {
    story: Story;
}

export default function EditStoryModal({ story }: EditStoryModalProps) {
    const { closeModal } = useModal();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const data: any = Object.fromEntries(form.entries());

        setLoading(true);

        try {
            let imageAsset = null;
            if (imageFile) {
                imageAsset = await client.assets.upload('image', imageFile);
            }

            await client.patch(story._id).set({
                title: data.title,
                excerpt: data.excerpt,
                author: data.author,
                tags: data.tags ? data.tags.split(',').map((t: string) => t.trim()) : [],
                image: imageAsset ? { _type: 'image', asset: { _ref: imageAsset._id } } : undefined,
            }).commit();

            toast({ title: 'Success', description: 'Story updated!' });
            closeModal();
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to update', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4" >
            <h3 className="text-lg font-semibold">Edit Story</h3>

            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={story.title} required />
            </div>

            <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" name="excerpt" defaultValue={story.excerpt} rows={3} />
            </div>

            <div>
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" defaultValue={story.author} />
            </div>

            <div>
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" name="tags" defaultValue={story.tags?.join(', ')} />
            </div>

            <div>
                <Label htmlFor="image">Update Image</Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={closeModal} disabled={loading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </form>
    );
}