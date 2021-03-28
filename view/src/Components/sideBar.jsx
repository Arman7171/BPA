import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCodeBranch, faUsers, faFileImport, faFileExport, faUserFriends, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

const SideBar = ({ userType }) => {
    return (
        <div className="vertical-menu">

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
            {/* 
        <button type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn">
            <i className="fa fa-fw fa-bars"></i>
        </button> */}

            <div data-simplebar className="sidebar-menu-scroll">

                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">Menu</li>

                        <li>
                            <Link to='/dashboard'>
                                <FontAwesomeIcon className='mr-2' icon={faHome} />
                                <span className='sidebar-items'>Աշխատասենյակ</span>
                            </Link>
                        </li>
                        {
                            !userType ?
                                <>
                                    <li>
                                        <Link to='/workers'>
                                            <FontAwesomeIcon className='mr-2' icon={faUserFriends} />
                                            <span className='sidebar-items'>Աշխատակիցներ</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/branches'>
                                            <FontAwesomeIcon className='ml-2' icon={faCodeBranch} />
                                            <span className='sidebar-items'>Մասնաճյուղեր</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/providers'>
                                            <FontAwesomeIcon className='mr-2' icon={faUsers} />
                                            <span className='sidebar-items'>Մատակարարներ</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/products'>
                                            <FontAwesomeIcon className='mr-2' icon={faShoppingCart} />
                                            <span className='sidebar-items'>Ապրանքներ</span>
                                        </Link>
                                    </li>
                                </>
                                : null
                        }
                        <li>
                            <Link to='/productImports'>
                                <FontAwesomeIcon className='mr-2' icon={faFileImport} />
                                <span className='sidebar-items'>Մուտքեր</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={!userType ? '/exports' : '/productExports'}>
                                <FontAwesomeIcon className='ml-1' icon={faFileExport} />
                                <span className='sidebar-items'>Ելքեր</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userType: state.authReducer.userType
    }
}

export default connect(mapStateToProps, null)(SideBar);