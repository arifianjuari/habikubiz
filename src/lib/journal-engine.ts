export type LedgerDirection = "debit" | "credit";

export interface JournalPosting {
  readonly accountCode: string;
  readonly accountName: string;
  readonly amount: number;
  readonly direction: LedgerDirection;
}

export interface CashTransactionJournalInput {
  readonly kind: "pemasukan" | "pengeluaran";
  /** Kategori lowercase; dipetakan sesuai PRD bagian 8.1 (auto-generate jurnal). */
  readonly categorySlug: string;
  readonly amount: number;
}

const ACC = {
  kas: { code: "1-1-001", name: "Kas" },
  pendapatanPenjualan: { code: "4-1-001", name: "Pendapatan Penjualan" },
  pendapatanLain: { code: "4-9-001", name: "Pendapatan Lain-lain" },
  persediaan: { code: "1-3-001", name: "Persediaan / Beban Bahan" },
  tenagaKerja: { code: "5-1-001", name: "Beban Tenaga Kerja" },
  operasional: { code: "5-2-001", name: "Beban Operasional" },
  asetTetap: { code: "1-2-001", name: "Aset Tetap" },
  modal: { code: "3-1-001", name: "Modal Pemilik" },
} as const;

/** Menghasilkan dua baris jurnal yang seimbang (debit = kredit = amount). */
export function postingsForCashTransaction(input: CashTransactionJournalInput): JournalPosting[] {
  const { kind, categorySlug, amount } = input;
  if (!(amount > 0) || !Number.isFinite(amount)) {
    throw new RangeError("Jumlah harus bernilai positif dan finite");
  }

  if (kind === "pemasukan") {
    const slug = normalizeCategory(categorySlug);
    if (slug === "penjualan") {
      return balancedPosting(ACC.kas, ACC.pendapatanPenjualan, amount);
    }
    return balancedPosting(ACC.kas, ACC.pendapatanLain, amount);
  }

  const slug = normalizeCategory(categorySlug);
  if (slug === "pembelian_bahan" || slug === "bahan") {
    return balancedPosting(ACC.persediaan, ACC.kas, amount);
  }
  if (slug === "gaji" || slug === "upah" || slug === "tenaga_kerja") {
    return balancedPosting(ACC.tenagaKerja, ACC.kas, amount);
  }
  if (slug === "aset" || slug === "aset_tetap" || slug === "pembelian_aset") {
    return balancedPosting(ACC.asetTetap, ACC.kas, amount);
  }
  return balancedPosting(ACC.operasional, ACC.kas, amount);
}

function normalizeCategory(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, "_");
}

function balancedPosting(
  debit: { readonly code: string; readonly name: string },
  credit: { readonly code: string; readonly name: string },
  amount: number,
): JournalPosting[] {
  return [
    { accountCode: debit.code, accountName: debit.name, amount, direction: "debit" },
    { accountCode: credit.code, accountName: credit.name, amount, direction: "credit" },
  ];
}

/** Modal awal: Kas (D) / Modal Pemilik (K). */
export function postingsForInitialCapital(amount: number): JournalPosting[] {
  if (!(amount > 0) || !Number.isFinite(amount)) {
    throw new RangeError("Modal awal harus bernilai positif");
  }
  return balancedPosting(ACC.kas, ACC.modal, amount);
}

export function isBalanced(postings: JournalPosting[]): boolean {
  const debit = postings.filter((p) => p.direction === "debit").reduce((s, p) => s + p.amount, 0);
  const credit = postings.filter((p) => p.direction === "credit").reduce((s, p) => s + p.amount, 0);
  return Math.abs(debit - credit) < 1e-9;
}
