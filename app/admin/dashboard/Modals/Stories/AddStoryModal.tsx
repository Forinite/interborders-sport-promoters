// app/admin/dashboard/Modals/Stories/AddStoryModal.tsx
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useModal } from '../ModalContext';
import { Loader2, Upload, X, Check, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function AddStoryModal() {
    const { closeModal } = useModal();
    const { toast } = useToast();
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [featured, setFeatured] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    const handleFile = (file: File) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast({ title: 'Invalid type', description: 'Please upload an image', variant: 'destructive' });
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            toast({ title: 'Too large', description: 'Image must be under 10MB', variant: 'destructive' });
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        if (imageFile) data.append('image', imageFile);
        data.append('featured', featured.toString());

        try {
            setUploading(true);
            const res = await fetch('/api/story/add', {
                method: 'POST',
                body: data,
            });

            if (!res.ok) {
                const error = await res.text();
                throw new Error(error.substring(0, 200));
            }

            toast({
                title: 'Success!',
                description: 'Your story has been published.',
            });

            form.reset();
            setImageFile(null);
            setPreview(null);
            setFeatured(false);
            closeModal();
        } catch (err: any) {
            toast({
                title: 'Error',
                description: err.message || 'Failed to create story',
                variant: 'destructive',
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="sm:p-6 lg:p-8 space-y-5 max-w-4xl mx-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-[#0A84FF] to-[#0052CC] rounded-lg">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 leading-tight">
                            Create Success Story
                        </h2>
                        <p className="text-xs text-slate-500">Inspire the next generation</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={closeModal} disabled={uploading}>
                    <X className="h-5 w-5" />
                </Button>
            </div>

            {/* FORM GRID */}
            <div className="grid lg:grid-cols-2 gap-x-8 gap-y-6">
                {/* LEFT COLUMN */}
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="title">
                            Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="From Lagos to the World Cup"
                            required
                            className="mt-1.5"
                        />
                    </div>

                    <div>
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                            id="excerpt"
                            name="excerpt"
                            placeholder="A powerful summary to hook readers..."
                            rows={3}
                            className="mt-1.5 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label htmlFor="author">Author</Label>
                            <Input
                                id="author"
                                name="author"
                                placeholder="John Doe"
                                className="mt-1.5"
                            />
                        </div>
                        <div>
                            <Label htmlFor="tags">Tags</Label>
                            <Input
                                id="tags"
                                name="tags"
                                placeholder="football, scholarship"
                                className="mt-1.5"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={featured}
                            onChange={(e) => setFeatured(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-[#0A84FF] focus:ring-[#0A84FF]"
                        />
                        <Label htmlFor="featured" className="text-sm font-medium cursor-pointer flex items-center gap-1">
                            <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
                            Featured Story
                        </Label>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="body">
                            Full Story <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="body"
                            name="body"
                            placeholder="Tell the full journey..."
                            rows={7}
                            required
                            className="mt-1.5 resize-none"
                        />
                    </div>

                    {/* IMAGE UPLOAD */}
                    <div>
                        <Label className="flex items-center gap-1">
                            <ImageIcon className="h-4 w-4" />
                            Featured Image <span className="text-red-500">*</span>
                        </Label>
                        <div className="mt-2">
                            {preview ? (
                                <div className="relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-60 object-cover transition-transform group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-sm drop-shadow">
                                        <Check className="h-4 w-4" />
                                        <span>{imageFile?.name}</span>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-md"
                                        onClick={() => {
                                            setImageFile(null);
                                            setPreview(null);
                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                        }}
                                    >
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
                                        isDragging
                                            ? 'border-[#0A84FF] bg-blue-50'
                                            : 'border-slate-300 hover:border-[#0A84FF] hover:bg-slate-50'
                                    }`}>
                                        <Upload className={`h-9 w-9 mb-1 transition-colors ${
                                            isDragging ? 'text-[#0A84FF]' : 'text-slate-500'
                                        }`} />
                                        <p className={`text-sm transition-colors ${
                                            isDragging ? 'text-[#0A84FF]' : 'text-slate-600'
                                        }`}>
                                            {isDragging ? 'Drop image here' : 'Drop or click to upload'}
                                        </p>
                                        <p className="text-xs text-slate-400">Max 10MB • JPG, PNG</p>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        required
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            file? handleFile(file) : null
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <Button type="button" variant="outline" onClick={closeModal} disabled={uploading}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={uploading}
                    className="min-w-32 bg-gradient-to-r from-[#0A84FF] to-[#0052CC] text-white font-medium shadow-lg hover:shadow-xl"
                >
                    {uploading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Publishing...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Publish Story
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}