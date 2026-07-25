import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  if (session.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return <>{children}</>;
}