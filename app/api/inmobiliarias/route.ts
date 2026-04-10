import { getDb } from "@/lib/db/mongodb";

const collectionName = "inmobiliarias";

export async function GET() {
  const db = await getDb();

  const data = await db
    .collection(collectionName)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const db = await getDb();

  const newItem = {
    ...body,
    createdAt: new Date(),
  };

  const result = await db.collection(collectionName).insertOne(newItem);

  return Response.json({ ok: true, id: result.insertedId });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...rest } = body;

  const db = await getDb();

  await db
    .collection(collectionName)
    .updateOne(
      { _id: new (await import("mongodb")).ObjectId(id) },
      { $set: rest },
    );

  return Response.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const db = await getDb();

  await db.collection(collectionName).deleteOne({
    _id: new (await import("mongodb")).ObjectId(id),
  });

  return Response.json({ ok: true });
}
