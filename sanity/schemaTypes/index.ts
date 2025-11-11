// import { type SchemaTypeDefinition } from 'sanity'
//
// export const schema: { types: SchemaTypeDefinition[] } = {
//   types: [],
// }


// sanity/schemasTypes/index.ts
// sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity';
import { event } from './event';
import { news } from './news';
import { resource } from './resource';
import { story } from './story';

export const schema: SchemaTypeDefinition[] = [
    story,
    event,
    news,
    resource,
];