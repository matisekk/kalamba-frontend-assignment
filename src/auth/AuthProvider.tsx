import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { setAuthToken } from "api/client";
import { loginUser } from "api/conduitApi";
import { User } from "api/types/userTypes";

import { AuthContext } from "./AuthContext";
import { persistAuth, readStoredAuth } from "./authStorage";

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const storedAuth = readStoredAuth();

    const [user, setUser] = useState<User | null>(storedAuth.user);
    const [token, setToken] = useState<string | null>(storedAuth.token);

    useEffect(() => {
        setAuthToken(token);
    }, [token]);

    async function login(email: string, password: string) {
        const loggedUser = await loginUser(email, password);

        persistAuth(loggedUser, loggedUser.token);
        setAuthToken(loggedUser.token);

        setUser(loggedUser);
        setToken(loggedUser.token);
    }

    function logout(redirectTo = '/') {
        persistAuth(null, null);
        setAuthToken(null);

        setUser(null);
        setToken(null);

        queryClient.clear();
        navigate(redirectTo);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                ready: true,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}