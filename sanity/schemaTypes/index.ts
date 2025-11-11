// import { type SchemaTypeDefinition } from 'sanity'
//
// export const schema: { types: SchemaTypeDefinition[] } = {
//   types: [],
// }


// sanity/schemasTypes/index.ts
import story from './story';
import event from './event';
import news from './news';
import resource from './resource';

export const schemaTypes = [story, event, news, resource];