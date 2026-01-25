'use client';

interface Tag {
    id: string;
    name: string;
    link?: string | null;
    order: number;
}

interface TagsProps {
    id?: string;
    title?: string;
    tags: Tag[];
    brandColor: string;
}

export default function Tags({ id, title = "Tags", tags, brandColor }: TagsProps) {
    if (tags.length === 0) return null;

    return (
        <section id={id} className="py-12 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h3
                    className="text-2xl font-bold mb-6"
                    style={{ color: brandColor }}
                >
                    {title}
                </h3>

                <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                        tag.link ? (
                            <a
                                key={tag.id}
                                href={tag.link}
                                className="tag-link px-4 py-2 rounded-full border-2 font-medium transition-all hover:scale-105 hover:shadow-md"
                                style={{
                                    borderColor: brandColor,
                                    color: brandColor,
                                    '--hover-bg': brandColor,
                                } as any}
                            >
                                {tag.name}
                            </a>
                        ) : (
                            <span
                                key={tag.id}
                                className="px-4 py-2 rounded-full border-2 font-medium"
                                style={{
                                    borderColor: brandColor,
                                    color: brandColor,
                                }}
                            >
                                {tag.name}
                            </span>
                        )
                    ))}
                </div>
            </div>

            <style jsx>{`
        .tag-link:hover {
          background-color: var(--hover-bg);
          color: white;
        }
      `}</style>
        </section>
    );
}
