import React from 'react'
import { getNote, getNotes } from '../api';

function Note({ note }: any) {
  const { id, title, content, created } = note || {}

  return (
    <div>
      <h1 className='text-xl2'>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <h5>{created}</h5>
    </div>
  )
}

async function NotePage(props: { params: { id: string } }) {
  const { params } = props;
  const note = await getNote(params.id);

  return (
    <div>
      <Note note={note} />
    </div>
  )
}

/* Pre-rendering for dynamic URLs.
Adding this method returns all the possible NotePage.props.params configurations,
so that this component can be prepared at build time and not request anything else.
It will not be called again during revalidation (ISR) */
export async function generateStaticParams() {
  const notes = await getNotes()
  return notes.map(note => ({
    id: note.id
  }))
}

export default NotePage