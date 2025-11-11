// app/admin/dashboard/Modals/Events/EditEventModal.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { client } from '@/sanity/lib/client';
import { useModal } from '../ModalContext';
import { useToast } from '@/components/ui/use-toast';
import { Event } from '@/types';

interface EditEventModalProps {
    event: Event;
}

export default function EditEventModal({ event }: EditEventModalProps) {
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

            await client.patch(event._id).set({
                title: data.title,
                sport: data.sport,
                date: data.date,
                time: data.time,
                location: data.location,
                ageGroup: data.ageGroup,
                isFree: data.isFree === 'true',
                spotsLeft: data.spotsLeft ? parseInt(data.spotsLeft) : undefined,
                registrationLink: data.registrationLink,
                description: data.description,
                image: imageAsset ? { _type: 'image', asset: { _ref: imageAsset._id } } : undefined,
            }).commit();

            toast({ title: 'Success', description: 'Event updated!' });
            closeModal();
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to update event', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold">Edit Event</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" defaultValue={event.title} required />
                </div>
                <div>
                    <Label htmlFor="sport">Sport</Label>
                    <Input id="sport" name="sport" defaultValue={event.sport} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="datetime-local" defaultValue={event.date?.slice(0, 16)} required />
                </div>
                <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" name="time" defaultValue={event.time} />
                </div>
            </div>

            <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" defaultValue={event.location} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="ageGroup">Age Group</Label>
                    <Input id="ageGroup" name="ageGroup" defaultValue={event.ageGroup} />
                </div>
                <div>
                    <Label htmlFor="isFree">Entry Type</Label>
                    <select name="isFree" defaultValue={event.isFree?.toString()} className="w-full px-3 py-2 border rounded-md">
                        <option value="true">Free</option>
                        <option value="false">Paid</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="spotsLeft">Spots Left</Label>
                    <Input id="spotsLeft" name="spotsLeft" type="number" min="0" defaultValue={event.spotsLeft} />
                </div>
                <div>
                    <Label htmlFor="registrationLink">Registration Link</Label>
                    <Input id="registrationLink" name="registrationLink" type="url" defaultValue={event.registrationLink} />
                </div>
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={3} defaultValue={event.description} />
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