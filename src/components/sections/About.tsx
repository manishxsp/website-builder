interface AboutProps {
  id?: string;
  title: string;
  content?: string;
  image?: string;
  brandColor: string;
}

export default function About({ id, title, content, image, brandColor }: AboutProps) {
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

        {/* Content Grid */}
        <div className={`grid ${image ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-12 items-center`}>
          {/* Image */}
          {image && (
            <div className="relative group animate-scale-in">
              <div
                className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl"
                style={{ backgroundColor: brandColor }}
              />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-105">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Text Content */}
          <div className={`${!image ? 'text-center max-w-4xl mx-auto' : ''} animate-slide-up animation-delay-200`}>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
              {content || 'We are dedicated to providing exceptional service to our clients.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}