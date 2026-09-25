import { redirect } from "next/navigation";
import { isEditorAuthenticated } from "@/lib/editor-auth";
import { getEditorContent } from "@/lib/site-store";
import Editor from "@/components/Editor";
import { logoutAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Private editor",
  robots: { index: false, follow: false },
};

export default async function EditPage() {
  if (!(await isEditorAuthenticated())) redirect("/edit/login");
  const content = await getEditorContent();
  return <Editor initialContent={content} logoutAction={logoutAction} />;
}
