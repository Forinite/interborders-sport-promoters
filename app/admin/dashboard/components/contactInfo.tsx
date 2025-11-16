// app/admin/dashboard/components/contactInfo.tsx

import { client } from "@/sanity/lib/client";
import EditableContactInfo from "./EditableContactInfo";

export default async function ContactInfo() {
    const data = await client.fetch('*[_type == "contactInfo"][0]');

    if (!data) return <p>No contact info found</p>;

    return <EditableContactInfo contact={data} />;
}
