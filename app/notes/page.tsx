import Link from 'next/link';
import React from 'react'
import { getNotes } from './api';

function Note({ note }: any) {
  const { id, title, content, created } = note || {}
  return (
    <Link href={`/notes/${id}`}>
      <div className="border m-4 p-2">
          <h1 className='text-xl2'>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <h5>{created}</h5>
        </div>
    </Link>
  )
}

async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className='flex flex-wrap'>{
      notes?.map((note) => {
        return <Note key={note.id} note={note} />
      })}
    </div>
  )
}

export default NotesPage