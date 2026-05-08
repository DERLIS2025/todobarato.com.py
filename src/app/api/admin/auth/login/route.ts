import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
} from "@/lib/admin/auth";

export async function POST(request: Request) {
  const formData = await request.formData();

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");

  const loginUrl = new URL("/admin/login", request.url);

  if (!email || !password) {
    loginUrl.searchParams.set("error", "missing");
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const admin = await prisma.adminUser.findUnique({
    where: {
      email,
    },
  });

  if (!admin || !admin.isActive) {
    loginUrl.searchParams.set("error", "invalid");
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const passwordIsValid = await bcrypt.compare(password, admin.passwordHash);

  if (!passwordIsValid) {
    loginUrl.searchParams.set("error", "invalid");
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const token = await createAdminSessionToken({
    sub: admin.id,
    email: admin.email,
    role: admin.role,
  });

  const response = NextResponse.redirect(new URL("/admin/dashboard", request.url), {
    status: 303,
  });

  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
