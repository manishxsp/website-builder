interface BusinessHour {
    id: string;
    day: string;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
    order: number;
}

interface BusinessHoursProps {
    id?: string;
    hours: BusinessHour[];
    brandColor: string;
}

export default function BusinessHours({ id, hours, brandColor }: BusinessHoursProps) {
    if (hours.length === 0) return null;

    return (
        <section id={id} className="py-12 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
                    {/* Title */}
                    <div className="flex items-center gap-3 mb-6">
                        <svg
                            className="w-8 h-8"
                            style={{ color: brandColor }}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3
                            className="text-2xl font-bold"
                            style={{ color: brandColor }}
                        >
                            Business Hours
                        </h3>
                    </div>

                    {/* Hours List */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {hours.map((hour) => (
                            <div
                                key={hour.id}
                                className="flex justify-between items-center py-3 px-4 bg-white rounded-lg"
                            >
                                <span className="font-medium text-gray-900">{hour.day}</span>
                                <span className="text-gray-600">
                                    {hour.isClosed ? (
                                        <span className="text-red-600 font-medium">Closed</span>
                                    ) : (
                                        `${hour.openTime} - ${hour.closeTime}`
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
