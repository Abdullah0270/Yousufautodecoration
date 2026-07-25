"use server";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

/* =========================================
   LOGIN ADMIN
========================================= */

export async function loginAdmin(
  _prevState: { error: string },
  formData: FormData
): Promise<{ error: string }> {
  const email = String(
    formData.get("email") || ""
  )
    .trim()
    .toLowerCase();

  const password = String(
    formData.get("password") || ""
  );

  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      error: "Invalid email or password.",
    };
  }

  if (user.role !== "ADMIN") {
    return {
      error:
        "You are not authorized to access the admin panel.",
    };
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    return {
      error: "Invalid email or password.",
    };
  }

  await createSession({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  redirect("/admin");
}

/* =========================================
   REGISTER ADMIN
========================================= */

export async function registerAdmin(
  _prevState: { error: string },
  formData: FormData
): Promise<{ error: string }> {
  const name = String(
    formData.get("name") || ""
  ).trim();

  const email = String(
    formData.get("email") || ""
  )
    .trim()
    .toLowerCase();

  const password = String(
    formData.get("password") || ""
  );

  if (!name || !email || !password) {
    return {
      error: "All fields are required.",
    };
  }

  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters.",
    };
  }

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

  if (existingUser) {
    return {
      error:
        "An account with this email already exists.",
    };
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  redirect("/admin/login");
}