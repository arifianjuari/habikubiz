import { describe, expect, it } from "vitest";

import {
  isBalanced,
  postingsForCashTransaction,
  postingsForInitialCapital,
} from "./journal-engine";

describe("postingsForCashTransaction", () => {
  it("memetakan pemasukan penjualan ke Kas / Pendapatan Penjualan", () => {
    const rows = postingsForCashTransaction({
      kind: "pemasukan",
      categorySlug: "penjualan",
      amount: 25_000,
    });
    expect(isBalanced(rows)).toBe(true);
    expect(rows.find((r) => r.direction === "debit")?.accountName).toBe("Kas");
    expect(rows.find((r) => r.direction === "credit")?.accountName).toBe("Pendapatan Penjualan");
  });

  it("memetakan pembelian bahan ke Persediaan / Kas", () => {
    const rows = postingsForCashTransaction({
      kind: "pengeluaran",
      categorySlug: "pembelian bahan",
      amount: 12_000,
    });
    expect(isBalanced(rows)).toBe(true);
    expect(rows.find((r) => r.direction === "debit")?.accountName).toContain("Persediaan");
  });

  it("menolak amount tidak positif", () => {
    expect(() =>
      postingsForCashTransaction({ kind: "pemasukan", categorySlug: "penjualan", amount: 0 }),
    ).toThrow(RangeError);
  });
});

describe("postingsForInitialCapital", () => {
  it("modal awal Kas / Modal Pemilik dan balance", () => {
    const rows = postingsForInitialCapital(100_000);
    expect(isBalanced(rows)).toBe(true);
    expect(rows.some((r) => r.direction === "debit" && r.accountName === "Kas")).toBe(true);
    expect(rows.some((r) => r.direction === "credit" && r.accountName.includes("Modal"))).toBe(true);
  });
});
