import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "api/conduitApi";
import { isAxiosError } from "axios";
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator";
import ArticlePreview from "components/ArticlePreview/ArticlePreview";
import Pagination from "components/Pagination/Pagination";
import Tags from "components/Tags/Tags";
import { useState } from "react";
import { getCurrentPage, getOffsetForPage, getPageCount } from "utils/pagination";

const PAGE_SIZE = 10;

const ArticleListPage = () => {
    const [offset, setOffset] = useState(0);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["articles", { limit: PAGE_SIZE, offset }],
        queryFn: () => fetchArticles({ limit: PAGE_SIZE, offset }),
        keepPreviousData: true,
    });

    const articles = data?.articles ?? [];
    const total = data?.articlesCount ?? 0;
    const pageCount = getPageCount(total, PAGE_SIZE);
    const currentPage = getCurrentPage(offset, PAGE_SIZE);

    return (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <span className="nav-link disabled">
                                        Your Feed
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="">
                                        Global Feed
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {isLoading && (
                            <LoadingIndicator message="Loading articles…" />
                        )}

                        {isError && (
                            <div className="app-alert" role="alert">
                                {isAxiosError(error)
                                    ? error.message
                                    : error instanceof Error
                                        ? error.message
                                        : "Could not load articles."}
                            </div>
                        )}

                        {!isLoading && !isError && articles.length === 0 && (
                            <div className="app-empty">No articles are here… yet.</div>
                        )}

                        {articles.map((article) => (
                            <ArticlePreview article={article} key={article.slug} />
                        ))}
                    </div>

                    <Pagination
                        pageCount={pageCount}
                        currentPage={currentPage}
                        onPageChange={(page) => setOffset(getOffsetForPage(page, PAGE_SIZE))}
                    />

                    <Tags />
                </div>
            </div>
        </div>
    )
}

export default ArticleListPage;