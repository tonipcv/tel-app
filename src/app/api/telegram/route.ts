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

export async function POST(req: Request) {
  const { message } = await req.json();

  if (message) {
    const text = message.text;
    const chatId = message.chat.id;

    // Verificar se o ID do grupo está correto
    if (chatId === -1001234567890) {  // Substitua pelo ID correto do grupo
      const { db } = await connectToDatabase(process.env.MONGODB_URI!);

      // Salvar a mensagem no MongoDB
      await db.collection('mensagens').insertOne({
        texto: text,
        dataRecebida: new Date(),
      });

      return NextResponse.json({ status: 'Mensagem processada com sucesso' });
    } else {
      return NextResponse.json({ error: 'Grupo não autorizado' }, { status: 403 });
    }
  } else {
    return NextResponse.json({ error: 'Sem mensagem para processar' }, { status: 400 });
  }
}
