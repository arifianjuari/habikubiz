export interface ParentProfile {
  id: string;
  fullName: string;
  email: string;
}

export interface ChildProfile {
  id: string;
  parentId: string;
  name: string;
  birthYear: number;
  /** Hash di backend; tidak pernah plaintext di klien. */
  pin: string;
}

export type BusinessKind = "simulasi" | "nyata";

export interface Business {
  id: string;
  childId: string;
  name: string;
  type: BusinessKind;
  category: string;
  description: string;
  /** Modal awal (Rupiah utuh). */
  initialCapital: number;
}

/** Usaha lengkap untuk UI mock / lapisan repositori. */
export interface BusinessOverview extends Business {
  /** Estimasi saldo kas sekarang untuk demo. */
  estimatedCashRp: number;
  /** Teks kartu pendek di daftar usaha. */
  tagline: string;
}

/** Ringkasan anak untuk picker & dashboard. */
export interface ChildSummary {
  id: string;
  parentId: string;
  name: string;
  birthYear: number;
  initials: string;
}
