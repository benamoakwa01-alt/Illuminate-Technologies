import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";

const allowedArrays = ["challenge","products","printMethods","customerTypes","features","orderChannels","deliveryOptions"];
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object" || !body.contactName?.trim() || !body.businessName?.trim() || !body.phone?.trim()) {
      return NextResponse.json({ error: "Please provide your name, business name and phone number." }, { status: 400 });
    }
    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }
    const clean: Record<string, unknown> = {};
    const allowed = ["contactName","businessName","email","phone","location","businessType","otherChallenge","otherProducts","printMethodOther","otherFeature","currentOrderProcess","paymentPreference","budget","timeline","extra"];
    for (const key of allowed) clean[key] = typeof body[key] === "string" ? body[key].trim().slice(0, 4000) : "";
    for (const key of allowedArrays) clean[key] = Array.isArray(body[key]) ? body[key].filter((x: unknown) => typeof x === "string").slice(0, 30) : [];
    const { error } = await db().from("discovery_submissions").insert({ answers: clean, review_status: "New" });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Submission error", e);
    return NextResponse.json({ error: "We could not submit your answers. Please try again in a moment." }, { status: 500 });
  }
}
