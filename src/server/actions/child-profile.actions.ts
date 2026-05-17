"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/supabase/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type ChildProfileFormState = { ok: false; error: string } | { ok: true } | null;

const BCRYPT_ROUNDS = 10;

function deriveInitials(name: string, rawInitials: string): string {
  const manual = rawInitials.trim().toUpperCase().slice(0, 2);
  if (manual.length === 2) {
    return manual;
  }
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase().slice(0, 2);
  }
  const one = parts[0] ?? "?";
  return one.length >= 2 ? one.slice(0, 2).toUpperCase() : `${one[0] ?? "?"}?`.toUpperCase().slice(0, 2);
}

async function assertOwnsChild(supabase: NonNullable<Awaited<ReturnType<typeof getSupabaseServerClient>>>, childId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return false;
  }
  const { data } = await supabase.from("children").select("id").eq("id", childId).eq("parent_user_id", user.id).maybeSingle();
  return !!data;
}

export async function createChildProfileAction(_prev: ChildProfileFormState, formData: FormData): Promise<ChildProfileFormState> {
  const user = await getCurrentUser();
  const supabase = await getSupabaseServerClient();
  if (!user || !supabase) {
    return { ok: false, error: "Sesi tidak valid. Silakan masuk lagi." };
  }

  const name = String(formData.get("child-name") ?? "").trim();
  const birthYearRaw = String(formData.get("birth-year") ?? "").trim();
  const initialsRaw = String(formData.get("avatar-initials") ?? "").trim();
  const pinRaw = String(formData.get("child-pin") ?? "").trim();

  if (!name) {
    return { ok: false, error: "Nama anak wajib diisi." };
  }

  const birthYear = Number(birthYearRaw);
  if (!Number.isInteger(birthYear) || birthYear < 1990 || birthYear > 2099) {
    return { ok: false, error: "Tahun lahir harus antara 1990 dan 2099." };
  }

  if (pinRaw && !/^\d{4}$/.test(pinRaw)) {
    return { ok: false, error: "PIN harus 4 digit angka, atau kosongkan dulu." };
  }

  const id = crypto.randomUUID();
  const initials = deriveInitials(name, initialsRaw);
  const pin_hash = pinRaw ? await bcrypt.hash(pinRaw, BCRYPT_ROUNDS) : null;

  const { error } = await supabase.from("children").insert({
    id,
    parent_user_id: user.id,
    name,
    birth_year: birthYear,
    initials,
    pin_hash,
  });

  if (error) {
    console.error("createChildProfileAction:", error.message);
    return { ok: false, error: "Gagal menyimpan. Coba lagi." };
  }

  revalidatePath("/parent/children");
  revalidatePath("/parent/dashboard");
  redirect("/parent/children");
}

export async function updateChildProfileAction(_prev: ChildProfileFormState, formData: FormData): Promise<ChildProfileFormState> {
  const user = await getCurrentUser();
  const supabase = await getSupabaseServerClient();
  if (!user || !supabase) {
    return { ok: false, error: "Sesi tidak valid. Silakan masuk lagi." };
  }

  const childId = String(formData.get("child-id") ?? "").trim();
  if (!childId || !(await assertOwnsChild(supabase, childId))) {
    return { ok: false, error: "Profil anak tidak ditemukan." };
  }

  const name = String(formData.get("child-name") ?? "").trim();
  const birthYearRaw = String(formData.get("birth-year") ?? "").trim();
  const initialsRaw = String(formData.get("avatar-initials") ?? "").trim();
  const pinRaw = String(formData.get("child-pin") ?? "").trim();

  if (!name) {
    return { ok: false, error: "Nama anak wajib diisi." };
  }

  const birthYear = Number(birthYearRaw);
  if (!Number.isInteger(birthYear) || birthYear < 1990 || birthYear > 2099) {
    return { ok: false, error: "Tahun lahir harus antara 1990 dan 2099." };
  }

  if (pinRaw && !/^\d{4}$/.test(pinRaw)) {
    return { ok: false, error: "PIN baru harus 4 digit angka, atau kosongkan untuk tidak mengubah." };
  }

  const initials = deriveInitials(name, initialsRaw);

  const patch: Record<string, unknown> = {
    name,
    birth_year: birthYear,
    initials,
  };

  if (pinRaw) {
    patch.pin_hash = await bcrypt.hash(pinRaw, BCRYPT_ROUNDS);
  }

  const { error } = await supabase.from("children").update(patch).eq("id", childId).eq("parent_user_id", user.id);

  if (error) {
    console.error("updateChildProfileAction:", error.message);
    return { ok: false, error: "Gagal menyimpan. Coba lagi." };
  }

  revalidatePath("/parent/children");
  revalidatePath("/parent/dashboard");
  revalidatePath(`/parent/children/${childId}/edit`);
  return { ok: true };
}

export async function deleteChildProfileAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  const supabase = await getSupabaseServerClient();
  if (!user || !supabase) {
    redirect("/parent/children");
  }

  const childId = String(formData.get("child-id") ?? "").trim();
  if (!childId || !(await assertOwnsChild(supabase, childId))) {
    redirect("/parent/children");
  }

  await supabase.from("children").delete().eq("id", childId).eq("parent_user_id", user.id);

  revalidatePath("/parent/children");
  revalidatePath("/parent/dashboard");
  redirect("/parent/children");
}
