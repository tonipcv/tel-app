import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

async function connectToDatabase(uri: string) {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('telegramDB');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function GET() {
  const { db } = await connectToDatabase(process.env.MONGODB_URI!);

  // Busca as últimas 10 mensagens no banco de dados
  const messages = await db.collection('mensagens').find().sort({ dataRecebida: -1 }).limit(10).toArray();

  return NextResponse.json({ messages });
}
