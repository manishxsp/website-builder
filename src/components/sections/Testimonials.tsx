interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
}

interface TestimonialsProps {
  id?: string;
  title: string;
  testimonials: Testimonial[];
  brandColor: string;
}

export default function Testimonials({ id, title, testimonials, brandColor }: TestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <section id={id} className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 animate-fade-in"
          style={{ color: brandColor }}
        >
          {title}
        </h2>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Rating Stars */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span
                    key={i}
                    className="text-3xl transform transition-transform duration-300 hover:scale-125"
                    style={{ color: brandColor }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote Icon */}
              <div
                className="text-6xl opacity-10 mb-4"
                style={{ color: brandColor }}
              >
                "
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 italic leading-relaxed text-lg">
                {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: brandColor }}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-lg">{testimonial.name}</p>
                  {testimonial.role && (
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}