import {createClient} from "next-sanity";
import {apiVersion, dataset, projectId} from "@/sanity/env";

export const writeClient = createClient({
    projectId: projectId,
    dataset: dataset,
    apiVersion: apiVersion,
    token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN!,
    useCdn: false,
});
