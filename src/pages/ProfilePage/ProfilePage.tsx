import { useQuery } from "@tanstack/react-query";
import { fetchArticles, fetchProfile } from "api/conduitApi";
import { useAuth } from "auth/useAuth";
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator";
import AuthorAvatar from "components/AuthorAvatar/AuthorAvatar";
import ArticlePreview from "components/ArticlePreview/ArticlePreview";
import FollowUserButton from "components/FollowUserButton/FollowUserButton";
import Pagination from "components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentPage, getOffsetForPage, getPageCount } from "utils/pagination";

const PAGE_SIZE = 10;

const ProfilePage = () => {
    const { username: usernameParam } = useParams<{ username: string }>();
    const username = usernameParam ? decodeURIComponent(usernameParam) : "";

    const { user } = useAuth();
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        setOffset(0);
    }, [username]);

    const profileQuery = useQuery({
        queryKey: ["profile", username],
        queryFn: () => fetchProfile(username),
        enabled: Boolean(username),
    });

    const articlesQuery = useQuery({
        queryKey: ["articles", { author: username, limit: PAGE_SIZE, offset }],
        queryFn: () => fetchArticles({ author: username, limit: PAGE_SIZE, offset }),
        enabled: Boolean(username),
        keepPreviousData: true,
    });

    const profile = profileQuery.data;
    const articles = articlesQuery.data?.articles ?? [];
    const total = articlesQuery.data?.articlesCount ?? 0;
    const pageCount = getPageCount(total, PAGE_SIZE);
    const currentPage = getCurrentPage(offset, PAGE_SIZE);

    if (!username) {
        return (
            <>
                <div className="container page app-page--center">
                    <div className="app-empty">Profile not found.</div>
                </div>
            </>
        );
    }

    return (
        <div className="profile-page">
            {profileQuery.isLoading && (
                <div className="container page app-page--center">
                    <LoadingIndicator message="Loading profile…" />
                </div>
            )}
            {profileQuery.isError && (
                <div className="container page app-page--center">
                    <div className="app-alert" role="alert">
                        Could not load profile.
                    </div>
                </div>
            )}
            {profile && (
                <>
                    <div className="user-info">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-md-10 offset-md-1">
                                    <AuthorAvatar src={profile.image} className="user-img" />
                                    <h4>{profile.username}</h4>
                                    <p>{profile.bio || "—"}</p>
                                    <FollowUserButton
                                        className="action-btn"
                                        username={profile.username}
                                        displayName={profile.username}
                                        following={profile.following}
                                        hideWhenSelf
                                        currentUsername={user?.username ?? null}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <div className="articles-toggle">
                                    <ul className="nav nav-pills outline-active">
                                        <li className="nav-item">
                                            <span className="nav-link active">My Articles</span>
                                        </li>
                                    </ul>
                                </div>

                                {articlesQuery.isLoading && (
                                    <LoadingIndicator message="Loading articles…" />
                                )}

                                {(!articlesQuery.isLoading && articles.length === 0) && (
                                    <div className="app-empty">No articles are here… yet.</div>
                                )}

                                {articles.map((article) => (
                                    <ArticlePreview article={article} key={article.slug} />
                                ))}

                                <Pagination
                                    pageCount={pageCount}
                                    currentPage={currentPage}
                                    onPageChange={(page) => setOffset(getOffsetForPage(page, PAGE_SIZE))}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ProfilePage;