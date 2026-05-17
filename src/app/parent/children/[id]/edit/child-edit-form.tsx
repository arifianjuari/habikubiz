"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  type ChildProfileFormState,
  deleteChildProfileAction,
  updateChildProfileAction,
} from "@/server/actions/child-profile.actions";
import type { ChildEditableRow } from "@/server/repositories/child.repository";

export function ChildEditForm({ child }: { child: ChildEditableRow }) {
  const [state, formAction, pending] = useActionState(updateChildProfileAction, null as ChildProfileFormState);

  return (
    <main className="rounded-3xl border border-border-subtle bg-background p-8 shadow-sm">
      <div className="max-w-2xl">
        <div className="text-sm font-semibold uppercase text-primary">Edit Profil Anak</div>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">{child.name}</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Perbarui data profil atau PIN. Kosongkan field PIN jika tidak ingin mengubahnya
          {child.pinIsSet ? " (PIN saat ini aktif)." : " (belum ada PIN)."}
        </p>

        <form className="mt-8 flex flex-col gap-5" action={formAction} noValidate>
          <input type="hidden" name="child-id" value={child.id} />

          {state && !state.ok ? (
            <div className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
              {state.error}
            </div>
          ) : null}

          {state?.ok ? (
            <div className="rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground" role="status">
              Perubahan disimpan.
            </div>
          ) : null}

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="child-name">Nama anak</FieldLabel>
              <Input
                id="child-name"
                name="child-name"
                defaultValue={child.name}
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
                defaultValue={child.birthYear}
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
                defaultValue={child.initials}
                className="h-auto min-h-11 rounded-2xl px-4 py-3"
              />
              <FieldDescription>Dua huruf untuk badge profil.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="child-pin">PIN child mode (baru)</FieldLabel>
              <Input
                id="child-pin"
                name="child-pin"
                type="password"
                inputMode="numeric"
                maxLength={4}
                placeholder={child.pinIsSet ? "•••• (tidak diubah)" : "4 digit PIN"}
                autoComplete="new-password"
                className="h-auto min-h-11 rounded-2xl px-4 py-3"
              />
              <FieldDescription>Isi hanya jika ingin mengganti PIN. 4 digit angka.</FieldDescription>
            </Field>
          </FieldGroup>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button type="submit" disabled={pending} className="min-h-12 rounded-full px-6 text-sm font-semibold">
              {pending ? "Menyimpan…" : "Simpan perubahan"}
            </Button>
            <Link
              href="/parent/children"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold no-underline",
              )}
            >
              Batal
            </Link>
          </div>
        </form>

        <div className="mt-12 border-t border-border-subtle pt-8">
          <h2 className="text-lg font-semibold text-destructive">Zona berbahaya</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Menghapus profil anak akan menghapus seluruh usaha dan data terkait (cascade di database).
          </p>
          <form action={deleteChildProfileAction} className="mt-4">
            <input type="hidden" name="child-id" value={child.id} />
            <Button
              type="submit"
              variant="destructive"
              className="min-h-12 rounded-full px-6 text-sm font-semibold"
            >
              Hapus profil anak
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
