"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type ChildProfileFormState, createChildProfileAction } from "@/server/actions/child-profile.actions";

export function ChildCreateForm() {
  const [state, formAction, pending] = useActionState(createChildProfileAction, null as ChildProfileFormState);

  return (
    <form className="mt-8 flex flex-col gap-5" action={formAction} noValidate>
      {state && !state.ok ? (
        <div className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
          {state.error}
        </div>
      ) : null}

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="child-name">Nama anak</FieldLabel>
          <Input
            id="child-name"
            name="child-name"
            placeholder="Contoh: Naya"
            required
            className="h-auto min-h-11 rounded-2xl px-4 py-3"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="birth-year">Tahun lahir</FieldLabel>
          <Input
            id="birth-year"
            name="birth-year"
            type="number"
            inputMode="numeric"
            placeholder="Contoh: 2014"
            required
            min={1990}
            max={2099}
            className="h-auto min-h-11 rounded-2xl px-4 py-3"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="avatar-initials">Avatar / inisial</FieldLabel>
          <Input
            id="avatar-initials"
            name="avatar-initials"
            placeholder="Contoh: NJ"
            className="h-auto min-h-11 rounded-2xl px-4 py-3"
          />
          <FieldDescription>Opsi: dua huruf untuk badge profil — jika kosong, diisi otomatis dari nama.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="child-pin">PIN child mode</FieldLabel>
          <Input
            id="child-pin"
            name="child-pin"
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="4 digit PIN"
            autoComplete="new-password"
            className="h-auto min-h-11 rounded-2xl px-4 py-3"
          />
          <FieldDescription>PIN disimpan ter-hash di server. Kosongkan jika akan diatur nanti.</FieldDescription>
        </Field>
      </FieldGroup>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button type="submit" disabled={pending} className="min-h-12 rounded-full px-6 text-sm font-semibold">
          {pending ? "Menyimpan…" : "Simpan Profil Anak"}
        </Button>
        <Link
          href="/parent/dashboard"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold no-underline",
          )}
        >
          Kembali
        </Link>
      </div>
    </form>
  );
}
