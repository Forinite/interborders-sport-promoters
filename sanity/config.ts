
// sanity/config.ts
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import {apiVersion, dataset, projectId} from "@/sanity/env";

export default defineConfig({
    projectId: projectId, // ← Replace with yours
    dataset: dataset,
    title: 'YouthSportNG Admin',
    apiVersion: apiVersion,
    basePath: '/admin',

    plugins: [
        deskTool(),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
});