// app/admin/dashboard/Modals/News/EditNewsModal.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useModal } from '../ModalContext';
import { Loader2, Upload, X, Check, Image as ImageIcon, Sparkles, Edit3 } from 'lucide-react';

interface News {
    _id: string;
    title: string;
    excerpt?: string;
    publishedAt?: string;
    author?: string;
    tags?: string[];
    body: any[];
    image?: { asset?: { _id: string; url: string } };
}

interface Props { news: News; }

export default function EditNewsModal({ news }: Props) {
    const { closeModal } = useModal();
    const { toast } = useToast();
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [originalImageRef, setOriginalImageRef] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getPlainText = (blocks: any[]) => blocks?.map(b => b.children?.map((c: any) => c.text).join('')).join('\n') || '';

    useEffect(() => {
        if (news.image?.asset?.url) {
            setPreview(news.image.asset.url);
            setOriginalImageRef(news.image.asset._id);
        }
    }, [news.image]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        data.append('id', news._id);
        if (imageFile) data.append('image', imageFile);
        if (originalImageRef && imageFile) data.append('oldImageRef', originalImageRef);

        try {
            setUploading(true);
            const res = await fetch('/api/news/edit', { method: 'PUT', body: data });
            if (!res.ok) throw new Error(await res.text());
            toast({ title: 'Updated!', description: 'News saved.' });
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
                        <h2 className="text-xl font-bold text-slate-900 leading-tight">Edit News</h2>
                        <p className="text-xs text-slate-500">Refine and update</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={closeModal} disabled={uploading}>
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-4">
                    <div><Label htmlFor="title">Title *</Label><Input id="title" name="title" defaultValue={news.title} required className="mt-1.5" /></div>
                    <div><Label htmlFor="excerpt">Excerpt</Label><Textarea id="excerpt" name="excerpt" defaultValue={news.excerpt} rows={3} className="mt-1. 1.5 resize-none" /></div>
                    <div className="grid grid-cols-2 gap-3">
                        <div><Label htmlFor="author">Author</Label><Input id="author" name="author" defaultValue={news.author} className="mt-1.5" /></div>
                        <div><Label htmlFor="tags">Tags</Label><Input id="tags" name="tags" defaultValue={news.tags?.join(', ')} className="mt-1.5" /></div>
                    </div>
                    <div><Label htmlFor="publishedAt">Published At</Label><Input id="publishedAt" name="publishedAt" type="datetime-local" defaultValue={news.publishedAt?.slice(0,16)} className="mt-1.5" /></div>
                </div>

                <div className="space-y-4">
                    <div><Label htmlFor="body">Full Article *</Label><Textarea id="body" name="body" defaultValue={getPlainText(news.body)} rows={7} required className="mt-1.5 resize-none" /></div>
                    <div>
                        <Label className="flex items-center gap-1"><ImageIcon className="h-4 w-4" /> Featured Image</Label>
                        <div className="mt-2">
                            {preview ? (
                                <div className="relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
                                    <img src={preview} alt="Preview" className="w-full h-60 object-cover group-hover:scale-105 transition-transform" />
                                    <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-sm drop-shadow">
                                        <Check className="h-4 w-4" />
                                        <span>{imageFile?.name || 'Current'}</span>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-md"
                                            onClick={() => { setImageFile(null); setPreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <label className="block">
                                    <div className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-[#0A84FF] hover:bg-slate-50 transition-all">
                                        <Upload className="h-9 w-9 text-slate-500 mb-1" />
                                        <p className="text-sm text-slate-600">Click to change</p>
                                        <p className="text-xs text-slate-400">Max 10MB</p>
                                    </div>
                                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                                           onChange={(e) => {
                                               const file = e.target.files?.[0];
                                               if (file && file.size <= 10 * 1024 * 1024) {
                                                   setImageFile(file);
                                                   setPreview(URL.createObjectURL(file));
                                               } else if (file) {
                                                   toast({ title: 'Too large', description: 'Max 10MB', variant: 'destructive' });
                                               }
                                           }}
                                    />
                                </label>
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