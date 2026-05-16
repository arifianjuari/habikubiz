export interface BusinessItem {
  id: string;
  childId: string;
  name: string;
  type: string;
  category: string;
  cash: string;
  summary: string;
  note: string;
}

export interface ChildItem {
  id: string;
  name: string;
  birthYear: number;
  initials: string;
}

export const children: ChildItem[] = [
  { id: "child-naya", name: "Naya", birthYear: 2014, initials: "NY" },
  { id: "child-raka", name: "Raka", birthYear: 2012, initials: "RK" },
];

export const businesses: BusinessItem[] = [
  {
    id: "stiker-keren",
    childId: "child-naya",
    name: "Stiker Keren",
    type: "Simulasi",
    category: "Kerajinan",
    cash: "Rp185.000",
    summary: "Belajar usaha lewat stiker custom dengan fokus ke modal, HPP, dan pencatatan kas.",
    note: "Usaha stiker custom dengan pencatatan kas paling aktif.",
  },
  {
    id: "snack-kelas",
    childId: "child-raka",
    name: "Snack Kelas",
    type: "Nyata",
    category: "Kuliner",
    cash: "Rp96.500",
    summary: "Usaha makanan ringan yang dipakai untuk belajar pemasukan, pengeluaran, dan stok sederhana.",
    note: "Jualan camilan kecil untuk teman-teman sekolah.",
  },
  {
    id: "gelang-warna",
    childId: "child-naya",
    name: "Gelang Warna",
    type: "Simulasi",
    category: "Aksesoris",
    cash: "Rp72.000",
    summary: "Usaha latihan untuk memahami harga pokok dan margin laba secara bertahap.",
    note: "Belajar hitung modal, HPP, dan laba sederhana.",
  },
];

export function getBusinessById(id: string) {
  return businesses.find((business) => business.id === id);
}

export function getBusinessesByChildId(childId: string) {
  return businesses.filter((business) => business.childId === childId);
}

export function getChildById(id: string) {
  return children.find((child) => child.id === id);
}
