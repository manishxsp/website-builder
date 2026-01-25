interface GalleryProps {
  id?: string;
  title: string;
  images: string[];
  brandColor: string;
}

export default function Gallery({ id, title, images, brandColor }: GalleryProps) {
  if (images.length === 0) return null;

  return (
    <section id={id} className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 animate-fade-in"
          style={{ color: brandColor }}
        >
          {title}
        </h2>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={image}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay on Hover */}
              {/* <div
                className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center"
                style={{ backgroundColor: brandColor }}
              >
                <svg
                  className="w-12 h-12 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
                </svg>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}