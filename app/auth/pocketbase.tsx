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
            .catch(console.warn)
        if (pb.authStore.model) setUser(pb.authStore.model);
    }

    const ghManual = () => {
        signOut();
        localStorage.setItem("provider", JSON.stringify(githubAuthProvider));
        const url = githubAuthProvider?.authUrl! + 'http://localhost:3000/auth/manual'
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
