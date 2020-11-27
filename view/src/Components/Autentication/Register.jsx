import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = (props) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPossword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmError, setConfirmError] = useState(false);
    const [passLenghtErr, setPassLenghtErr] = useState(false);
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const sendDate = () => {
        console.log(name, lastName, email, companyName, password, confirmPassword);
        if(password !== confirmPassword){
            setConfirmError(true);
        }
        else if(password.length < 6){
            setPassLenghtErr(true);
        }
        else{
            setConfirmError(false);
            setPassLenghtErr(false);
            axios.post(
                'http://localhost:5000/register', 
                { name, lastName, email, companyName, password, confirmPassword }
            )
            .then((res) => {
                console.log('register', res);
                setMessage(res.data.message);
                setErrorMessage(null);
            })
            .catch((err) => {
                console.log('register err', err.response);
                setErrorMessage(err.response.data.message);
            })
        };

    } 
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
                                        <h5 className="text-primary">Գրանցել հաշիվ</h5>
                                        <p className="text-muted">Ստացեք ձեր անվճար BPA հաշիվը հիմա</p>
                                    </div>
                                    <div className="p-2 mt-4">
                                        <form onSubmit={(e) => {e.preventDefault(); sendDate()}}>
                                            <div className="form-group">
                                                <label htmlFor="name">Անուն</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="name" 
                                                    placeholder="Enter name"
                                                    value={name} 
                                                    onChange={(e) => setName(e.target.value)}
                                                    required={true}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="lastname">Ազգանուն</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="lastname" 
                                                    placeholder="Enter lastname"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    required={true}
                                                />
                                            </div>

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
                                                <label htmlFor="companyName">Ընկեության Անվանումը</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="companyName" 
                                                    placeholder="Enter company name"
                                                    value={companyName}
                                                    onChange={(e) => setCompanyName(e.target.value)}
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

                                            <div className="form-group">
                                                <label htmlFor="confirmPassword">Կրկնեք Գաղտնաբառը</label>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    id="confirmPassword" 
                                                    placeholder="confirm Password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required={true}
                                                    style={{ border: `${confirmError || passLenghtErr ? '2px solid red' : '1px solid #ced4da'}`}}
                                                />
                                                {
                                                    confirmError ? <p className='text-danger mt-2'>Սխալ կրկնություն</p> : null
                                                }
                                                {
                                                    passLenghtErr ? <p className='text-danger mt-2'>Նվազագույնը 6 սիմվոլ</p> : null
                                                }
                                                {
                                                    message ? <p className='text-success mt-2'> {message} </p> : null
                                                }
                                                {
                                                    errorMessage ? <p className='text-danger mt-2'> {errorMessage} </p> : null
                                                }
                                            </div>

                                            <div className="mt-3 text-right">
                                                <button className="btn btn-primary w-sm waves-effect waves-light" type="submit">Register</button>
                                            </div>

                                            <div className="mt-4 text-center">
                                                <p className="text-muted mb-0">Արդեն ունեք հաշիվ ?<Link to="/" className="font-weight-medium text-primary"> Մուտք</Link></p>
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

export default Register;