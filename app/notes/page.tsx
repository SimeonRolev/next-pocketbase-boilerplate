import Link from 'next/link';
import React from 'react'
import { getNotes } from './api';

function Note({ note }: any) {
    const { id, title, content, created } = note || {}

  return (
    <Link
        href={`/notes/${id}`}
    ><div>{title}</div></Link>
  )
}

async function NotesPage() {
    const notes = await getNotes();

  return (
    <div>{
        notes?.map((note) => {
            return <Note key={note.id} note={note} />
        })}
    </div>
  )
}

export default NotesPage