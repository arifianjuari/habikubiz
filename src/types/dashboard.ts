/** Baris ringkasan anak untuk dashboard orang tua (snapshot / API). */
export interface ParentDashboardChildRow {
  readonly id: string;
  readonly name: string;
  readonly initials: string;
  readonly businessCount: number;
  readonly activeBusinessNames: string;
}
