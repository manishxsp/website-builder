'use client';

import { useState } from 'react';

interface ContactProps {
  id?: string;
  title: string;
  email?: string;
  phone?: string;
  address?: string;
  brandColor: string;
  siteId: string;
}

export default function Contact({ id, title, email, phone, address, brandColor, siteId }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, siteId }),
      });

      if (!res.ok) throw new Error('Failed to submit');

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up animation-delay-200">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-opacity-50 transition-all"
              style={{
                '--focus-border-color': brandColor,
                borderColor: 'rgb(229, 231, 235)'
              } as any}
              onFocus={(e) => e.currentTarget.style.borderColor = brandColor}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgb(229, 231, 235)'}
            />
            <input
              type="tel"
              placeholder="Your Phone Number"
              value={(formData as any).phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value } as any)}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none transition-all"
              onFocus={(e) => e.currentTarget.style.borderColor = brandColor}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgb(229, 231, 235)'}
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none transition-all"
              onFocus={(e) => e.currentTarget.style.borderColor = brandColor}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgb(229, 231, 235)'}
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none transition-all resize-none"
              onFocus={(e) => e.currentTarget.style.borderColor = brandColor}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgb(229, 231, 235)'}
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full py-4 text-white font-bold text-lg rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundColor: status === 'success' ? '#10B981' : brandColor }}
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Error! Try Again' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}