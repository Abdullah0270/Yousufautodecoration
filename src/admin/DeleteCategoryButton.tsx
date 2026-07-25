"use client";

import { deleteCategory } from "@/actions/category";

export default function DeleteCategoryButton({
  id,
}: {
  id: number;
}) {
  return (
    <button
      onClick={async () => {
        if (confirm("Delete this category?")) {
          await deleteCategory(id);
        }
      }}
      className="rounded bg-red-600 px-3 py-1 text-sm text-white"
    >
      Delete
    </button>
  );
}