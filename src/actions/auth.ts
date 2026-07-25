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

  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") || "");

  // Validation
  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  // Find user
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

  // Check role
  if (user.role !== "ADMIN") {
    return {
      error: "You are not authorized to access the admin panel.",
    };
  }

  // Check password
  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    return {
      error: "Invalid email or password.",
    };
  }

  // Create session
  await createSession({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  // Redirect after successful login
  redirect("/admin");
}


/* =========================================
   REGISTER ADMIN
========================================= */

export async function registerAdmin(
  _prevState: { error: string },
  formData: FormData
): Promise<{ error: string }> {

  const name = String(formData.get("name") || "").trim();

  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") || "");

  // Validation
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

  // Check existing user
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      error: "An account with this email already exists.",
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  // Create admin
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // After registration go to login
  redirect("/admin/login");
}