// sanity/schemasType/adminAccount.ts
import { defineField, defineType } from "sanity";

export const adminAccount = defineType({
    name: "adminAccount",
    title: "Admin Account",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: "hashedPassword",
            title: "Hashed Password",
            type: "string",
            hidden: true,
        }),
        defineField({
            name: "role",
            title: "Role",
            type: "string",
            initialValue: "admin",
        }),
        defineField({
            name: "invitedAt",
            type: "datetime",
            title: "Invited At",
        }),
    ],
});
