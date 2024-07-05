'use client';

import React from 'react'
import PropTypes from 'prop-types'
import { useSession } from './pocketbase';

function Auth() {
    const session = useSession();
    if (!session) return null;
    const { githubSignIn, user, signOut } = session

    return (
        <div>
          {!user && (
              <button onClick={() => githubSignIn()}>Login with GitHub</button>
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
