"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/supabase/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function updateLastActiveSelection(childId: string | null, businessId: string | null): Promise<void> {
  const user = await getCurrentUser();
  const supabase = await getSupabaseServerClient();
  if (!user || !supabase) {
    return;
  }

  const { data: updated, error: updateError } = await supabase
    .from("profiles")
    .update({
      last_active_child_id: childId,
      last_active_business_id: businessId,
    })
    .eq("id", user.id)
    .select("id");

  if (updateError) {
    console.error("updateLastActiveSelection:", updateError.message);
    return;
  }

  if (!updated?.length) {
    const { error: insertError } = await supabase.from("profiles").insert({
      id: user.id,
      full_name: "",
      email: user.email ?? null,
      last_active_child_id: childId,
      last_active_business_id: businessId,
    });
    if (insertError) {
      console.error("updateLastActiveSelection insert:", insertError.message);
    }
  }

  revalidatePath("/parent", "layout");
  revalidatePath("/child", "layout");
}
