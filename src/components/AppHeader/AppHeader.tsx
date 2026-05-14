import { useAuth } from "auth/useAuth";
import { NavLink } from "react-router-dom";
import './AppHeader.css'
import AuthorAvatar from "components/AuthorAvatar/AuthorAvatar";
import { ROUTES } from "constants/routes";
const AppHeader = () => {
    const { user, logout } = useAuth();
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <NavLink className="navbar-brand" to={ROUTES.to.home}>
                    conduit
                </NavLink>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        {/* Add "active" class when you're on that page" */}
                        <NavLink className="nav-link active" to={ROUTES.to.home} end>
                            Home
                        </NavLink>
                    </li>
                    {user ?
                        <>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to={ROUTES.to.profile(user.username)}
                                >
                                    <AuthorAvatar src={user.image} className="user-pic" />
                                    Profile
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={ROUTES.to.editor} end>
                                    <i className="ion-compose" style={{ marginRight: 4 }} />
                                    New Article
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={ROUTES.to.settings} end>
                                    <i className="ion-gear-a" style={{ marginRight: 4 }} />
                                    Settings
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="nav-link app-header__logout-button"
                                    onClick={() => logout()}
                                >
                                    <i className="ion-log-out app-header__nav-icon" />
                                    Log out
                                </button>
                            </li>
                        </>
                        : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={ROUTES.to.login} end>
                                        Sign in
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={ROUTES.to.register} end>
                                        Sign up
                                    </NavLink>
                                </li>
                            </>

                        )
                    }
                </ul>
            </div>
        </nav>
    )
}

export default AppHeader;