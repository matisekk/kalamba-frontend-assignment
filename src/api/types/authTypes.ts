import { User } from "./userTypes";

export interface AuthContextValue {
    user: User | null;
    token: string | null;
    ready: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: (redirectTo?: string) => void;
};