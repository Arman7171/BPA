import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header id="page-topbar">
        <div className="navbar-header">
            <div className="d-flex">
                <div className="navbar-brand-box">
                    <a href="index-2.html" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src="assets/images/logo-sm.png" alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src="assets/images/logo-dark.png" alt="" height="20" />
                        </span>
                    </a>

                    <a href="index-2.html" className="logo logo-light">
                        <span className="logo-sm">
                            <img src="assets/images/logo-sm.png" alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src="assets/images/logo-light.png" alt="" height="20" />
                        </span>
                    </a>
                </div>

                <button type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn">
                    <i className="fa fa-fw fa-bars"></i>
                </button>
                <form className="app-search d-none d-lg-block">
                    <div className="position-relative">
                    <button className='btn btn-light'><Link to='/branches'>Ավելացնել մասնաճուղ</Link></button>

                    </div>
                </form>
            </div>

            <div className="d-flex">
                <div className="dropdown d-inline-block">
                    <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className="rounded-circle header-profile-user" src="assets/images/users/avatar-4.jpg"
                            alt="Header Avatar" />
                        <span className="text-white d-xl-inline-block ml-1 font-weight-medium font-size-15">Marcus</span>
                        <i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#"><i className="uil uil-user-circle font-size-18 align-middle text-muted mr-1"></i> <span className="align-middle">View Profile</span></a>
                        <a className="dropdown-item" href="#"><i className="uil uil-wallet font-size-18 align-middle mr-1 text-muted"></i> <span className="align-middle">My Wallet</span></a>
                        <a className="dropdown-item d-block" href="#"><i className="uil uil-cog font-size-18 align-middle mr-1 text-muted"></i> <span className="align-middle">Settings</span> <span className="badge badge-soft-success badge-pill mt-1 ml-2">03</span></a>
                        <a className="dropdown-item" href="#"><i className="uil uil-lock-alt font-size-18 align-middle mr-1 text-muted"></i> <span className="align-middle">Lock screen</span></a>
                        <a className="dropdown-item" href="#"><i className="uil uil-sign-out-alt font-size-18 align-middle mr-1 text-muted"></i> <span className="align-middle">Sign out</span></a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    );
}

export default Header;