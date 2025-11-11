// app/admin/dashboard/Modals/Stories/AddStoryModal.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { client } from '@/sanity/lib/client';
import { useModal } from '../ModalContext';
import { useToast } from '@/components/ui/use-toast';

export default function AddStoryModal() {
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

            await client.create({
                _type: 'story',
                title: data.title,
                slug: { _type: 'slug', current: data.title.toLowerCase().replace(/\s+/g, '-') },
                excerpt: data.excerpt,
                author: data.author,
                publishedAt: new Date().toISOString(),
                tags: data.tags ? data.tags.split(',').map((t: string) => t.trim()) : [],
                image: imageAsset ? { _type: 'image', asset: { _ref: imageAsset._id } } : undefined,
            });

            toast({ title: 'Success', description: 'Story created!' });
            closeModal();
        } catch (err) {
            toast({
                title: 'Error',
                description: 'Failed to create story',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Add New Story</h3>

            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Enter story title" required />
            </div>

            <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" name="excerpt" placeholder="Brief summary..." rows={3} />
            </div>

            <div>
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" placeholder="Author name" />
            </div>

            <div>
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" name="tags" placeholder="football, scholarship, lagos" />
            </div>

            <div>
                <Label htmlFor="image">Featured Image</Label>
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
                    {loading ? 'Creating...' : 'Create Story'}
                </Button>
            </div>
        </form>
    );
}