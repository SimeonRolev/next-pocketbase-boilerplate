/*
https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

export const dynamic = 'force-dynamic' // Always fetches the latest data
*/
export const revalidate = 15 // Revalidates every second

import React from 'react'
import { Note } from '../api';
import { requests } from '../requests';

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
  const note = await requests.note(params.id)
  // const note = await requests.note(params.id, { next: { revalidate: 10 } })  // Custom revalidation time

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
// export async function generateStaticParams() {
//   const notes = await requests.notes()
//   return notes.map(note => ({
//     id: note.id
//   }))
// }

export default NotePage