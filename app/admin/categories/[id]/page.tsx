import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditCategoryForm from "@/admin/EditCategoryForm";
import AdminAuth from "app/admin/AdminAuth";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <AdminAuth>

    <EditCategoryForm
      category={category}
    />
    </AdminAuth>
  );
}