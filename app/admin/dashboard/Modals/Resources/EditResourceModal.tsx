// app/admin/dashboard/Modals/Resources/EditResourceModal.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CustomSelect, CustomSelectContent, CustomSelectItem, CustomSelectTrigger, CustomSelectValue } from '@/components/ui/custom-select';
import { useToast } from '@/components/ui/use-toast';
import { useModal } from '../ModalContext';
import { Loader2, Upload, X, Check, Image as ImageIcon, Sparkles, Edit3, FileText, Video, Newspaper } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';

interface Resource {
    _id: string;
    title: string;
    slug: { current: string };
    summary?: string;
    format: 'pdf' | 'video' | 'article';
    file?: { asset?: { _id: string; url: string } };
    videoUrl?: string;
    body?: any[];
    image?: { asset?: { _id: string; url: string } };
    tags?: string[];
    publishedAt?: string;
}

interface Props { resource: Resource; }

export default function EditResourceModal({ resource }: Props) {
    const { closeModal } = useModal();
    const { toast } = useToast();
    const [uploading, setUploading] = useState(false);
    const [format, setFormat] = useState<'pdf' | 'video' | 'article'>(resource.format);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [body, setBody] = useState<any>(null);
    const [originalImageRef, setOriginalImageRef] = useState<string | null>(null);
    const [originalPdfRef, setOriginalPdfRef] = useState<string | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const pdfInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (resource.image?.asset?.url) {
            setPreview(resource.image.asset.url);
            setOriginalImageRef(resource.image.asset._id);
        }
        if (resource.file?.asset?._id) {
            setOriginalPdfRef(resource.file.asset._id);
        }
        if (resource.body && resource.format === 'article') {
            setBody(resource.body);
        }
    }, [resource]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        data.append('id', resource._id);
        data.append('format', format);
        if (imageFile) data.append('image', imageFile);
        if (format === 'pdf' && pdfFile) data.append('file', pdfFile);
        if (format === 'article' && body) data.append('body', JSON.stringify(body));
        if (originalImageRef && imageFile) data.append('oldImageRef', originalImageRef);
        if (originalPdfRef && pdfFile) data.append('oldPdfRef', originalPdfRef);

        try {
            setUploading(true);
            const res = await fetch('/api/resource/edit', { method: 'PUT', body: data });
            if (!res.ok) throw new Error(await res.text());
            toast({ title: 'Updated!', description: 'Resource saved.' });
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
                        <h2 className="text-xl font-bold text-slate-900 leading-tight">Edit Resource</h2>
                        <p className="text-xs text-slate-500">Update content</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={closeModal} disabled={uploading}>
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-4">
                    <div><Label htmlFor="title">Title *</Label><Input id="title" name="title" defaultValue={resource.title} required className="mt-1.5" /></div>
                    <div><Label htmlFor="summary">Summary</Label><Textarea id="summary" name="summary" defaultValue={resource.summary} rows={3} className="mt-1.5 resize-none" /></div>
                    <div><Label htmlFor="tags">Tags</Label><Input id="tags" name="tags" defaultValue={resource.tags?.join(', ')} className="mt-1.5" /></div>
                    <div><Label htmlFor="publishedAt">Published At</Label><Input id="publishedAt" name="publishedAt" type="datetime-local" defaultValue={resource.publishedAt?.slice(0,16)} className="mt-1.5" /></div>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="format">Format *</Label>
                        <CustomSelect value={format} onValueChange={(v) => setFormat(v as any)}>
                            <CustomSelectTrigger className="mt-1.5"><CustomSelectValue /></CustomSelectTrigger>
                            <CustomSelectContent>
                                <CustomSelectItem value="pdf"><FileText className="inline h-4 w-4 mr-2" />PDF</CustomSelectItem>
                                <CustomSelectItem value="video"><Video className="inline h-4 w-4 mr-2" />Video</CustomSelectItem>
                                <CustomSelectItem value="article"><Newspaper className="inline h-4 w-4 mr-2" />Article</CustomSelectItem>
                            </CustomSelectContent>
                        </CustomSelect>
                    </div>

                    {format === 'pdf' && (
                        <div>
                            <Label>PDF File</Label>
                            {resource.file?.asset?.url && !pdfFile ? (
                                <div className="relative group rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm">
                                    <div className="flex items-center gap-2 text-sm">
                                        <FileText className="h-5 w-5 text-red-600" />
                                        <a href={resource.file.asset.url} target="_blank" rel="noopener" className="text-[#0A84FF] hover:underline">
                                            Current PDF
                                        </a>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setPdfFile(null)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : pdfFile ? (
                                <div className="relative group rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm">
                                    <div className="flex items-center gap-2 text-sm">
                                        <FileText className="h-5 w-5 text-red-600" />
                                        <span>{pdfFile.name}</span>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => { setPdfFile(null); if (pdfInputRef.current) pdfInputRef.current.value = ''; }}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <label className="block">
                                    <div className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-[#0A84FF] hover:bg-slate-50 transition-all">
                                        <Upload className="h-9 w-9 text-slate-500 mb-1" />
                                        <p className="text-sm text-slate-600">Replace PDF</p>
                                        <p className="text-xs text-slate-400">Max 50MB</p>
                                    </div>
                                    <input ref={pdfInputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file && file.size <= 50 * 1024 * 1024) setPdfFile(file);
                                        else if (file) toast({ title: 'Too large', description: 'Max 50MB', variant: 'destructive' });
                                    }} />
                                </label>
                            )}
                        </div>
                    )}

                    {format === 'video' && (
                        <div><Label htmlFor="videoUrl">Video URL</Label><Input id="videoUrl" name="videoUrl" type="url" defaultValue={resource.videoUrl} placeholder="https://youtube.com/..." className="mt-1.5" /></div>
                    )}

                    {format === 'article' && (
                        <div><Label>Article Body</Label><RichTextEditor value={body} onChange={setBody} /></div>
                    )}

                    <div>
                        <Label className="flex items-center gap-1"><ImageIcon className="h-4 w-4" /> Thumbnail</Label>
                        <div className="mt-2">
                            {preview ? (
                                <div className="relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
                                    <img src={preview} alt="Preview" className="w-full h-60 object-cover group-hover:scale-105 transition-transform" />
                                    <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-sm drop-shadow">
                                        <Check className="h-4 w-4" />
                                        <span>{imageFile?.name || 'Current'}</span>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-md" onClick={() => { setImageFile(null); setPreview(null); if (imageInputRef.current) imageInputRef.current.value = ''; }}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <label className="block">
                                    <div className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-[#0A84FF] hover:bg-slate-50 transition-all">
                                        <Upload className="h-9 w-9 text-slate-500 mb-1" />
                                        <p className="text-sm text-slate-600">Change image</p>
                                        <p className="text-xs text-slate-400">Max 10MB</p>
                                    </div>
                                    <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file && file.size <= 10 * 1024 * 1024) { setImageFile(file); setPreview(URL.createObjectURL(file)); }
                                        else if (file) toast({ title: 'Too large', description: 'Max 10MB', variant: 'destructive' });
                                    }} />
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