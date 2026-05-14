import { Article } from "api/types/articleTypes";
import { useAuth } from "auth/useAuth";
import AuthorAvatar from "components/AuthorAvatar/AuthorAvatar";
import FavoriteArticleButton from "components/FavoriteArticleButton/FavoriteArticleButton";
import FollowUserButton from "components/FollowUserButton/FollowUserButton";
import { ROUTES } from "constants/routes";
import { Link } from "react-router-dom";
import { formatArticleDate } from "utils/formatDate";

interface ArticleMetaProps {
    article: Article;
};

const ArticleMeta = ({ article }: ArticleMetaProps) => {
    const { user } = useAuth();

    return (
        <div className={'article-meta'}>
            <Link to={ROUTES.to.profile(article.author.username)}>
                <AuthorAvatar src={article.author.image} />
            </Link>
            <div className="info">
                <Link to={ROUTES.to.profile(article.author.username)} className="author">
                    {article.author.username}
                </Link>
                <span className="date">{formatArticleDate(article.createdAt)}</span>
            </div>
            <FollowUserButton
                username={article.author.username}
                displayName={article.author.username}
                following={article.author.following}
                hideWhenSelf
                currentUsername={user?.username ?? null}
                articleSlug={article.slug}
            />
            <FavoriteArticleButton
                slug={article.slug}
                favorited={article.favorited}
                favoritesCount={article.favoritesCount}
            />
        </div>
    );
};

export default ArticleMeta;

