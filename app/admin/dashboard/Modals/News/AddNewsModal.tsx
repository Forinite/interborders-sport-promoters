// app/admin/dashboard/Modals/News/AddNewsModal.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { client } from '@/sanity/lib/client';
import { useModal } from '../ModalContext';
import { useToast } from '@/components/ui/use-toast';

export default function AddNewsModal() {
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
                _type: 'news',
                title: data.title,
                slug: { _type: 'slug', current: data.title.toLowerCase().replace(/\s+/g, '-') },
                excerpt: data.excerpt,
                publishedAt: data.publishedAt || new Date().toISOString(),
                author: data.author,
                tags: data.tags ? data.tags.split(',').map((t: string) => t.trim()) : [],
                image: imageAsset ? { _type: 'image', asset: { _ref: imageAsset._id } } : undefined,
            });

            toast({ title: 'Success', description: 'News article created!' });
            closeModal();
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to create article', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold">Add News Article</h3>

            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
            </div>

            <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" name="excerpt" rows={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" name="author" placeholder="John Doe" />
                </div>
                <div>
                    <Label htmlFor="publishedAt">Published At</Label>
                    <Input id="publishedAt" name="publishedAt" type="datetime-local" />
                </div>
            </div>

            <div>
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" name="tags" placeholder="football, tournament, youth" />
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
                    {loading ? 'Creating...' : 'Create Article'}
                </Button>
            </div>
        </form>
    );
}