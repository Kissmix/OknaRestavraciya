import { db } from "@/db";
import { leads } from "@/db/schema";

export const dynamic = "force-dynamic";

const clip = (value: unknown, max: number): string | null =>
  typeof value === "string" ? value.trim().slice(0, max) || null : null;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { ok: false, error: "bad_request" },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return Response.json(
      { ok: false, error: "bad_request" },
      { status: 400 }
    );
  }

  const { name, phone, message, service, source } = body as Record<
    string,
    unknown
  >;

  const phoneStr = typeof phone === "string" ? phone.trim() : "";
  const digits = phoneStr.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    return Response.json(
      { ok: false, error: "invalid_phone" },
      { status: 400 }
    );
  }

  try {
    await db.insert(leads).values({
      name: clip(name, 120),
      phone: phoneStr.slice(0, 32),
      message: clip(message, 2000),
      service: clip(service, 300),
      source: clip(source, 40) ?? "site",
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
