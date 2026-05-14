import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "auth/useAuth";
import { followUser, unfollowUser } from "api/conduitApi";
interface FollowUserButtonProps {
    username: string;
    displayName: string;
    following: boolean;
    hideWhenSelf?: boolean;
    currentUsername?: string | null;
    articleSlug?: string;
    className?: string;
}

const FollowUserButton = ({
    username,
    displayName,
    following,
    hideWhenSelf,
    currentUsername,
    articleSlug,
    className,
}: FollowUserButtonProps) => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();

    const followMutation = useMutation({
        mutationFn: () => {
            return following ? unfollowUser(username) : followUser(username);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile", username] });
            queryClient.invalidateQueries({ queryKey: ["articles"] });

            if (articleSlug) {
                queryClient.invalidateQueries({ queryKey: ["article", articleSlug] });
            } else {
                queryClient.invalidateQueries({ queryKey: ["article"] });
            }
        },
    });

    if (hideWhenSelf && currentUsername === username) {
        return null;
    }

    function handleClick() {
        if (!token) {
            navigate(`/login?returnUrl=${encodeURIComponent(location.pathname + location.search)}`);
            return;
        }

        followMutation.mutate();
    }

    const colorClass = following ? "btn-secondary" : "btn-outline-secondary";

    return (
        <button
            type="button"
            className={`btn btn-sm ${colorClass} ${className}`.trim()}
            onClick={handleClick}
            disabled={followMutation.isPending}
        >
            <i className="ion-plus-round" />
            &nbsp; {following ? "Unfollow" : "Follow"} {displayName}
        </button>
    );
}

export default FollowUserButton