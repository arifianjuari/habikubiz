"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function NewChildProfilePage() {
  return (
    <main className="rounded-3xl border border-border-subtle bg-background p-8 shadow-sm">
      <div className="max-w-2xl">
        <div className="text-sm font-semibold uppercase text-primary">Setup Profil Anak</div>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">Buat profil anak pertama</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Buat profil anak terlebih dahulu agar mereka bisa masuk ke child mode dan mulai belajar mengelola usaha.
        </p>

        <form className="mt-8 flex flex-col gap-5" noValidate>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="child-name">Nama anak</FieldLabel>
              <Input
                id="child-name"
                placeholder="Contoh: Naya"
                required
                className="h-auto min-h-11 rounded-2xl px-4 py-3"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="birth-year">Tahun lahir</FieldLabel>
              <Input
                id="birth-year"
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
                placeholder="Contoh: NJ"
                className="h-auto min-h-11 rounded-2xl px-4 py-3"
              />
              <FieldDescription>Opsi: dua huruf untuk badge profil.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="child-pin">PIN child mode</FieldLabel>
              <Input
                id="child-pin"
                type="password"
                inputMode="numeric"
                maxLength={4}
                placeholder="4 digit PIN"
                className="h-auto min-h-11 rounded-2xl px-4 py-3"
              />
              <FieldDescription>PIN ini dipakai anak saat masuk mode anak di perangkat orang tua.</FieldDescription>
            </Field>
          </FieldGroup>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button type="submit" className="min-h-12 rounded-full px-6 text-sm font-semibold">
              Simpan Profil Anak
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
      </div>
    </main>
  );
}
