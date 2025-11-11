// app/admin/dashboard/Modals/Resources/EditResourceModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { client } from '@/sanity/lib/client';
import { useModal } from '../ModalContext';
import { useToast } from '@/components/ui/use-toast';
import { Resource } from '@/types';

interface EditResourceModalProps {
    resource: Resource;
}

export default function EditResourceModal({ resource }: EditResourceModalProps) {
    const { closeModal } = useModal();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [format, setFormat] = useState<'pdf' | 'video' | 'article'>(resource.format);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        setFormat(resource.format);
    }, [resource.format]);

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

            const patch = client.patch(resource._id).set({
                title: data.title,
                summary: data.summary,
                format: data.format,
                fileUrl: data.fileUrl || undefined,
                videoUrl: data.videoUrl || undefined,
                tags: data.tags ? data.tags.split(',').map((t: string) => t.trim()) : [],
                publishedAt: data.publishedAt || resource.publishedAt,
                image: imageAsset ? { _type: 'image', asset: { _ref: imageAsset._id } } : undefined,
            });

            // Clear fields based on format
            if (data.format === 'pdf') {
                patch.unset(['videoUrl']);
            } else if (data.format === 'video') {
                patch.unset(['fileUrl']);
            }

            await patch.commit();

            toast({ title: 'Success', description: 'Resource updated!' });
            closeModal();
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to update resource', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold">Edit Resource</h3>

            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={resource.title} required />
            </div>

            <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea id="summary" name="summary" rows={3} defaultValue={resource.summary} />
            </div>

            <div>
                <Label htmlFor="format">Format</Label>
                <select
                    id="format"
                    name="format"
                    className="w-full px-3 py-2 border rounded-md"
                    value={format}
                    onChange={(e) => setFormat(e.target.value as any)}
                >
                    <option value="pdf">PDF</option>
                    <option value="video">Video</option>
                    <option value="article">Article</option>
                </select>
            </div>

            {format === 'pdf' && (
                <div>
                    <Label htmlFor="fileUrl">PDF URL</Label>
                    <Input id="fileUrl" name="fileUrl" type="url" defaultValue={resource.fileUrl} />
                </div>
            )}

            {format === 'video' && (
                <div>
                    <Label htmlFor="videoUrl">Video URL</Label>
                    <Input id="videoUrl" name="videoUrl" type="url" defaultValue={resource.videoUrl} />
                </div>
            )}

            <div>
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" name="tags" defaultValue={resource.tags?.join(', ')} />
            </div>

            <div>
                <Label htmlFor="publishedAt">Published At</Label>
                <Input
                    id="publishedAt"
                    name="publishedAt"
                    type="datetime-local"
                    defaultValue={resource.publishedAt?.slice(0, 16)}
                />
            </div>

            <div>
                <Label htmlFor="image">Update Thumbnail</Label>
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