import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteArticle, unfavoriteArticle } from "api/conduitApi";
import { useAuth } from "auth/useAuth";
import { isAxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
interface FavoriteArticleButtonProps {
    slug: string;
    favorited: boolean;
    favoritesCount: number;
    pullRight?: boolean;
}

const FavoriteArticleButton = ({
    slug,
    favorited,
    favoritesCount,
    pullRight,
}: FavoriteArticleButtonProps) => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();

    const favoriteMutation = useMutation({
        mutationFn: () => {
            return favorited ? unfavoriteArticle(slug) : favoriteArticle(slug);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["article", slug] });
            queryClient.invalidateQueries({ queryKey: ["articles"] });
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response?.status === 401) {
                logout(`/login?returnUrl=${encodeURIComponent(location.pathname + location.search)}`);
            }
        },
    });

    function handleClick() {
        if (!token) {
            navigate(`/login?returnUrl=${encodeURIComponent(location.pathname + location.search)}`);
            return;
        }

        favoriteMutation.mutate();
    }

    const colorClass = favorited ? "btn-primary" : "btn-outline-primary";
    const pullClass = pullRight ? " pull-xs-right" : "";

    return (
        <button
            type="button"
            className={`btn btn-sm ${colorClass}${pullClass}`}
            onClick={handleClick}
            disabled={favoriteMutation.isPending}
        >
            <i className="ion-heart" /> {favoritesCount}
        </button>
    );
}

export default FavoriteArticleButton;