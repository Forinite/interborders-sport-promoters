// app/admin/dashboard/Modals/Events/EditEventModal.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useModal } from '../ModalContext';
import { Loader2, Upload, X, Check, Image as ImageIcon, Sparkles, Edit3 } from 'lucide-react';

interface Event {
    _id: string;
    title: string;
    sport?: string;
    date: string;
    time?: string;
    location: string;
    ageGroup?: string;
    isFree: boolean;
    spotsLeft?: number;
    registrationLink?: string;
    description?: string;
    image?: { asset?: { _id: string; url: string } };
}

interface Props { event: Event; }

export default function EditEventModal({ event }: Props) {
    const { closeModal } = useModal();
    const { toast } = useToast();
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isFree, setIsFree] = useState(event.isFree);
    const [originalImageRef, setOriginalImageRef] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (event.image?.asset?.url) {
            setPreview(event.image.asset.url);
            setOriginalImageRef(event.image.asset._id);
        }
    }, [event.image]);

    const handleFile = (file: File) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast({ title: 'Invalid type', description: 'Please upload an image', variant: 'destructive' });
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            toast({ title: 'Too large', description: 'Max 10MB', variant: 'destructive' });
            return;
        }
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        if (!dropZoneRef.current?.contains(e.relatedTarget as Node)) {
            setIsDragging(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        data.append('id', event._id);
        if (imageFile) data.append('image', imageFile);
        data.append('isFree', isFree.toString());
        if (originalImageRef && imageFile) data.append('oldImageRef', originalImageRef);

        try {
            setUploading(true);
            const res = await fetch('/api/event/edit', { method: 'PUT', body: data });
            if (!res.ok) throw new Error(await res.text());
            toast({ title: 'Updated!', description: 'Event saved.' });
            closeModal();
        } catch (err: any) {
            toast({ title: 'Error', description: err.message, variant: 'destructive' });
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="sm:p-6 lg:p-8 space-y-5 max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-[#0A84FF] to-[#0052CC] rounded-lg">
                        <Edit3 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 leading-tight">Edit Event</h2>
                        <p className="text-xs text-slate-500">Update details</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={closeModal} disabled={uploading}>
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-4">
                    <div><Label htmlFor="title">Title *</Label><Input id="title" name="title" defaultValue={event.title} required className="mt-1.5" /></div>
                    <div><Label htmlFor="sport">Sport</Label><Input id="sport" name="sport" defaultValue={event.sport} className="mt-1.5" /></div>
                    <div className="grid grid-cols-2 gap-3">
                        <div><Label htmlFor="date">Date *</Label><Input id="date" name="date" type="datetime-local" defaultValue={event.date.slice(0,16)} required className="mt-1.5" /></div>
                        <div><Label htmlFor="time">Time</Label><Input id="time" name="time" defaultValue={event.time} className="mt-1.5" /></div>
                    </div>
                    <div><Label htmlFor="location">Location *</Label><Input id="location" name="location" defaultValue={event.location} required className="mt-1.5" /></div>
                    <div><Label htmlFor="ageGroup">Age Group</Label><Input id="ageGroup" name="ageGroup" defaultValue={event.ageGroup} className="mt-1.5" /></div>
                </div>

                <div className="space-y-4">
                    <div><Label htmlFor="description">Description</Label><Textarea id="description" name="description" defaultValue={event.description} rows={4} className="mt-1.5 resize-none" /></div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="isFree" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[#0A84FF]" />
                        <Label htmlFor="isFree" className="text-sm font-medium cursor-pointer flex items-center gap-1">
                            <Sparkles className="h-3.5 w-3.5 text-green-500" /> Free Entry
                        </Label>
                    </div>
                    {!isFree && (
                        <>
                            <div><Label htmlFor="spotsLeft">Spots Left</Label><Input id="spotsLeft" name="spotsLeft" type="number" defaultValue={event.spotsLeft ?? ''} className="mt-1.5" /></div>
                            <div><Label htmlFor="registrationLink">Registration Link</Label><Input id="registrationLink" name="registrationLink" type="url" defaultValue={event.registrationLink} className="mt-1.5" /></div>
                        </>
                    )}
                    <div>
                        <Label className="flex items-center gap-1"><ImageIcon className="h-4 w-4" /> Event Image</Label>
                        <div className="mt-2">
                            {preview ? (
                                <div className="relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
                                    <img src={preview} alt="Preview" className="w-full h-60 object-cover group-hover:scale-105 transition-transform" />
                                    <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-sm drop-shadow">
                                        <Check className="h-4 w-4" /> <span>{imageFile?.name || 'Current'}</span>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-md"
                                            onClick={() => { setImageFile(null); setPreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div
                                    ref={dropZoneRef}
                                    className={`block relative ${isDragging ? 'ring-2 ring-[#0A84FF] ring-offset-2' : ''}`}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                >
                                    <div className={`flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                                        isDragging ? 'border-[#0A84FF] bg-blue-50' : 'border-slate-300 hover:border-[#0A84FF] hover:bg-slate-50'
                                    }`}>
                                        <Upload className={`h-9 w-9 mb-1 transition-colors ${isDragging ? 'text-[#0A84FF]' : 'text-slate-500'}`} />
                                        <p className={`text-sm transition-colors ${isDragging ? 'text-[#0A84FF]' : 'text-slate-600'}`}>
                                            {isDragging ? 'Drop image here' : 'Drop or click to change'}
                                        </p>
                                        <p className="text-xs text-slate-400">Max 10MB • JPG, PNG</p>
                                    </div>
                                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                                           onChange={(e) => { const file = e.target.files?.[0]; file? handleFile(file): null; }} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <Button type="button" variant="outline" onClick={closeModal} disabled={uploading}>Cancel</Button>
                <Button type="submit" disabled={uploading} className="min-w-32 bg-gradient-to-r from-[#0A84FF] to-[#0052CC] text-white font-medium shadow-lg hover:shadow-xl">
                    {uploading ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving... </> : <> <Sparkles className="mr-2 h-4 w-4" /> Save Changes </>}
                </Button>
            </div>
        </form>
    );
}