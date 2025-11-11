// sanity/schemasType/event.ts
export default {
    name: 'event',
    title: 'Sports Event',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title', type: 'string', validation: (R: any) => R.required() },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R: any) => R.required() },
        { name: 'sport', title: 'Sport', type: 'string' },
        { name: 'date', title: 'Date', type: 'datetime' },
        { name: 'time', title: 'Time', type: 'string' },
        { name: 'location', title: 'Location', type: 'string' },
        { name: 'ageGroup', title: 'Age Group', type: 'string' },
        { name: 'isFree', title: 'Free Entry?', type: 'boolean', initialValue: false },
        { name: 'spotsLeft', title: 'Spots Left', type: 'number' },
        { name: 'registrationLink', title: 'Registration Link', type: 'url' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    ],
    preview: {
        select: { title: 'title', subtitle: 'location', media: 'image' },
    },
};