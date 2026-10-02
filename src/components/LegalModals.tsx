import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  currentLang: Language;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, currentLang, onClose }) => {
  if (!type) return null;

  const t = translations[currentLang].legal;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-left">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-teal-700" />
            <h3 className="text-base font-bold text-slate-900">
              {type === 'privacy' ? t.privacyTitle : t.termsTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="font-semibold text-slate-900">
                Kebijakan Privasi Mitra Indonesia Dentist
              </p>
              <p>
                Mitra Indonesia Dentist berkomitmen menjaga kerahasiaan data pribadi dan rekam medis pasien sesuai peraturan perundang-undangan Republik Indonesia dan standar etika kedokteran gigi.
              </p>
              <h4 className="font-bold text-slate-800 pt-2">1. Data yang Kami Kumpulkan</h4>
              <p>
                Informasi yang dikumpulkan melalui formulir janji temu dan kontak hanya mencakup nama lengkap, nomor telepon/WhatsApp, alamat email, keluhan gigi, dan preferensi jadwal kunjungan.
              </p>
              <h4 className="font-bold text-slate-800 pt-2">2. Penggunaan Data</h4>
              <p>
                Data tersebut digunakan semata-mata untuk konfirmasi reservasi jadwal perawatan gigi, komunikasi pra/pasca-tindakan klinis, dan peningkatan mutu layanan perawatan gigi Anda. Kami tidak pernah membagikan atau menjual data Anda kepada pihak ketiga manapun.
              </p>
              <h4 className="font-bold text-slate-800 pt-2">3. Keamanan Informasi</h4>
              <p>
                Semua data pasien disimpan dalam basis data terenkripsi dan hanya dapat diakses oleh staf administrasi serta dokter gigi berwenang di Mitra Indonesia Dentist.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-slate-900">
                Syarat & Ketentuan Layanan Mitra Indonesia Dentist
              </p>
              <p>
                Selamat datang di website resmi Mitra Indonesia Dentist. Dengan mengakses atau mengajukan janji temu melalui website ini, Anda menyetujui ketentuan berikut:
              </p>
              <h4 className="font-bold text-slate-800 pt-2">1. Status Reservasi Janji Temu</h4>
              <p>
                Permintaan janji temu yang diajukan melalui website berstatus <strong>PENDING</strong> sampai staf klinik kami menghubungi Anda untuk mengonfirmasi ketersediaan slot dokter.
              </p>
              <h4 className="font-bold text-slate-800 pt-2">2. Ketepatan Waktu Kunjungan</h4>
              <p>
                Pasien disarankan hadir 10-15 menit sebelum waktu janji temu yang telah dikonfirmasi guna keperluan registrasi awal dan persiapan tindakan steril.
              </p>
              <h4 className="font-bold text-slate-800 pt-2">3. Penjelasan Klinis & Rencana Perawatan</h4>
              <p>
                Setiap tindakan medis dan penentuan rencana perawatan didasarkan pada hasil pemeriksaan klinis langsung oleh dokter gigi yang bertugas di klinik.
              </p>
            </>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
