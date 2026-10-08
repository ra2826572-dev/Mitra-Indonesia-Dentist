import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

app.use(express.json());

// Robust static file serving for images and public assets
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data folder and file exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface ServerDB {
  appointments: any[];
  contacts: any[];
  settings: {
    hours: any[];
  };
}

const defaultDB: ServerDB = {
  appointments: [
    {
      id: 'MID-2026-001',
      patientName: 'Ahmad Fauzi',
      phone: '081288992211',
      email: 'ahmad.fauzi@example.com',
      treatment: 'Dental Scaling & Cleaning (Pembersihan Karang Gigi)',
      preferredDate: '2026-10-05',
      preferredTime: '10:00',
      message: 'Scaling rutin 6 bulan sekali. Ingin pembersihan karang gigi bawah.',
      status: 'confirmed',
      notes: 'Jadwal dikonfirmasi via WhatsApp. Pasien tepat waktu.',
      createdAt: '2026-10-01T09:30:00.000Z',
      updatedAt: '2026-10-01T10:15:00.000Z',
    },
    {
      id: 'MID-2026-002',
      patientName: 'Maya Indah Permata',
      phone: '081399887766',
      email: 'maya.indah@example.com',
      treatment: 'Teeth Whitening (Bleaching Gigi Profesional)',
      preferredDate: '2026-10-06',
      preferredTime: '14:00',
      message: 'Persiapan acara pernikahan bulan depan, konsultasi pemutihan gigi.',
      status: 'pending',
      notes: 'Perlu konfirmasi ketersediaan bahan bleaching gel.',
      createdAt: '2026-10-02T02:14:00.000Z',
      updatedAt: '2026-10-02T02:14:00.000Z',
    },
  ],
  contacts: [
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
  ],
  settings: {
    hours: [
      { dayId: 'Senin', dayEn: 'Monday', hours: '09.00 – 21.00 WIB', isOpen: true },
      { dayId: 'Selasa', dayEn: 'Tuesday', hours: '09.00 – 21.00 WIB', isOpen: true },
      { dayId: 'Rabu', dayEn: 'Wednesday', hours: '09.00 – 21.00 WIB', isOpen: true },
      { dayId: 'Kamis', dayEn: 'Thursday', hours: '09.00 – 21.00 WIB', isOpen: true },
      { dayId: 'Jumat', dayEn: 'Friday', hours: '09.00 – 21.00 WIB', isOpen: true },
      { dayId: 'Sabtu', dayEn: 'Saturday', hours: '09.00 – 21.00 WIB', isOpen: true },
      { dayId: 'Minggu', dayEn: 'Sunday', hours: '09.00 – 21.00 WIB', isOpen: true },
    ],
  },
};

function readDB(): ServerDB {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultDB, null, 2));
      return defaultDB;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return defaultDB;
  }
}

function writeDB(data: ServerDB): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error saving db:', err);
  }
}

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', clinic: 'Mitra Indonesia Dentist', timestamp: new Date().toISOString() });
});

// Admin Auth
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (password === 'mitradental2025' || password === 'admin123') {
    res.json({ success: true, token: `auth_mid_${Date.now()}` });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Appointments API
app.get('/api/appointments', (_req: Request, res: Response) => {
  const db = readDB();
  res.json(db.appointments);
});

app.post('/api/appointments', (req: Request, res: Response) => {
  const { patientName, phone, email, treatment, preferredDate, preferredTime, message } = req.body;

  if (!patientName || !phone || !treatment || !preferredDate || !preferredTime) {
    res.status(400).json({ error: 'Missing required appointment fields' });
    return;
  }

  const db = readDB();
  const newAppointment = {
    id: req.body.id || `MID-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    patientName,
    phone,
    email: email || '',
    treatment,
    preferredDate,
    preferredTime,
    message: message || '',
    status: 'pending', // Always pending initially
    notes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.appointments.unshift(newAppointment);
  writeDB(db);
  res.status(201).json(newAppointment);
});

app.patch('/api/appointments/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const db = readDB();

  const idx = db.appointments.findIndex((a) => a.id === id);
  if (idx === -1) {
    res.status(404).json({ error: 'Appointment not found' });
    return;
  }

  if (status) db.appointments[idx].status = status;
  if (notes !== undefined) db.appointments[idx].notes = notes;
  db.appointments[idx].updatedAt = new Date().toISOString();

  writeDB(db);
  res.json(db.appointments[idx]);
});

app.delete('/api/appointments/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDB();
  db.appointments = db.appointments.filter((a) => a.id !== id);
  writeDB(db);
  res.json({ success: true });
});

// Contacts API
app.get('/api/contact', (_req: Request, res: Response) => {
  const db = readDB();
  res.json(db.contacts);
});

app.post('/api/contact', (req: Request, res: Response) => {
  const { name, phone, email, subject, message } = req.body;
  if (!name || !phone || !message) {
    res.status(400).json({ error: 'Missing required contact fields' });
    return;
  }

  const db = readDB();
  const newContact = {
    id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
    name,
    phone,
    email: email || '',
    subject: subject || 'Pertanyaan Layanan Dental',
    message,
    status: 'unread',
    createdAt: new Date().toISOString(),
  };

  db.contacts.unshift(newContact);
  writeDB(db);
  res.status(201).json(newContact);
});

async function startServer() {
  const distExists = fs.existsSync(path.join(__dirname, 'dist', 'index.html'));
  const isProd = process.env.NODE_ENV === 'production' || distExists;

  if (!isProd) {
    // Vite middleware in dev
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mitra Indonesia Dentist Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
