
// sanity/config.ts
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
    projectId: 'your-project-id', // ← Replace with yours
    dataset: 'production',
    title: 'YouthSportNG Admin',
    apiVersion: '2024-01-01',
    basePath: '/admin',

    plugins: [
        deskTool(),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
});