import React, { useState, useEffect } from 'react';
import { Appointment, DentalService, Language } from '../types';
import { translations } from '../i18n/translations';
import { createAppointment } from '../services/storage';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  CheckCircle2,
  MessageCircle,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

interface AppointmentSectionProps {
  services: DentalService[];
  currentLang: Language;
  preselectedTreatment?: string;
  onAppointmentCreated?: (appointment: Appointment) => void;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  services,
  currentLang,
  preselectedTreatment,
  onAppointmentCreated,
}) => {
  const t = translations[currentLang].appointment;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [treatment, setTreatment] = useState(preselectedTreatment || '');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  // Sync when preselectedTreatment changes
  useEffect(() => {
    if (preselectedTreatment) {
      setTreatment(preselectedTreatment);
    }
  }, [preselectedTreatment]);

  // Today in YYYY-MM-DD for min date
  const today = new Date().toISOString().split('T')[0];

  // Available time slots within clinic hours: 9 AM - 9 PM
  const timeSlots = [
    '09:00',
    '09:45',
    '10:30',
    '11:15',
    '12:00',
    '13:30',
    '14:15',
    '15:00',
    '15:45',
    '16:30',
    '17:15',
    '18:00',
    '18:45',
    '19:30',
    '20:15',
  ];

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = t.validationErrors.nameRequired;
    }
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      errs.phone = t.validationErrors.phoneRequired;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = t.validationErrors.emailInvalid;
    }
    if (!treatment) {
      errs.treatment = t.validationErrors.treatmentRequired;
    }
    if (!preferredDate) {
      errs.preferredDate = t.validationErrors.dateRequired;
    }
    if (!preferredTime) {
      errs.preferredTime = t.validationErrors.timeRequired;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const newAppt = createAppointment({
        patientName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        treatment,
        preferredDate,
        preferredTime,
        message: message.trim(),
      });

      setCreatedAppointment(newAppt);
      if (onAppointmentCreated) {
        onAppointmentCreated(newAppt);
      }
    } catch (err) {
      console.error('Failed to create appointment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setPreferredDate('');
    setPreferredTime('');
    setMessage('');
    setCreatedAppointment(null);
    setErrors({});
  };

  const getWhatsAppMessageUrl = (appt: Appointment) => {
    const text = encodeURIComponent(
      `Halo Mitra Indonesia Dentist, saya ingin konfirmasi janji temu:\n\n` +
        `• No. Booking: ${appt.id}\n` +
        `• Nama Pasien: ${appt.patientName}\n` +
        `• Layanan: ${appt.treatment}\n` +
        `• Tanggal: ${appt.preferredDate}\n` +
        `• Jam: ${appt.preferredTime} WIB\n\n` +
        `Mohon konfirmasi ketersediaan jadwalnya. Terima kasih!`
    );
    return `https://wa.me/6282138823000?text=${text}`;
  };

  return (
    <section id="appointment" className="py-20 bg-slate-50/80 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Pending Notice Warning Box */}
        <div className="mb-8 p-4 rounded-xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3 text-left">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <span className="font-bold">Status Verifikasi: </span>
            {t.pendingNote}
          </div>
        </div>

        {/* Form Container or Success Confirmation */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-10 text-left">
          {createdAppointment ? (
            /* Success State */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {t.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">{t.successDesc}</p>
                </div>
              </div>

              {/* Booking Summary Box */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Nomor Reservasi</span>
                  <span className="font-mono font-bold text-teal-800">
                    {createdAppointment.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Nama Pasien:</span>
                  <span className="font-semibold text-slate-900">
                    {createdAppointment.patientName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Layanan:</span>
                  <span className="font-semibold text-slate-900">
                    {createdAppointment.treatment}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Jadwal:</span>
                  <span className="font-semibold text-slate-900">
                    {createdAppointment.preferredDate} ({createdAppointment.preferredTime} WIB)
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Status Saat Ini:</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 uppercase tracking-wider">
                    {createdAppointment.status}
                  </span>
                </div>
              </div>

              {/* Action Notes */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.successActionNote}
              </p>

              {/* WhatsApp Fast Confirmation Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={getWhatsAppMessageUrl(createdAppointment)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl text-white font-semibold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.chatWhatsappBtn}</span>
                </a>

                <button
                  onClick={handleReset}
                  className="py-3 px-5 rounded-xl text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 text-xs sm:text-sm font-medium transition-colors"
                >
                  {t.bookAnotherBtn}
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.fullName} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      placeholder={t.fullNamePlaceholder}
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 transition-colors ${
                        errors.fullName
                          ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400'
                          : 'border-slate-300 focus:border-teal-600 focus:ring-teal-500/20'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.phone} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder={t.phonePlaceholder}
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 transition-colors ${
                        errors.phone
                          ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400'
                          : 'border-slate-300 focus:border-teal-600 focus:ring-teal-500/20'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.email} <span className="text-slate-400 font-normal">(Opsional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder={t.emailPlaceholder}
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 transition-colors ${
                        errors.email
                          ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400'
                          : 'border-slate-300 focus:border-teal-600 focus:ring-teal-500/20'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Treatment Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.treatment} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={treatment}
                    onChange={(e) => {
                      setTreatment(e.target.value);
                      if (errors.treatment) setErrors({ ...errors, treatment: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-hidden focus:ring-2 transition-colors ${
                      errors.treatment
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400'
                        : 'border-slate-300 focus:border-teal-600 focus:ring-teal-500/20'
                    }`}
                  >
                    <option value="">{t.selectTreatment}</option>
                    {services.map((s) => (
                      <option
                        key={s.id}
                        value={currentLang === 'id' ? s.nameId : s.nameEn}
                      >
                        {currentLang === 'id' ? s.nameId : s.nameEn}
                      </option>
                    ))}
                  </select>
                  {errors.treatment && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.treatment}</span>
                    </p>
                  )}
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.preferredDate} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="date"
                      min={today}
                      value={preferredDate}
                      onChange={(e) => {
                        setPreferredDate(e.target.value);
                        if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                      }}
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 transition-colors ${
                        errors.preferredDate
                          ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400'
                          : 'border-slate-300 focus:border-teal-600 focus:ring-teal-500/20'
                      }`}
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.preferredDate}</span>
                    </p>
                  )}
                </div>

                {/* Preferred Time */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.preferredTime} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <select
                      value={preferredTime}
                      onChange={(e) => {
                        setPreferredTime(e.target.value);
                        if (errors.preferredTime) setErrors({ ...errors, preferredTime: '' });
                      }}
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm bg-white focus:outline-hidden focus:ring-2 transition-colors ${
                        errors.preferredTime
                          ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400'
                          : 'border-slate-300 focus:border-teal-600 focus:ring-teal-500/20'
                      }`}
                    >
                      <option value="">{t.selectTime}</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot} WIB
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.preferredTime && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.preferredTime}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t.message}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl text-white font-semibold text-sm sm:text-base bg-teal-700 hover:bg-teal-800 disabled:opacity-50 shadow-md shadow-teal-900/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>{t.submittingBtn}</span>
                  ) : (
                    <>
                      <span>{t.submitBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Alternative Direct WhatsApp Booking Card */}
        <div className="mt-8 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-xs">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              {t.whatsAppDirectHeadline}
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              {t.whatsAppDirectDesc}
            </p>
          </div>
          <a
            href="https://wa.me/6282138823000"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors inline-flex items-center gap-2 shrink-0 shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.whatsAppDirectBtn}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
