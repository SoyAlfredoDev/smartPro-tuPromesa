import { MongoClient, MongoClientOptions } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

const options: MongoClientOptions = {
  appName: "devrel.vercel.integration",
  maxIdleTimeMS: 5000,
};

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const client = new MongoClient(uri, options);

attachDatabasePool(client);

export default client;

export async function getDb(dbName = "tuPromesa") {
  await client.connect();
  return client.db(dbName);
}
