import { User } from "api/types/userTypes";
import { STORAGE_KEYS } from "constants/storage";


export function readStoredAuth(): { token: string | null; user: User | null } {
    try {
        const token = localStorage.getItem(STORAGE_KEYS.token);
        const raw = localStorage.getItem(STORAGE_KEYS.user);

        if (!token || !raw) {
            return { token: null, user: null };
        }

        const user: User = JSON.parse(raw);

        return { token, user };
    } catch {
        return { token: null, user: null };
    }
}

export function persistAuth(user: User | null, token: string | null) {
    if (user && token) {
        localStorage.setItem(STORAGE_KEYS.token, token);
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    } else {
        localStorage.removeItem(STORAGE_KEYS.token);
        localStorage.removeItem(STORAGE_KEYS.user);
    }
}