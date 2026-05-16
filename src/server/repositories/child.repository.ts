import type { ChildSummary } from "@/types/domain";

import { cache } from "react";

import {
  SEED_CHILD_NAYA_ID,
  SEED_CHILD_RAKA_ID,
  SEED_PARENT_ID,
} from "@/lib/demo-context";
import { getCurrentUser } from "@/lib/supabase/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const MOCK_CHILDREN: readonly ChildSummary[] = [
  {
    id: SEED_CHILD_NAYA_ID,
    parentId: SEED_PARENT_ID,
    name: "Naya",
    birthYear: 2014,
    initials: "NY",
  },
  {
    id: SEED_CHILD_RAKA_ID,
    parentId: SEED_PARENT_ID,
    name: "Raka",
    birthYear: 2012,
    initials: "RK",
  },
];

export const listChildSummaries = cache(async function listChildSummaries(): Promise<readonly ChildSummary[]> {
  const supabase = await getSupabaseServerClient();
  const user = await getCurrentUser();

  if (!supabase || !user) {
    return MOCK_CHILDREN;
  }

  const { data, error } = await supabase
    .from("children")
    .select("id, parent_user_id, name, birth_year, initials")
    .eq("parent_user_id", user.id)
    .order("name", { ascending: true });

  if (error || !data?.length) {
    return MOCK_CHILDREN;
  }

  return data.map((row) => ({
    id: row.id,
    parentId: row.parent_user_id,
    name: row.name,
    birthYear: row.birth_year,
    initials: row.initials,
  }));
});

export const findChildSummaryById = cache(async function findChildSummaryById(id: string): Promise<ChildSummary | undefined> {
  const all = await listChildSummaries();
  return all.find((c) => c.id === id);
});
