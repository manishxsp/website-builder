interface Location {
    id: string;
    name: string;
    city?: string;
    state?: string;
    address?: string;
    mapLink?: string;
    order: number;
}

interface LocationsProps {
    id?: string;
    title?: string;
    locations: Location[];
    brandColor: string;
}

export default function Locations({ id, title = "Our Locations", locations, brandColor }: LocationsProps) {
    if (locations.length === 0) return null;

    return (
        <section id={id} className="py-12 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <h3
                    className="text-2xl font-bold mb-6"
                    style={{ color: brandColor }}
                >
                    {title}
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locations.map((location) => (
                        <div
                            key={location.id}
                            className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
                        >
                            <h4 className="font-bold text-lg mb-2" style={{ color: brandColor }}>
                                {location.name}
                            </h4>

                            {location.address && (
                                <p className="text-gray-600 text-sm mb-3">{location.address}</p>
                            )}

                            {(location.city || location.state) && (
                                <p className="text-gray-500 text-sm mb-3">
                                    {[location.city, location.state].filter(Boolean).join(', ')}
                                </p>
                            )}

                            {location.mapLink && (
                                <a
                                    href={location.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                                    style={{ color: brandColor }}
                                >
                                    <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    Get Directions
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
