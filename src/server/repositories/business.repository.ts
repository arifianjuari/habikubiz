import type { BusinessOverview } from "@/types/domain";

import { cache } from "react";

import { SEED_CHILD_NAYA_ID, SEED_CHILD_RAKA_ID } from "@/lib/demo-context";
import { getCurrentUser } from "@/lib/supabase/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const MOCK_BUSINESSES: readonly BusinessOverview[] = [
  {
    id: "stiker-keren",
    childId: SEED_CHILD_NAYA_ID,
    name: "Stiker Keren",
    type: "simulasi",
    category: "Kerajinan",
    description:
      "Belajar usaha lewat stiker custom dengan fokus ke modal, HPP, dan pencatatan kas.",
    initialCapital: 100_000,
    estimatedCashRp: 185_000,
    tagline: "Usaha stiker custom dengan pencatatan kas paling aktif.",
  },
  {
    id: "snack-kelas",
    childId: SEED_CHILD_RAKA_ID,
    name: "Snack Kelas",
    type: "nyata",
    category: "Kuliner",
    description:
      "Usaha makanan ringan yang dipakai untuk belajar pemasukan, pengeluaran, dan stok sederhana.",
    initialCapital: 50_000,
    estimatedCashRp: 96_500,
    tagline: "Jualan camilan kecil untuk teman-teman sekolah.",
  },
  {
    id: "gelang-warna",
    childId: SEED_CHILD_NAYA_ID,
    name: "Gelang Warna",
    type: "simulasi",
    category: "Aksesoris",
    description:
      "Usaha latihan untuk memahami harga pokok dan margin laba secara bertahap.",
    initialCapital: 72_000,
    estimatedCashRp: 72_000,
    tagline: "Belajar hitung modal, HPP, dan laba sederhana.",
  },
];

function mapBusinessRow(row: {
  id: string;
  child_id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  initial_capital: number | string;
  estimated_cash_rp: number | string;
  tagline: string;
}): BusinessOverview {
  return {
    id: row.id,
    childId: row.child_id,
    name: row.name,
    type: row.type === "nyata" ? "nyata" : "simulasi",
    category: row.category,
    description: row.description,
    initialCapital: Number(row.initial_capital),
    estimatedCashRp: Number(row.estimated_cash_rp),
    tagline: row.tagline,
  };
}

export const listBusinessOverviews = cache(async function listBusinessOverviews(): Promise<readonly BusinessOverview[]> {
  const supabase = await getSupabaseServerClient();
  const user = await getCurrentUser();

  if (!supabase || !user) {
    return MOCK_BUSINESSES;
  }

  const { data, error } = await supabase.from("businesses").select("*").order("name", { ascending: true });

  if (error || !data?.length) {
    return MOCK_BUSINESSES;
  }

  return data.map((row) =>
    mapBusinessRow(
      row as unknown as {
        id: string;
        child_id: string;
        name: string;
        type: string;
        category: string;
        description: string;
        initial_capital: number | string;
        estimated_cash_rp: number | string;
        tagline: string;
      },
    ),
  );
});

export const findBusinessOverviewById = cache(async function findBusinessOverviewById(
  id: string,
): Promise<BusinessOverview | undefined> {
  const supabase = await getSupabaseServerClient();
  const user = await getCurrentUser();

  if (!supabase || !user) {
    return MOCK_BUSINESSES.find((b) => b.id === id);
  }

  const { data, error } = await supabase.from("businesses").select("*").eq("id", id).maybeSingle();

  if (error || !data) {
    return MOCK_BUSINESSES.find((b) => b.id === id);
  }

  return mapBusinessRow(
    data as unknown as {
      id: string;
      child_id: string;
      name: string;
      type: string;
      category: string;
      description: string;
      initial_capital: number | string;
      estimated_cash_rp: number | string;
      tagline: string;
    },
  );
});

export const listBusinessOverviewsByChildId = cache(async function listBusinessOverviewsByChildId(
  childId: string,
): Promise<readonly BusinessOverview[]> {
  const supabase = await getSupabaseServerClient();
  const user = await getCurrentUser();

  if (!supabase || !user) {
    return MOCK_BUSINESSES.filter((b) => b.childId === childId);
  }

  const { data, error } = await supabase.from("businesses").select("*").eq("child_id", childId).order("name", { ascending: true });

  if (error || !data?.length) {
    return MOCK_BUSINESSES.filter((b) => b.childId === childId);
  }

  return data.map((row) =>
    mapBusinessRow(
      row as unknown as {
        id: string;
        child_id: string;
        name: string;
        type: string;
        category: string;
        description: string;
        initial_capital: number | string;
        estimated_cash_rp: number | string;
        tagline: string;
      },
    ),
  );
});
