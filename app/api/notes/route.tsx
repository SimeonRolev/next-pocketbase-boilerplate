import { NextRequest, NextResponse } from 'next/server';
import db from '../../../db';

export interface Note {
  id: string
  title: string
  content: string
  created: string
}

export async function GET() {
  const q = await db.collection('notes').getList(1, 10, { cache: 'no-store' })
  return NextResponse.json(q.items)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const note = await db.collection('notes').create(data)
  return NextResponse.json(note)
}