import { DEFAULT_AUTHOR_IMAGE } from "constants/placeholders";

interface AuthorAvatarProps {
    src: string | undefined | null;
    alt?: string;
    className?: string;
};

export default function AuthorAvatar({ src, alt = "", className }: AuthorAvatarProps) {
    const resolved = src && src.trim() ? src : DEFAULT_AUTHOR_IMAGE;
    return <img src={resolved} alt={alt} className={className} />;
}
