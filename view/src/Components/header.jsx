import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getUserInfo } from "../Store/Auth/authActions";

const Header = ({getUserInfo, name, lastName}) => {

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <header id="page-topbar">
        <div className="navbar-header">
            <div className="d-flex">
                <div className="navbar-brand-box">
                    <Link to="index-2.html" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src="/assets/images/logo-sm.png" alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src="/assets/images/logo-dark.png" alt="" height="20" />
                        </span>
                    </Link>

                    <Link to="index-2.html" className="logo logo-light">
                        <span className="logo-sm">
                            <img src="/assets/images/logo-sm.png" alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src="/assets/images/logo-light.png" alt="" height="20" />
                        </span>
                    </Link>
                </div>

                <button type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn">
                    <i className="fa fa-fw fa-bars"></i>
                </button>
            </div>

            <div className="d-flex">
                <div className="dropdown d-inline-block">
                    <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className="rounded-circle header-profile-user" src="/assets/images/users/avatar-6.jpg"
                            alt="Header Avatar" />
                        <span className="text-white d-xl-inline-block ml-1 font-weight-medium font-size-15"> {name} {lastName} </span>
                        <i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to="#"><i className="uil uil-user-circle font-size-18 align-middle text-muted mr-1"></i> <span className="align-middle">View Profile</span></Link>
                        <Link className="dropdown-item" to="#"><i className="uil uil-wallet font-size-18 align-middle mr-1 text-muted"></i> <span className="align-middle">My Wallet</span></Link>
                        <Link className="dropdown-item d-block" to="#"><i className="uil uil-cog font-size-18 align-middle mr-1 text-muted"></i> <span className="align-middle">Settings</span> <span className="badge badge-soft-success badge-pill mt-1 ml-2">03</span></Link>
                        <Link className="dropdown-item" to="#"><i className="uil uil-lock-alt font-size-18 align-middle mr-1 text-muted"></i> <span className="align-middle">Lock screen</span></Link>
                        <a 
                            className="dropdown-item" 
                            href="/"
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('type');
                            }}
                        >
                            <i className="uil uil-sign-out-alt font-size-18 align-middle mr-1 text-muted"></i> 
                            <span className="align-middle">
                                Sign out
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    );
}

const mapStateToProps = (state) =>{
    return{
        name: state.authReducer.name,
        lastName: state.authReducer.lastName
    }
};

const mapDispatchToProps = {
    getUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);