"use client";

import { deleteProduct } from "@/actions/product";

export default function DeleteProductButton({
  id,
}: {
  id: number;
}) {
  async function handleDelete() {
    const ok = confirm("Delete this product?");

    if (!ok) return;

    await deleteProduct(id);
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
}