// import { cookies } from "next/headers";
// import { SignJWT, jwtVerify } from "jose";

// const secretKey = process.env.AUTH_SECRET;

// if (!secretKey) {
//   throw new Error("AUTH_SECRET is not defined in .env");
// }

// const encodedKey = new TextEncoder().encode(secretKey);

// export interface SessionPayload {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }

// /* =========================
//    CREATE SESSION
// ========================= */

// export async function createSession(user: SessionPayload) {
//   const token = await new SignJWT({
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//   })
//     .setProtectedHeader({
//       alg: "HS256",
//     })
//     .setIssuedAt()
//     .setExpirationTime("7d")
//     .sign(encodedKey);

//   const cookieStore = await cookies();

//   cookieStore.set("admin_session", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     maxAge: 60 * 60 * 24 * 7,
//     path: "/",
//   });
// }

// /* =========================
//    GET SESSION
// ========================= */

// export async function getSession(): Promise<SessionPayload | null> {
//   const cookieStore = await cookies();

//   const token = cookieStore.get("admin_session")?.value;

//   if (!token) {
//     return null;
//   }

//   try {
//     const { payload } = await jwtVerify(
//       token,
//       encodedKey
//     );

//     return {
//       id: Number(payload.id),
//       name: String(payload.name),
//       email: String(payload.email),
//       role: String(payload.role),
//     };
//   } catch {
//     return null;
//   }
// }

// /* =========================
//    DELETE SESSION / LOGOUT
// ========================= */

// export async function deleteSession() {
//   const cookieStore = await cookies();

//   cookieStore.delete("admin_session");
// }
import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.AUTH_SECRET;

if (!secretKey) {
  throw new Error("AUTH_SECRET is not defined");
}

const encodedKey = new TextEncoder().encode(secretKey);

export interface SessionPayload {
  id: number;
  name: string;
  email: string;
  role: string;
}

/* =========================
   CREATE SESSION
========================= */

export async function createSession(
  user: SessionPayload
) {
  const token = await new SignJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  const cookieStore = await cookies();

  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

/* =========================
   GET SESSION
========================= */

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("admin_session")?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      encodedKey
    );

    return {
      id: Number(payload.id),
      name: String(payload.name),
      email: String(payload.email),
      role: String(payload.role),
    };
  } catch {
    return null;
  }
}

/* =========================
   DELETE SESSION
========================= */

export async function deleteSession() {
  const cookieStore = await cookies();

  cookieStore.delete("admin_session");
}