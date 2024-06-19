import { Note } from "../route"
import db from "../../../../db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const q = await db.collection('notes').getOne(params.id, { cache: 'no-store'} ) as Note
    return NextResponse.json(q)
}