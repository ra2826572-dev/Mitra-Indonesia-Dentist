export type Language = 'id' | 'en';

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  treatment: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DentalService {
  id: string;
  slug: string;
  nameId: string;
  nameEn: string;
  shortDescId: string;
  shortDescEn: string;
  fullDescId: string;
  fullDescEn: string;
  iconName: string;
  category: 'preventive' | 'cosmetic' | 'restorative' | 'pediatric' | 'general';
  benefitsId: string[];
  benefitsEn: string[];
  durationMinutes: number;
  image?: string;
}

export interface GalleryItem {
  id: string;
  titleId: string;
  titleEn: string;
  category: 'all' | 'interior' | 'treatment' | 'consultation' | 'equipment';
  imageUrl: string;
  captionId: string;
  captionEn: string;
}

export interface DentistProfile {
  name: string;
  titleId: string;
  titleEn: string;
  sipNumber: string;
  strNumber: string;
  experienceYears: number;
  qualificationsId: string[];
  qualificationsEn: string[];
  bioId: string;
  bioEn: string;
  image: string;
  scheduleId: string;
  scheduleEn: string;
  specialtiesId: string[];
  specialtiesEn: string[];
}

export interface PatientReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  treatmentTagId: string;
  treatmentTagEn: string;
  commentId: string;
  commentEn: string;
  verified: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read';
  createdAt: string;
}

export interface OpeningHourItem {
  dayId: string;
  dayEn: string;
  hours: string;
  isOpen: boolean;
}
