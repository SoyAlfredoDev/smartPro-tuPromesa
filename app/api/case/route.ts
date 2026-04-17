//import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db/mongodb";
import { NextResponse } from "next/server";

type NewCaseBody = {
  firstName: string;
  lastName: string;
  rut: string;
  email: string;
  phone: string;
  inmobiliariaId: string;
  incidentDate: string;
  claimedAmount: string;
  issueDescription: string;
  expectedSolution: string;
  priorCommunication: string;
  claimObjective: string;
  acceptTerms: boolean;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const inmobiliariaId = body.inmobiliariaId?.trim();
    const email = body.email?.trim().toLowerCase();

    const db = await getDb();

    /* if (!inmobiliariaId) {
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

    if (!ObjectId.isValid(inmobiliariaId)) {
      return Response.json(
        { ok: false, error: "El id de la inmobiliaria no es válido." },
        { status: 400 },
      );
    }


   

    const inmobiliaria = await db.collection("inmobiliarias").findOne({
      _id: new ObjectId(inmobiliariaId),
    });

    if (!inmobiliaria) {
      return Response.json(
        { ok: false, error: "La inmobiliaria no existe." },
        { status: 404 },
      );
    }

    */

    const newCase: NewCaseBody = {
      firstName: body.firstName || null,
      lastName: body.lastName || null,
      rut: body.rut || null,
      email: body.email || null,
      phone: body.phone || null,
      inmobiliariaId: body.inmobiliariaId || null,
      incidentDate: body.incidentDate || null,
      claimedAmount: body.claimedAmount || null,
      issueDescription: body.issueDescription || null,
      expectedSolution: body.expectedSolution || null,
      priorCommunication: body.priorCommunication || null,
      claimObjective: body.claimObjective || null,
      acceptTerms: body.acceptTerms || null,
    };

    const result = await db.collection("casos").insertOne(newCase);

    return Response.json(
      {
        ok: true,
        message: "Caso registrado correctamente.",
        id: result.insertedId.toString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registrando caso:", error);

    return Response.json(
      { ok: false, error: "Ocurrió un error al registrar el caso." },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const db = await getDb();

    const casos = await db
      .collection("casos")
      .aggregate([
        // 🔹 Asegura que inmobiliariaId sea ObjectId
        {
          $addFields: {
            inmobiliariaId: {
              $cond: [
                { $eq: [{ $type: "$inmobiliariaId" }, "string"] },
                { $toObjectId: "$inmobiliariaId" },
                "$inmobiliariaId",
              ],
            },
          },
        },

        // 🔹 Join con inmobiliarias
        {
          $lookup: {
            from: "inmobiliarias",
            localField: "inmobiliariaId",
            foreignField: "_id",
            as: "inmobiliariaInfo",
          },
        },

        // 🔹 Convertir array a objeto
        {
          $unwind: {
            path: "$inmobiliariaInfo",
            preserveNullAndEmptyArrays: true,
          },
        },

        // 🔹 Selección de campos
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            rut: 1,
            email: 1,
            phone: 1,
            incidentDate: 1,
            claimedAmount: 1,
            issueDescription: 1,
            createdAt: 1,
            inmobiliariaId: 1,

            // 🔹 Nombre de inmobiliaria con fallback
            inmobiliariaName: {
              $ifNull: ["$inmobiliariaInfo.name", "No asignada"],
            },
          },
        },

        // 🔹 Ordenar por más recientes
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray();

    console.log("Casos con inmobiliaria:", casos);

    return NextResponse.json({ ok: true, casos }, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo casos:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Ocurrió un error al obtener los casos.",
      },
      { status: 500 },
    );
  }
}
