import Link from 'next/link';
import React, { cache } from 'react'
import { Note } from './api';
import { requests } from './requests';

function UI({ note }: any) {
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
  const notes = await requests.notes({ cache: 'no-store' })

  return (
    <div className='flex flex-wrap'>{
      notes?.map((note) => {
        return <UI key={note.id} note={note} />
      })}
    </div>
  )
}

export default NotesPage