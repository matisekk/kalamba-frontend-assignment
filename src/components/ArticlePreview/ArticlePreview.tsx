import { Article } from "api/types/articleTypes";
import AuthorAvatar from "components/AuthorAvatar/AuthorAvatar";
import FavoriteArticleButton from "components/FavoriteArticleButton/FavoriteArticleButton";
import { ROUTES } from "constants/routes";
import { Link } from "react-router-dom";
import { formatArticleDate } from "utils/formatDate";

interface ArticlePreviewProps {
    article: Article;
};

const ArticlePreview = ({ article }: ArticlePreviewProps) => {
    return (
        <div className="article-preview">
            <div className="article-meta">
                <Link to={ROUTES.to.profile(article.author.username)}>
                    <AuthorAvatar src={article.author.image} />
                </Link>
                <div className="info">
                    <Link to={ROUTES.to.profile(article.author.username)} className="author">
                        {article.author.username}
                    </Link>
                    <span className="date">{formatArticleDate(article.createdAt)}</span>
                </div>
                <FavoriteArticleButton
                    slug={article.slug}
                    favorited={article.favorited}
                    favoritesCount={article.favoritesCount}
                    pullRight
                />
            </div>
            <Link to={ROUTES.to.article(article.slug)} className="preview-link">
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <span>Read more...</span>
            </Link>
        </div>
    );
};

export default ArticlePreview;

