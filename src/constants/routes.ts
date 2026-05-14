export const ROUTES = {
    paths: {
        home: "/",
        login: "/login",
        register: "/register",
        article: "/article/:slug",
        profile: "/profile/:username",
        settings: "/settings",
        editor: "/editor",
        otherPath: "*",
    },

    to: {
        home: "/",
        login: "/login",
        register: "/register",
        article: (slug: string) => `/article/${encodeURIComponent(slug)}`,
        profile: (username: string) => `/profile/${encodeURIComponent(username)}`,
        settings: "/settings",
        editor: "/editor",
    },
};