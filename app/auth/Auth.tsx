'use client';

import React from 'react'
import { useSession } from './pocketbase';

function Auth() {
  const session = useSession();
  if (!session) return null;
  const { ghManual, ghAllInOne, user, signOut } = session

  return (
    <div>
      {!user && (
        <ul>
          <li>
            <button onClick={() => ghManual()}>Login with GitHub (Manual)</button>
          </li>
          <li>
            <button onClick={() => ghAllInOne()}>Login with GitHub (All-in-one)</button>
          </li>
        </ul>
      )}
      {user && (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}

Auth.propTypes = {}

export default Auth
