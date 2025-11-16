// sanity/schemaTypes/contactInfo.ts

import { defineType, defineField } from "sanity";

export const contactInfo = defineType({
    name: "contactInfo",
    title: "Contact Info",
    type: "document",
    fields: [
        defineField({
            name: "hotline",
            title: "Hotline",
            type: "string",
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
        }),
        defineField({
            name: "address",
            title: "Address",
            type: "string",
        }),
        defineField({
            name: "social",
            title: "Social Media Links",
            type: "object",
            fields: [
                { name: "whatsapp", title: "WhatsApp", type: "string" },
                { name: "twitter", title: "Twitter URL", type: "url" },
                { name: "instagram", title: "Instagram URL", type: "url" },
            ],
        }),
    ],
});
