interface Product {
    id: string;
    name: string;
    description?: string;
    image?: string;
    price?: string;
    ctaText: string;
    ctaLink?: string;
    features: string[];
    order: number;
}

interface FeaturedProductsProps {
    id?: string;
    title: string;
    products: Product[];
    brandColor: string;
}

export default function FeaturedProducts({ id, title, products, brandColor }: FeaturedProductsProps) {
    if (products.length === 0) return null;

    return (
        <section id={id} className="py-24 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 animate-fade-in"
                    style={{ color: brandColor }}
                >
                    {title}
                </h2>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Product Image */}
                            {product.image && (
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {product.price && (
                                        <div
                                            className="absolute top-4 right-4 px-4 py-2 rounded-full text-white font-bold shadow-lg"
                                            style={{ backgroundColor: brandColor }}
                                        >
                                            {product.price}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Product Info */}
                            <div className="p-6">
                                <h3
                                    className="text-2xl font-bold mb-3"
                                    style={{ color: brandColor }}
                                >
                                    {product.name}
                                </h3>

                                {product.description && (
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {product.description}
                                    </p>
                                )}

                                {/* Features List */}
                                {product.features.length > 0 && (
                                    <ul className="mb-6 space-y-2">
                                        {product.features.slice(0, 4).map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: brandColor }} fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* CTA Button */}
                                <a
                                    href={product.ctaLink || '#'}
                                    className="block w-full text-center py-3 rounded-lg text-white font-bold transition-all hover:shadow-lg hover:scale-105"
                                    style={{ backgroundColor: brandColor }}
                                >
                                    {product.ctaText}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
