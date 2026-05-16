import { Skeleton } from "@/components/ui/skeleton";

export default function ChildBusinessesLoading() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="min-h-[160px] w-full rounded-3xl" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="min-h-[220px] rounded-3xl" />
        <Skeleton className="min-h-[220px] rounded-3xl" />
        <Skeleton className="min-h-[220px] rounded-3xl" />
      </div>
    </div>
  );
}
