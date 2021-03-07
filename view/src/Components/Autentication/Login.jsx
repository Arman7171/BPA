import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { signIn } from "../../Store/Auth/authActions";
import { history } from "../../helpers/history";

const Login = ({signIn, errorMessage, isAuthenticated}) => {
    const [email, setEmail] = useState('');
    const [password, setPossword] = useState('');
    const [status, ] = useState( new URLSearchParams(window.location.search).get("status"));

    useEffect(() => {
        if(isAuthenticated){
            history.push('/dashboard')
        }
    }, [isAuthenticated]);

    return (
        <div className='authentication-bg'>
            <div className="account-pages pt-sm-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <a href="index-2.html" className="mb-5 d-block auth-logo">
                                    <img src="assets/images/logo-dark.png" alt="" height="22" className="logo logo-dark" />
                                    <img src="assets/images/logo-light.png" alt="" height="22" className="logo logo-light" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="card">

                                <div className="card-body p-4">
                                    <div className="text-center mt-2">
                                        <h5 className="text-primary">Բարի վերադարձ !</h5>
                                        <p className="text-muted">Մուտք գործեք՝ BPA անցնելու համար․</p>
                                        {
                                            status ?
                                            <p className='text-success'>Դուք բարեհաջող գրանցվեցիք</p> : null
                                        }
                                    </div>
                                    <div className="p-2 mt-4">
                                        <form onSubmit={(e) => {e.preventDefault(); signIn({email, password})}}>

                                            <div className="form-group">
                                                <label htmlFor="useremail">Էլէկտրոնային հասցէ</label>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    id="useremail" 
                                                    placeholder="Enter email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required={true}
                                                />
                                            </div>

                                            <div className="form-group">
                                            <label htmlFor="userpassword">Գաղտնաբառ</label>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    id="userpassword" 
                                                    placeholder="Enter password"
                                                    value={password}
                                                    onChange={(e) => setPossword(e.target.value)}
                                                    required={true}
                                                />
                                            </div>
                                            {
                                                errorMessage ? <p className='text-danger mt-2'> {errorMessage} </p> : null
                                            }
                                            <div className="float-left">
                                                <a href="auth-recoverpw.html" className="text-muted">Մոռացե՞լ եք գաղտնաբառը</a>
                                            </div>

                                            <div className="mt-3 text-right">
                                                <button className="btn btn-primary w-sm waves-effect waves-light" type="submit">Մուտք</button>
                                            </div>


                                            <div className="mt-4 text-center">
                                                <p className="mb-0">Հաշիվ չունեք ? <Link to='/registration' className="font-weight-medium text-primary"> Գրանցվել հիմա </Link></p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return{
        errorMessage: state.authReducer.errorMessage,
        isAuthenticated: state.authReducer.isAuthenticated
    }
};

const mapDispatchToProps = {
    signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);