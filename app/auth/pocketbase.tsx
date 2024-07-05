'use client';

import pb from "@/db";
import { useRouter } from "next/navigation";
import { AuthModel, AuthProviderInfo } from "pocketbase";
import { ReactNode, useEffect, useState, createContext, useContext } from "react";

interface AuthContextType {
    user: AuthModel | null;
    ghManual: () => void;
    ghAllInOne: () => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const [user, setUser] = useState<AuthModel>(null);
    const [githubAuthProvider, setGithubAuthProvider] =
        useState<AuthProviderInfo | null>(null);

    useEffect(() => {
        const initAuth = async () => {
            const authMethods = await pb
                .collection("users")
                .listAuthMethods()
                .then((methods) => methods)
                .catch((err) => {
                    console.error(err);
                });

            if (authMethods)
                for (const provider of authMethods.authProviders) {
                    if (provider.name === "github") setGithubAuthProvider(provider);
                }
        };

        initAuth();

        if (pb.authStore.model) setUser(pb.authStore.model);
    }, []);

    const ghAllInOne = async () => {
        await pb
            .collection('users')
            .authWithOAuth2({ provider: 'github' })
            .catch(error => {
                /*
                DEBUG Realtime connection established.
                └─ map[clientId:<id>]
                DEBUG Realtime subscriptions updated.
                └─ map[clientId:<id> subscriptions:[@oauth2]]
                INFO POST /api/realtime
                DEBUG Failed OAuth2 redirect due to an error or missing code parameter
                └─ map[clientId:<id> error:redirect_uri_mismatch]
                DEBUG Realtime connection closed (cancelled request)
                └─ map[clientId:<id>]
                [0.00ms] SELECT count(*) FROM `_admins`
                */
            
                console.log(error)
            })
        if (pb.authStore.model) setUser(pb.authStore.model);
    }

    const ghManual = () => {
        signOut();
        localStorage.setItem("provider", JSON.stringify(githubAuthProvider));
        const url = githubAuthProvider?.authUrl!;
        /* 
        Seems like the Github auth worked out fine, but I end up on http://localhost:8090/_/#/auth/oauth2-redirect-failure.
        
        From ./pocketbase serve --dev:
        DEBUG Missing or invalid OAuth2 subscription client
        └─ map[clientId:<id> error:No client associated with connection ID "<id>"]
        */
        router.push(url);
    };

    const signOut = () => {
        setUser(null);
        pb.authStore.clear();
    };

    return (
        <AuthContext.Provider value={{ user, ghManual, ghAllInOne, signOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useSession = () => useContext(AuthContext) as AuthContextType;
