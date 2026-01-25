interface HeroProps {
  id?: string;
  title: string;
  subtitle?: string;
  image?: string;
  ctaText?: string;
  brandColor: string;
}

export default function Hero({ id, title, subtitle, image, ctaText, brandColor }: HeroProps) {
  return (
    <section
      id={id}
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Background Image with Parallax Effect */}
      {image && (
        <>
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />
        </>
      )}

      {/* Decorative Elements */}
      {!image && (
        <div className="absolute inset-0 overflow-hidden z-0">
          <div
            className="absolute top-20 -left-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ backgroundColor: brandColor }}
          />
          <div
            className="absolute bottom-20 -right-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ backgroundColor: brandColor }}
          />
        </div>
      )}

      {/* Content */}
      <div className={`relative z-20 max-w-5xl mx-auto ${image ? 'text-white' : 'text-gray-900'}`}>
        {/* Title */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight animate-slide-up opacity-0 leading-tight"
          style={{ color: image ? 'white' : brandColor }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className={`text-xl md:text-2xl lg:text-3xl mb-10 font-light leading-relaxed animate-slide-up opacity-0 animation-delay-200 max-w-3xl mx-auto ${image ? 'text-gray-100' : 'text-gray-600'
              }`}
          >
            {subtitle}
          </p>
        )}

        {/* CTA Button */}
        {ctaText && (
          <div className="animate-slide-up opacity-0 animation-delay-400">
            <button
              className="group px-10 py-5 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
              style={{ backgroundColor: brandColor }}
            >
              {/* Button Shine Effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">{ctaText}</span>
            </button>
          </div>
        )}

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce animation-delay-800">
          <svg
            className={`w-6 h-6 ${image ? 'text-white' : 'text-gray-400'}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div> */}
      </div>
    </section>
  );
}