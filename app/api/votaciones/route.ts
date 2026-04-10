import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db/mongodb";

type VoteBody = {
  inmobiliariaId?: string;
  email?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as VoteBody;

    const inmobiliariaId = body.inmobiliariaId?.trim();
    const email = body.email?.trim().toLowerCase();

    if (!inmobiliariaId) {
      return Response.json(
        { ok: false, error: "El id de la inmobiliaria es obligatorio." },
        { status: 400 },
      );
    }

    if (!email) {
      return Response.json(
        { ok: false, error: "El correo electrónico es obligatorio." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { ok: false, error: "El correo electrónico no es válido." },
        { status: 400 },
      );
    }

    if (!ObjectId.isValid(inmobiliariaId)) {
      return Response.json(
        { ok: false, error: "El id de la inmobiliaria no es válido." },
        { status: 400 },
      );
    }

    const db = await getDb();

    const inmobiliaria = await db.collection("inmobiliarias").findOne({
      _id: new ObjectId(inmobiliariaId),
    });

    if (!inmobiliaria) {
      return Response.json(
        { ok: false, error: "La inmobiliaria no existe." },
        { status: 404 },
      );
    }

    const existingVote = await db.collection("votos_inmobiliarias").findOne({
      inmobiliariaId,
      email,
    });

    if (existingVote) {
      return Response.json(
        {
          ok: false,
          error: "Este correo ya registró un voto para esta inmobiliaria.",
        },
        { status: 409 },
      );
    }

    const newVote = {
      inmobiliariaId,
      email,
      createdAt: new Date(),
    };

    const result = await db
      .collection("votos_inmobiliarias")
      .insertOne(newVote);

    return Response.json(
      {
        ok: true,
        message: "Voto registrado correctamente.",
        id: result.insertedId.toString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registrando voto:", error);

    return Response.json(
      { ok: false, error: "Ocurrió un error al registrar el voto." },
      { status: 500 },
    );
  }
}
