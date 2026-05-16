"use client";

import { PageCard, PageHeader, PageShell } from "@/components/ui-shell/page-shell";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function NewBusinessPage() {
  return (
    <PageShell>
      <PageCard>
        <div className="max-w-2xl">
          <PageHeader
            title="Buat Usaha Baru"
            description="Mulai dari usaha sederhana dulu. Nanti detail lain bisa dilengkapi bertahap."
          />

          <form className="mt-8 flex flex-col gap-5" noValidate>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="biz-name">Nama usaha</FieldLabel>
                <Input
                  id="biz-name"
                  placeholder="Contoh: Stiker Keren"
                  required
                  className="h-auto min-h-11 rounded-2xl px-4 py-3"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="biz-kind">Jenis usaha</FieldLabel>
                <Select defaultValue="simulasi">
                  <SelectTrigger id="biz-kind" size="default" className="h-auto min-h-11 w-full rounded-2xl px-4 py-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="simulasi">Simulasi</SelectItem>
                      <SelectItem value="nyata">Nyata</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="biz-category">Kategori</FieldLabel>
                <Input
                  id="biz-category"
                  placeholder="Contoh: Kerajinan"
                  className="h-auto min-h-11 rounded-2xl px-4 py-3"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="biz-capital">Modal awal</FieldLabel>
                <Input
                  id="biz-capital"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="Contoh: 100000"
                  className="h-auto min-h-11 rounded-2xl px-4 py-3"
                />
                <FieldDescription>Dalam Rupiah (tanpa titik atau koma).</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="biz-desc">Deskripsi singkat</FieldLabel>
                <Textarea
                  id="biz-desc"
                  placeholder="Ceritakan usaha ini secara singkat"
                  className="min-h-28 rounded-2xl px-4 py-3 text-base md:text-sm"
                />
              </Field>
            </FieldGroup>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button type="submit" className="min-h-12 rounded-full px-6 text-sm font-semibold">
                Simpan Usaha
              </Button>
              <Button type="button" variant="outline" className="min-h-12 rounded-full px-6 text-sm font-semibold">
                Batal
              </Button>
            </div>
          </form>
        </div>
      </PageCard>
    </PageShell>
  );
}
