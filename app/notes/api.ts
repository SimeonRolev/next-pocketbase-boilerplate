import db from '../../db';

export interface Note {
  id: string
  title: string
  content: string
  created: string
}

export async function getNotes() {
  /* Without cache: no-store, the page is treated lia a static one.
  This means that this request will not be re-executed on normal refresh or router.refresh() */
  const q = await db.collection('notes').getList(1, 10, { cache: 'no-store' })
  return q.items as unknown as Note[]
}

export async function getNote(id: string) {
  const q = await db.collection('notes').getOne(id, {
    /* ISR - incremental static regeneration. Re-request if
    the last time was older than N seconds. */
    next: {
      revalidate: 10
    }
  })
  return q as unknown as Note
}

export async function createNote({ title, content }: { title: string, content: string }) {
  const note = await db.collection('notes').create({
    title, content
  })
  return note as unknown as Note
}
