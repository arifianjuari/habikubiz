import { Suspense } from "react";

import { listBusinessOverviews } from "@/server/repositories/business.repository";

import { ChildBusinessesClient } from "./child-businesses-client";
import ChildBusinessesLoading from "./loading";

async function ChildBusinessesBody() {
  const businesses = await listBusinessOverviews();
  return <ChildBusinessesClient businesses={businesses} />;
}

export default function ChildBusinessesPage() {
  return (
    <Suspense fallback={<ChildBusinessesLoading />}>
      <ChildBusinessesBody />
    </Suspense>
  );
}
