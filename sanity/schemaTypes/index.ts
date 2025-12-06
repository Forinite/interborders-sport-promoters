// import { type SchemaTypeDefinition } from 'sanity'
//
// export const schema: { types: SchemaTypeDefinition[] } = {
//   types: [],
// }


// sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity';
import { event } from './event';
import { news } from './news';
import { resource } from './resource';
import { story } from './story';
import { contactInfo } from './contactInfo';
import { about } from './about';
import { adminAccount } from './adminAccount';

export const schemaTypes: SchemaTypeDefinition[] = [
    story,
    event,
    news,
    resource,
    contactInfo,
    about,
    adminAccount
];