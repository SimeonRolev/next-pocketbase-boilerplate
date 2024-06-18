/*
https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

export const dynamic = 'force-dynamic' // Always fetches the latest data
export const revalidate = 1 // Revalidates every second
*/

import React from 'react'
import { Note, getNote, getNotes } from '../api';

function NoteUI({ note }: { note: Note }) {
  const { title, content, created } = note || {}

  return (
    <div>
      <h1 className='text-xl2'>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <h5>{created}</h5>
    </div>
  )
}

interface Props {
  params: {
    id: string
  }
}

async function NotePage(props: Props) {
  const { params } = props;
  const note = await getNote(params.id);

  return (
    <div>
      <NoteUI note={note} />
    </div>
  )
}

/* Pre-rendering for dynamic URLs.
Adding this method returns a set of NotePage.props.params configurations,
for which the component will be prepared at build time and not request anything later.
It will not be called again during revalidation (ISR).

Control what happens when a dynamic segment is visited that was not generated with generateStaticParams:
https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
*/
export async function generateStaticParams() {
  const notes = await getNotes()
  return notes.map(note => ({
    id: note.id
  }))
}

export default NotePage