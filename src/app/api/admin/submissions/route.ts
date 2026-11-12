import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { db } from "@/lib/supabase";
export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await db().from("discovery_submissions").select("*").order("created_at", { ascending: false }).limit(300);
  if (error) return NextResponse.json({ error: "Could not load submissions." }, { status: 500 });
  return NextResponse.json({ submissions: data });
}
export async function PATCH(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, review_status, internal_notes } = await req.json();
  const statuses = ["New","In review","Contacted","Archived"];
  if (!id || !statuses.includes(review_status) || typeof internal_notes !== "string") return NextResponse.json({ error: "Invalid update." }, { status: 400 });
  const { error } = await db().from("discovery_submissions").update({ review_status, internal_notes: internal_notes.slice(0, 5000) }).eq("id", id);
  if (error) return NextResponse.json({ error: "Could not save changes." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
