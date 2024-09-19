// app/api/init-db/route.ts
import { initDatabase } from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  await initDatabase();
  return NextResponse.json({ message: 'Database initialized' }, { status: 200 });
}