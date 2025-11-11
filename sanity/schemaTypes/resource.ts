// sanity/schemas/resource.ts
export default {
    name: 'resource',
    title: 'Counselling Resource',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title', type: 'string', validation: (R: any) => R.required() },
        { name: 'format', title: 'Format', type: 'string', options: { list: ['pdf', 'video', 'article'] } },
        { name: 'summary', title: 'Summary', type: 'text' },
        { name: 'fileUrl', title: 'File URL (PDF)', type: 'url', hidden: ({ parent }: any) => parent?.format !== 'pdf' },
        { name: 'videoUrl', title: 'Video URL', type: 'url', hidden: ({ parent }: any) => parent?.format !== 'video' },
        { name: 'body', title: 'Article Body', type: 'array', of: [{ type: 'block' }], hidden: ({ parent }: any) => parent?.format !== 'article' },
        { name: 'image', title: 'Thumbnail', type: 'image', options: { hotspot: true } },
    ],
    preview: {
        select: { title: 'title', media: 'image', subtitle: 'format' },
    },
};