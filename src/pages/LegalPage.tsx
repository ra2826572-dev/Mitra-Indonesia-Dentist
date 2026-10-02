import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { PageId } from '../components/Navbar';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  currentLang: Language;
  onNavigatePage: (page: PageId) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, currentLang, onNavigatePage }) => {
  const isPrivacy = type === 'privacy';
  const t = translations[currentLang].legal;

  return (
    <div>
      <PageHeader
        category="Legalitas & Privasi Klinik"
        title={isPrivacy ? t.privacyTitle : t.termsTitle}
        description={
          isPrivacy
            ? 'Komitmen Mitra Indonesia Dentist dalam menjaga kerahasiaan data rekam medis dan informasi pribadi pasien.'
            : 'Ketentuan dan tata tertib pelayanan perawatan gigi di Mitra Indonesia Dentist.'
        }
        currentPageTitle={isPrivacy ? t.privacyTitle : t.termsTitle}
        onNavigateHome={() => onNavigatePage('home')}
      />

      <div className="py-16 bg-white text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-8 sm:p-12 space-y-6 text-sm text-slate-700 leading-relaxed">
            {isPrivacy ? (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Kebijakan Privasi Pasien
                    </h2>
                    <p className="text-xs text-slate-500">
                      Terakhir diperbarui: Oktober 2026 · Mitra Indonesia Dentist
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <p>
                    Mitra Indonesia Dentist menghargai dan menjamin privasi setiap pasien. Kami mengelola seluruh data medis dan identitas pasien berdasarkan standar perlindungan data pribadi dan Kode Etik Kedokteran Gigi Indonesia.
                  </p>

                  <h3 className="text-base font-bold text-slate-900 pt-3">
                    1. Pengumpulan Informasi
                  </h3>
                  <p>
                    Kami hanya mengumpulkan informasi yang Anda berikan secara sukarela saat mengajukan janji temu atau menghubungi klinik kami, yang mencakup:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
                    <li>Nama lengkap pasien</li>
                    <li>Nomor kontak telepon atau WhatsApp aktif</li>
                    <li>Alamat email</li>
                    <li>Keluhan atau riwayat kesehatan gigi yang ingin dikonsultasikan</li>
                    <li>Pilihan hari dan jam kunjungan yang diinginkan</li>
                  </ul>

                  <h3 className="text-base font-bold text-slate-900 pt-3">
                    2. Pemanfaatan Informasi
                  </h3>
                  <p>
                    Data yang terkumpul digunakan eksklusif untuk:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
                    <li>Mengonfirmasi dan menjadwalkan janji temu medis Anda dengan dokter gigi</li>
                    <li>Mengirimkan pengingat jadwal kunjungan melalui WhatsApp atau telepon</li>
                    <li>Persiapan awal sterilisasi instrumen dan penyiapan berkas rekam medis klinis</li>
                  </ul>

                  <h3 className="text-base font-bold text-slate-900 pt-3">
                    3. Kerahasiaan Rekam Medis
                  </h3>
                  <p>
                    Seluruh rekam medis dan data pemeriksaan disimpan secara aman dan hanya dapat diakses oleh dokter gigi yang merawat dan tim medis berwenang. Kami tidak pernah membagikan atau menjual data Anda kepada pihak ketiga manapun.
                  </p>

                  <h3 className="text-base font-bold text-slate-900 pt-3">
                    4. Hak Pasien
                  </h3>
                  <p>
                    Anda berhak menanyakan, memperbarui, atau meminta klarifikasi terkait data diri Anda dengan menghubungi langsung resepsionis kami di +62 821-3882-3000.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Syarat & Ketentuan Layanan
                    </h2>
                    <p className="text-xs text-slate-500">
                      Ketentuan Pelayanan Klinis · Mitra Indonesia Dentist
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <p>
                    Dengan menggunakan website ini atau menjadwalkan kunjungan di Mitra Indonesia Dentist, Anda menyepakati syarat dan ketentuan berikut:
                  </p>

                  <h3 className="text-base font-bold text-slate-900 pt-3">
                    1. Status Reservasi Janji Temu
                  </h3>
                  <p>
                    Pengisian formulir janji temu melalui website berstatus <strong>PENDING</strong> sampai staf resepsionis kami menghubungi Anda melalui WhatsApp atau telepon untuk mengonfirmasi ketersediaan dokter dan slot waktu yang dipilih.
                  </p>

                  <h3 className="text-base font-bold text-slate-900 pt-3">
                    2. Kehadiran & Ketepatan Waktu
                  </h3>
                  <p>
                    Demi kelancaran seluruh pasien dan kepatuhan terhadap protokol sterilisasi berstandar tinggi, pasien diharapkan hadir 10-15 menit sebelum waktu janji temu. Keterlambatan lebih dari 20 menit berpotensi menyebabkan penyesuaian urutan giliran.
                  </p>

                  <h3 className="text-base font-bold text-slate-900 pt-3">
                    3. Diagnosis Medis & Rencana Perawatan
                  </h3>
                  <p>
                    Informasi layanan dalam website ini bersifat edukatif. Penentuan diagnosis definitif, rencana perawatan, dan biaya tindakan akan disampaikan secara transparan oleh dokter gigi setelah pemeriksaan klinis langsung dilakukan di klinik.
                  </p>

                  <h3 className="text-base font-bold text-slate-900 pt-3">
                    4. Pembatalan & Penjadwalan Ulang
                  </h3>
                  <p>
                    Pasien yang berhalangan hadir dimohon untuk menginformasikan ke resepsionis klinik setidaknya 2 jam sebelum jadwal melalui WhatsApp di +62 821-3882-3000.
                  </p>
                </div>
              </>
            )}

            <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
              <button
                onClick={() => onNavigatePage('home')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-teal-700 hover:text-teal-900 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Beranda</span>
              </button>
              <button
                onClick={() => onNavigatePage('appointment')}
                className="px-5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Buat Janji Temu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
