import { useAuth } from "auth/useAuth";
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator";
import { ROUTES } from "constants/routes";
import ArticleListPage from "pages/ArticleListPage/ArticleListPage";
import ArticlePage from "pages/ArticlePage/ArticlePage";
import EditorPage from "pages/EditorPage/EditorPage";
import LoginPage from "pages/LoginPage/LoginPage";
import ProfilePage from "pages/ProfilePage/ProfilePage";
import RegisterPage from "pages/RegisterPage/RegisterPage";
import SettingsPage from "pages/SettingsPage/SettingsPage";
import { Navigate, Route, Routes } from "react-router-dom";

const RouteProvider = () => {
    const { ready } = useAuth()
    if (!ready) {
        return (
            <div className="container page app-page--center">
                <LoadingIndicator message="Loading…" />
            </div>
        );
    }
    return (
        <Routes>
            <Route path={ROUTES.paths.login} element={<LoginPage />} />
            <Route path={ROUTES.paths.register} element={<RegisterPage />} />

            <Route path={ROUTES.paths.home} element={<ArticleListPage />} />
            <Route path={ROUTES.paths.article} element={<ArticlePage />} />

            <Route path={ROUTES.paths.profile} element={<ProfilePage />} />

            <Route path={ROUTES.paths.settings} element={<SettingsPage />} />

            <Route path={ROUTES.paths.editor} element={<EditorPage />} />

            <Route path={ROUTES.paths.otherPath} element={<Navigate to={ROUTES.to.home} replace />} />
        </Routes>
    )
}


export default RouteProvider;