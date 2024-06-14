import db from '../../db';

export async function getNotes() {
    const q = await db.collection('notes').getList(1, 10)
    return q.items
}

export async function getNote(id: string) {
    const q = await db.collection('notes').getOne(id, {
        /* ISR - incremental static regeneration. Re-request if
        the last time was older than N seconds. */
        next: {
            revalidate: 10
        }
    })
    return q
}