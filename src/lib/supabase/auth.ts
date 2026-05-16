import { cache } from "react";

import { getSupabaseServerClient } from "@/lib/supabase/server";

/** Gunakan `getUser()` di server — jangan mengandalkan `getSession()` untuk otorisasi. */
export const getCurrentUser = cache(async () => {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;
  return user;
});
