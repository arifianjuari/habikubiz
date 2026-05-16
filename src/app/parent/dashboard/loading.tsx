import { Skeleton } from "@/components/ui/skeleton";

export default function ParentDashboardLoading() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="min-h-[280px] w-full rounded-3xl" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Skeleton className="min-h-[320px] rounded-3xl" />
        <Skeleton className="min-h-[320px] rounded-3xl" />
      </div>
    </div>
  );
}
