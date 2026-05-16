import { describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({
    getAll: () => [],
    set: vi.fn(),
  })),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn(async () => null),
}));

vi.mock("@/lib/supabase/auth", () => ({
  getCurrentUser: vi.fn(async () => null),
}));

describe("child.repository", () => {
  it("mengembalikan data demo saat Supabase/sesi tidak tersedia", async () => {
    const { listChildSummaries } = await import("@/server/repositories/child.repository");
    const rows = await listChildSummaries();
    expect(rows.length).toBe(2);
    expect(rows[0]).toMatchObject({
      name: expect.any(String),
      initials: expect.any(String),
      birthYear: expect.any(Number),
    });
  });
});
