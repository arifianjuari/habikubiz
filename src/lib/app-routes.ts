/**
 * Peta rute aplikasi selaras PRD (Modul 1 + lampiran folder).
 * Bottom nav anak (mobile): Beranda · Kas · Produk · Laporan · Profil.
 * Aset & Jurnal: di sidebar desktop + hub usaha (bukan ikon bottom bar).
 */

export const appRoutes = {
  home: "/",
  login: "/login",

  child: {
    dashboard: "/child/dashboard",
    businesses: "/child/businesses",
    businessesNew: "/child/businesses/new",
    profile: "/child/profile",

    business: (businessId: string) => `/child/businesses/${businessId}`,

    cash: (businessId: string) => `/child/businesses/${businessId}/cash`,
    products: (businessId: string) => `/child/businesses/${businessId}/products`,
    reports: (businessId: string) => `/child/businesses/${businessId}/reports`,

    reportsLabaRugi: (businessId: string) => `/child/businesses/${businessId}/reports/laba-rugi`,
    reportsArusKas: (businessId: string) => `/child/businesses/${businessId}/reports/arus-kas`,
    reportsNeraca: (businessId: string) => `/child/businesses/${businessId}/reports/neraca`,
    reportsRekapAset: (businessId: string) => `/child/businesses/${businessId}/reports/rekap-aset`,

    assets: (businessId: string) => `/child/businesses/${businessId}/assets`,
    assetDetail: (businessId: string, assetId: string) =>
      `/child/businesses/${businessId}/assets/${assetId}`,

    journal: (businessId: string) => `/child/businesses/${businessId}/journal`,
    journalLedger: (businessId: string, accountCode: string) =>
      `/child/businesses/${businessId}/journal/buku-besar/${encodeURIComponent(accountCode)}`,
    journalTrialBalance: (businessId: string) =>
      `/child/businesses/${businessId}/journal/neraca-saldo`,
  },

  parent: {
    dashboard: "/parent/dashboard",
    children: "/parent/children",
    childrenNew: "/parent/children/new",
    childEdit: (childId: string) => `/parent/children/${childId}/edit`,
    comments: "/parent/comments",
    businessOverview: (childId: string, businessId: string) =>
      `/parent/businesses/${childId}/${businessId}/overview`,
  },
} as const;
