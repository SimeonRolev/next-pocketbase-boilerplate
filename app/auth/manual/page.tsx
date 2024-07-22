'use client'

import React, { useEffect } from 'react'
import pb from '@/db';
import Link from 'next/link';
import { useSession } from '../pocketbase';

const home_uri = 'http://localhost:3000'
const redirect_uri = 'http://localhost:3000/auth/manual'

function Page() {
    const { setUser } = useSession();

    useEffect(() => {
        const login = async () => {
            /* For some reason, this view redirects to itself - maybe because this is the redirectURL.
            So, after the login, it will come back to this page and run this script again.
            On every request, the codeVerifier changes, so the second request will fail with 'bad_verification_code'.
            I use this flag to prevent the second round of executing the script.
             */
            if (window.localStorage.getItem('auth') === '1') {
                window.localStorage.removeItem('auth')
                return;
            }

            const provider = JSON.parse(window.localStorage.getItem('provider')!)

            const params = (new URL(window.location.href)).searchParams;
            // compare the redirect's state param and the stored provider's one
            if (provider.state !== params.get('state')) {
                throw "State parameters don't match.";
            }
            await pb.collection('users').authWithOAuth2Code(
                provider.name,
                params.get('code')!,
                provider.codeVerifier,
                redirect_uri,
                // pass optional user create data
                {
                    emailVisibility: false,
                })
                .then((authData) => {
                    console.log(authData)
                    window.localStorage.setItem('auth', '1')
                    setUser(pb.authStore.model)
                    window.location.href = '/'
                })
                .catch((error) => {
                    console.warn(error)
                    // redirect(home_uri)
                })
        }

        login();
    }, [])

    return (
        <div>
            <span>{"Authenticating ..."}</span>
            <Link href='/'>Home</Link>
        </div>
    )
}

export default Page