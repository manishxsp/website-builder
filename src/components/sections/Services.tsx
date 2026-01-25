interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
}

interface ServicesProps {
  id?: string;
  title: string;
  services: Service[];
  brandColor: string;
}

export default function Services({ id, title, services, brandColor }: ServicesProps) {
  if (services.length === 0) return null;

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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              {service.icon && (
                <div
                  className="text-6xl mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                >
                  {service.icon}
                </div>
              )}

              {/* Title */}
              <h3
                className="text-2xl font-bold mb-4 transition-colors duration-300"
                style={{ color: brandColor }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>

              {/* Hover Border */}
              <div
                className="h-1 w-0 group-hover:w-full transition-all duration-500 mt-6 rounded-full"
                style={{ backgroundColor: brandColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}