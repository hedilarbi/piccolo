import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI est manquant dans .env");

const globalMongo = globalThis as typeof globalThis & { piccoloMongo?: Promise<MongoClient> };

export const mongoClient = globalMongo.piccoloMongo ?? new MongoClient(uri).connect();
if (process.env.NODE_ENV !== "production") globalMongo.piccoloMongo = mongoClient;

export async function getDb() {
  return (await mongoClient).db();
}
