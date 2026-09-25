"use server";

import { redirect } from "next/navigation";
import { logIn, logOut } from "@/lib/editor-auth";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!(await logIn(password))) redirect("/edit/login?error=1");
  redirect("/edit");
}

export async function logoutAction() {
  await logOut();
  redirect("/edit/login");
}
