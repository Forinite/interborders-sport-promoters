// app/(components)/counselling/[slug]/page.tsx
import type { JSX } from "react";

import { client } from "@/sanity/lib/client";

export default async function ResourceDetailPage({params,}: { params: { slug: string }; }) {
    // This matches the logic of your working snippet
    const slug = (await params).slug;

    // Fetch the resource by slug (articles only)
    const resource = await client.fetch(
        `*[_type == "resource" && _id == $slug][0]{
            _id,
            title,
            summary,
            format,
            "fileUrl": file.asset->url,
            videoUrl,
            image {
                asset->{
                    _id,
                    url
                },
                alt
            },
            tags,
            publishedAt,
            body
        }`,
        { slug }
    );

    const resource2 = await client.fetch(
        `*[_type == "resource" && _id == $slug][0]{
            _id,
            title,
            summary,
            format,
            "fileUrl": file.asset->url,
            videoUrl,
            image {
                asset->{
                    _id,
                    url
                },
                alt
            },
            tags,
            publishedAt,
            body
        }`,
        { slug }
    );

    console.log(resource2);

    if (!resource) {
        return (
            <article className="container mx-auto px-4 py-12 max-w-5xl">
                <h1 className="text-3xl font-bold">Resource not found</h1>
                <p className="text-white/60 mt-4">
                    The requested article could not be found.
                </p>
            </article>
        );
    }

    // Only display articles (exclude videos or PDFs)
    if (resource.format !== "article") {
        return (
            <article className="container mx-auto px-4 py-12 max-w-5xl">
                <h1 className="text-3xl font-bold">Unsupported Resource Type</h1>
                <p className="text-white/60 mt-4">
                    This page only displays articles.
                </p>
            </article>
        );
    }

    return (
        <article className="container mx-auto px-4 py-12 max-w-5xl space-y-8">
            <h1 className="text-4xl font-extrabold">{resource.title}</h1>

            <p className="text-white/60 text-sm">
                {new Date(resource.publishedAt).toLocaleDateString()}
            </p>

            {/* Simple body display (you didn’t ask for PortableText yet) */}
            {resource.body ? (
                <div className="prose prose-invert max-w-none space-y-4">
                    {resource.body.content.map((block: any, i: number) => {
                        if (block.type === "paragraph") {
                            return (
                                <p key={i}>
                                    {block.content?.map((child: any, idx: number) => {
                                        if (child.type === "text") {
                                            let text = child.text;

                                            // Apply bold/italic marks
                                            if (child.marks?.includes("strong")) {
                                                text = <strong key={idx}>{text}</strong>;
                                            }
                                            if (child.marks?.includes("em")) {
                                                text = <em key={idx}>{text}</em>;
                                            }

                                            return <span key={idx}>{text}</span>;
                                        }
                                        return null;
                                    })}
                                </p>
                            );
                        }

                        if (block.type === "heading") {
                            const level = block.attrs?.level || 2;
                            const Tag = `h${level}` as keyof JSX.IntrinsicElements;

                            return (
                                <Tag key={i} className="font-bold mt-6">
                                    {block.content?.[0]?.text}
                                </Tag>
                            );
                        }

                        return null;
                    })}
                </div>
            ) : (
                <p className="text-white/80">{resource.summary}</p>
            )}

        </article>
    );
}
