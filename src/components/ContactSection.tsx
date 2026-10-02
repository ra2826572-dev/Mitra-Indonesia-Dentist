import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { createContactMessage } from '../services/storage';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Navigation,
} from 'lucide-react';

interface ContactSectionProps {
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].contact;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const googleMapsDirectionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Gg.+Murni+No.24+Pondok+Pinang+Kebayoran+Lama+South+Jakarta+12310';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Mohon lengkapi nama, nomor telepon/WhatsApp, dan pesan Anda.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      createContactMessage({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        subject: subject.trim() || 'Pertanyaan Layanan Mitra Indonesia Dentist',
        message: message.trim(),
      });

      setIsSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setErrorMsg('Terjadi kesalahan saat mengirim pesan. Silakan hubungi kami via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 text-left">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {t.sectionTitle}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3 [text-wrap:balance]">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Business Details & Google Map */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Address */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-100/80 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {t.addressTitle}
                  </h3>
                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {t.addressVal}
                  </p>
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 mt-2"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{t.getDirections}</span>
                  </a>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-100/80 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {t.phoneTitle}
                  </h3>
                  <p className="text-sm font-semibold text-slate-900">
                    <a href="tel:+6282138823000" className="hover:text-teal-700">
                      {t.phoneVal}
                    </a>
                  </p>
                  <a
                    href="https://wa.me/6282138823000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 mt-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{t.openChatWhatsapp}</span>
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-100/80 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {t.hoursTitle}
                  </h3>
                  <p className="text-sm font-semibold text-slate-900">
                    {t.hoursVal}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{t.openEveryDay}</p>
                </div>
              </div>
            </div>

            {/* Google Map Interactive Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 h-64 bg-slate-100 shadow-xs relative">
              <iframe
                title="Mitra Indonesia Dentist Location Map"
                src="https://maps.google.com/maps?q=Gg.+Murni+No.24,+RT.4/RW.7,+Pondok+Pinang,+Kebayoran+Lama,+South+Jakarta+12310&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-6 bg-slate-50/80 border border-slate-200 rounded-2xl p-6 sm:p-8 text-left shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-1">{t.formTitle}</h3>
            <p className="text-xs text-slate-600 mb-6">{t.formSubtitle}</p>

            {isSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{t.formSuccess}</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="underline text-emerald-700 hover:text-emerald-900 mt-1 text-xs"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Nama Anda <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Rian Pratama"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    No. WhatsApp / HP <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Subjek Pertanyaan
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Contoh: Pertanyaan prosedur scaling / gigi bungsu"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Isi Pesan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan keluhan atau pertanyaan Anda di sini..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-xl text-white font-semibold text-sm bg-teal-700 hover:bg-teal-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                {isSubmitting ? (
                  <span>{t.sendingBtn}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.sendBtn}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
