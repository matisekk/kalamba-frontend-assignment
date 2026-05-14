import { Link } from "react-router-dom";

const RegisterPage = () => {
    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <div className="auth-card">
                            <h1 className="text-xs-center">Sign up</h1>
                            <p className="text-xs-center">
                                <Link to="/login">Have an account?</Link>
                            </p>

                            <form>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Your Name" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Email" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="password" placeholder="Password" />
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RegisterPage