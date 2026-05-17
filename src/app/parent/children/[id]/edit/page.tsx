import { notFound } from "next/navigation";

import { ChildEditForm } from "@/app/parent/children/[id]/edit/child-edit-form";
import { getChildEditableById } from "@/server/repositories/child.repository";

export default async function EditChildProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const child = await getChildEditableById(id);
  if (!child) {
    notFound();
  }
  return <ChildEditForm child={child} />;
}
