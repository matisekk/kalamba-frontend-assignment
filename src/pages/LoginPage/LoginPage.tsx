import { useAuth } from "auth/useAuth";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError("Invalid email or password.");
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <div className="auth-card">
                            <h1 className="text-xs-center">Sign in</h1>

                            {error && (
                                <ul className="error-messages">
                                    <li>{error}</li>
                                </ul>
                            )}

                            <form onSubmit={handleSubmit}>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(ev) => setEmail(ev.target.value)}
                                        required
                                        autoComplete="email"
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(ev) => setPassword(ev.target.value)}
                                        required
                                        autoComplete="current-password"
                                    />
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right" type="submit" disabled={isLoading}>
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginPage;