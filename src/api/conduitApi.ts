import { api } from "./client";
import { Article, ArticlesQueryParams, MultipleArticlesResponse, SingleArticleResponse } from "./types/articleTypes";
import { Profile, ProfileResponse } from "./types/profileTypes";
import { User, UserResponse } from "./types/userTypes";

export async function fetchArticles(params: ArticlesQueryParams): Promise<MultipleArticlesResponse> {
    const { data } = await api.get<MultipleArticlesResponse>("/articles", { params });
    return data;
}

export async function fetchArticle(slug: string): Promise<Article> {
    const { data } = await api.get<SingleArticleResponse>(`/articles/${encodeURIComponent(slug)}`);
    return data.article;
}

export async function fetchProfile(username: string): Promise<Profile> {
    const { data } = await api.get<ProfileResponse>(`/profiles/${encodeURIComponent(username)}`);
    return data.profile;
}

export async function fetchCurrentUser(): Promise<User> {
    const { data } = await api.get<UserResponse>("/user");
    return data.user;
}

export async function loginUser(email: string, password: string): Promise<User> {
    const { data } = await api.post<UserResponse>("/users/login", {
        user: { email, password },
    });
    return data.user;
}

export async function favoriteArticle(slug: string): Promise<Article> {
    const { data } = await api.post<SingleArticleResponse>(
        `/articles/${encodeURIComponent(slug)}/favorite`
    );
    return data.article;
}

export async function unfavoriteArticle(slug: string): Promise<Article> {
    const { data } = await api.delete<SingleArticleResponse>(
        `/articles/${encodeURIComponent(slug)}/favorite`
    );
    return data.article;
}

export async function followUser(username: string): Promise<Profile> {
    const { data } = await api.post<ProfileResponse>(
        `/profiles/${encodeURIComponent(username)}/follow`
    );
    return data.profile;
}

export async function unfollowUser(username: string): Promise<Profile> {
    const { data } = await api.delete<ProfileResponse>(
        `/profiles/${encodeURIComponent(username)}/follow`
    );
    return data.profile;
}
