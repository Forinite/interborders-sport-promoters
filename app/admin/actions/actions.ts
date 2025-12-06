//app/admin/actions/actions.ts

import {writeClient} from "@/sanity/lib/writeClient";


export const writeItemsToSanity = async (docId:string, items:string[]) => {
    try {
        await writeClient.patch(docId).set({ [docId]: items }).commit();
    } catch (err) {
        console.error('Save failed:', err);
    }
};

export const writeStringToSanity = async (docId:string, field:string, value:string) => {
    await writeClient.patch(docId).set({ [field]: value }).commit();

};