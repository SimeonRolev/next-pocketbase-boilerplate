import React from 'react'
import Link from 'next/link'

function Layout({ children }: { children: any }) {
  return (
    <div>
        <Link href='/notes'><b>Notes</b></Link>
        {children}
    </div>
  )
}

export default Layout
