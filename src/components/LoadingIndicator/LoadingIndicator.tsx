import "./LoadingIndicator.css";

type LoadingIndicatorProps = {
    message: string;
    className?: string;
    fullPage?: boolean;
};

const LoadingIndicator = ({ message, className, fullPage }: LoadingIndicatorProps) => (
    <div
        className={["app-loading", fullPage ? "app-loading--full-page" : "", className].filter(Boolean).join(" ")}
        role="status"
        aria-live="polite"
    >
        <span className="app-spinner" aria-hidden />
        <span>{message}</span>
    </div>
);

export default LoadingIndicator;
