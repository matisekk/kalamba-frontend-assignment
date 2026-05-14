import { createContext } from "react";
import { AuthContextValue } from "api/types/authTypes";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);