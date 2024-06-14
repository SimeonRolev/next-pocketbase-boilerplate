import React from 'react'
import Link from 'next/link'
import CreateNoteForm from './CreateNoteForm'

function Layout({ children }: { children: any }) {
  return (
    <div>
        <Link href='/notes'><b>Notes</b></Link>
        {children}
        <CreateNoteForm />
    </div>
  )
}

export default Layout
