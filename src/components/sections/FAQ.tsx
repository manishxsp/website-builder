'use client';

interface FAQ {
    id: string;
    question: string;
    answer: string;
    order: number;
}

interface FAQProps {
    id?: string;
    title?: string;
    faqs: FAQ[];
    brandColor?: string;
}

export default function FAQ({ id = 'faq', title = 'Frequently Asked Questions', faqs, brandColor = '#3b82f6' }: FAQProps) {
    if (!faqs || faqs.length === 0) return null;

    return (
        <section id={id} className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2
                    className="text-4xl font-bold text-center mb-12"
                    style={{ color: brandColor }}
                >
                    {title}
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <details
                            key={faq.id}
                            className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <summary
                                className="flex justify-between items-center cursor-pointer p-6 font-semibold text-lg text-gray-800 hover:text-gray-900 list-none"
                                style={{
                                    borderLeft: `4px solid ${brandColor}`,
                                }}
                            >
                                <span className="pr-8">{faq.question}</span>
                                <svg
                                    className="w-5 h-5 text-gray-500 transition-transform duration-300 group-open:rotate-180 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </summary>

                            <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed">
                                <p className="whitespace-pre-wrap">{faq.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>

                {/* Call to action */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">
                        Still have questions? We're here to help!
                    </p>
                    <a
                        href="#contact"
                        className="inline-block px-8 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                        style={{ backgroundColor: brandColor }}
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
}
