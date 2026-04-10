import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    (await cookies()).set("admin_auth", "true", {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return Response.json({ ok: true });
  }

  return Response.json(
    { ok: false, error: "Credenciales incorrectas" },
    { status: 401 },
  );
}
