"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui-shell/page-shell";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      toast.message("Mode demo", {
        description: "NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY belum diset — lanjut ke dashboard contoh.",
      });
      router.push("/parent/dashboard");
      return;
    }

    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Masuk berhasil");
    router.push("/parent/dashboard");
    router.refresh();
  }

  async function handleGoogle() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      toast.error("Supabase belum dikonfigurasi.");
      return;
    }

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="rounded-3xl border border-border-subtle bg-background p-8 shadow-sm">
      <PageHeader
        eyebrow="Login Orang Tua"
        title="Masuk untuk mulai mendampingi usaha anak"
        description="Masuk sebagai orang tua untuk mulai membuat profil anak, menyiapkan usaha pertama, dan mendampingi proses belajarnya."
      />

      <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="login-email">Email</FieldLabel>
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="nama@email.com"
              required
              className="h-auto min-h-11 rounded-2xl px-4 py-3"
            />
            <FieldDescription>Gunakan email yang terdaftar sebagai orang tua.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="login-password">Password</FieldLabel>
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
              className="h-auto min-h-11 rounded-2xl px-4 py-3"
            />
          </Field>
        </FieldGroup>

        <div className="flex flex-col gap-3 pt-2">
          <Button type="submit" disabled={busy} className="min-h-12 rounded-full px-6 text-sm font-semibold">
            {busy ? "Memproses…" : "Masuk"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => void handleGoogle()}
            className="min-h-12 rounded-full px-6 text-sm font-semibold"
          >
            Masuk dengan Google
          </Button>
        </div>
      </form>
    </div>
  );
}
