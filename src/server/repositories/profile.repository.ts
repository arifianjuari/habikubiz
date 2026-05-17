import { cache } from "react";

import { getCurrentUser } from "@/lib/supabase/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type AppSelectionBootstrap = {
  readonly childId: string | null;
  readonly businessId: string | null;
};

/** Preferensi usaha/anak aktif + fallback ke entri pertama (supaya tidak menempel ID demo di localStorage). */
export const getAppSelectionBootstrap = cache(async function getAppSelectionBootstrap(): Promise<AppSelectionBootstrap | null> {
  const supabase = await getSupabaseServerClient();
  const user = await getCurrentUser();
  if (!supabase || !user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("last_active_child_id, last_active_business_id")
    .eq("id", user.id)
    .maybeSingle();

  let childId: string | null = profile?.last_active_child_id ?? null;
  let businessId: string | null = profile?.last_active_business_id ?? null;

  if (!childId) {
    const { data: firstChild } = await supabase
      .from("children")
      .select("id")
      .eq("parent_user_id", user.id)
      .order("name", { ascending: true })
      .limit(1)
      .maybeSingle();
    childId = firstChild?.id ?? null;
  }

  if (childId && !businessId) {
    const { data: firstBiz } = await supabase
      .from("businesses")
      .select("id")
      .eq("child_id", childId)
      .order("name", { ascending: true })
      .limit(1)
      .maybeSingle();
    businessId = firstBiz?.id ?? null;
  }

  return { childId, businessId };
});
