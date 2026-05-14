import { useQuery } from "@tanstack/react-query";
import { fetchArticle } from "api/conduitApi";
import { isAxiosError } from "axios";
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator";
import ArticleMeta from "components/ArticleMeta/ArticleMeta";
import CommentSection from "components/CommentSection/CommentSection";
import { useParams } from "react-router-dom";
import "./ArticlePage.css";

const ArticlePage = () => {
    const { slug: slugParam } = useParams<{ slug: string }>();
    const slug = slugParam ?? "";

    const {
        data: article,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["article", slug],
        queryFn: () => fetchArticle(slug),
        enabled: Boolean(slug),
    });

    const notFound =
        isError &&
        isAxiosError(error) &&
        (error.response?.status === 404 || error.response?.status === 422);

    if (!slug) {
        return (
            <div className="article-page">
                <div className="container page article-page__state">
                    <div className="app-empty">Article not found.</div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="article-page">
                <div className="container page article-page__state">
                    <LoadingIndicator message="Loading article…" />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="article-page">
                <div className="container page article-page__state">
                    <div className="app-alert" role="alert">
                        {notFound ? "Article not found." : "Could not load article."}
                    </div>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="article-page">
                <div className="container page article-page__state">
                    <div className="app-empty">Article not found.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{article.title}</h1>
                    <ArticleMeta article={article} />
                </div>
            </div>

            <div className="container page">
                <div className="row article-content">
                    <div className="col-md-12">
                        <div className="app-prose">{article.body}</div>
                    </div>
                </div>

                <hr />

                <div className="article-actions">
                    <ArticleMeta article={article} />
                </div>

                <CommentSection />
            </div>
        </div>
    );
};

export default ArticlePage;