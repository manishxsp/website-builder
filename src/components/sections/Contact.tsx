'use client';

interface ContactProps {
  id?: string;
  title: string;
  email?: string;
  phone?: string;
  address?: string;
  brandColor: string;
}

export default function Contact({ id, title, email, phone, address, brandColor }: ContactProps) {
  return (
    <section id={id} className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 animate-fade-in"
          style={{ color: brandColor }}
        >
          {title}
        </h2>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 animate-slide-up">
            {email && (
              <div className="group">
                <h3
                  className="font-bold text-2xl mb-3 flex items-center gap-3"
                  style={{ color: brandColor }}
                >
                  <span className="text-3xl">✉️</span>
                  Email
                </h3>
                <a
                  href={`mailto:${email}`}
                  className="text-gray-700 hover:underline text-lg transition-colors"
                  style={{ '--hover-color': brandColor } as any}
                >
                  {email}
                </a>
              </div>
            )}

            {phone && (
              <div className="group">
                <h3
                  className="font-bold text-2xl mb-3 flex items-center gap-3"
                  style={{ color: brandColor }}
                >
                  <span className="text-3xl">📞</span>
                  Phone
                </h3>
                <a
                  href={`tel:${phone}`}
                  className="text-gray-700 hover:underline text-lg"
                >
                  {phone}
                </a>
              </div>
            )}

            {address && (
              <div className="group">
                <h3
                  className="font-bold text-2xl mb-3 flex items-center gap-3"
                  style={{ color: brandColor }}
                >
                  <span className="text-3xl">📍</span>
                  Address
                </h3>
                <p className="text-gray-700 text-lg">{address}</p>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <form className="space-y-5 animate-slide-up animation-delay-200">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-opacity-50 transition-all"
              style={{
                '--focus-border-color': brandColor,
                borderColor: 'rgb(229, 231, 235)'
              } as any}
              onFocus={(e) => e.currentTarget.style.borderColor = brandColor}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgb(229, 231, 235)'}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none transition-all"
              onFocus={(e) => e.currentTarget.style.borderColor = brandColor}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgb(229, 231, 235)'}
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none transition-all resize-none"
              onFocus={(e) => e.currentTarget.style.borderColor = brandColor}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgb(229, 231, 235)'}
            />
            <button
              type="submit"
              className="w-full py-4 text-white font-bold text-lg rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: brandColor }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}