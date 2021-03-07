import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddProviderModal from './AddProviderModal';
import DeleteProviderModal from './DeleteProviderModal';
import { connect } from 'react-redux';
import { getProviders, addProvider, removeProvider } from "../../../Store/Activity/activityActions";

const Providers = ({getProviders, providers, addProviderSuccess, removeProviderSuccess, errorMessage, addProvider, removeProvider}) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [name, setName] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        getProviders();
    }, []);

    useEffect(() => {
        if(!addProviderSuccess){
            setShowModal(false);
        }
        if(!removeProviderSuccess){
            setShowDeleteModal(false);
        }
    }, [addProviderSuccess, removeProviderSuccess]);

    const toggleConfirm = () => {
        setShowModal(!showModal);
    };

    const showdeleteModal = (id, name) => {
        setId(id);
        setName(name);
        setShowDeleteModal(!showDeleteModal);
    }

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Մատակարարները</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="">Contacts</Link></li>
                                        <li className="breadcrumb-item active">User List</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row mb-2">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <button
                                                    className="btn btn-success waves-effect waves-light"
                                                    onClick={() => toggleConfirm()}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} /> Ավելացնել մատակարարի
                                                    </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-inline float-md-right mb-3">
                                                <div className="search-box ml-2">
                                                    <div className="position-relative d-flex align-items-center">
                                                        <input type="text" className="form-control rounded bg-light border-0" placeholder="Search..." />
                                                        <FontAwesomeIcon className='search-icon' icon={faSearch} />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                    <div className="table-responsive mb-4">
                                        <table className="table table-centered table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <input type="checkbox" className="custom-control-input" />
                                                    </th>
                                                    <th scope="col">Անվանումը</th>
                                                    <th scope="col">Հասցե</th>
                                                    <th scope="col">ՀՎՀՀ</th>
                                                    <th scope="col">Ստեղծման ամսեթիվ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    providers.map((provider, index) => {
                                                        return (
                                                            <tr key={provider.id}>
                                                                <th scope="row">
                                                                <div className="custom-control custom-checkbox">
                                                                    <h6 
                                                                        className='text-danger'
                                                                        style={{cursor: 'pointer'}} 
                                                                        onClick={() => showdeleteModal(provider.id, provider.providerName)}
                                                                    >
                                                                        Հեռացնել
                                                                    </h6>
                                                                </div>
                                                                </th>
                                                                <td>
                                                                    <Link to="#" className="text-body"> {provider.providerName} </Link>
                                                                </td>
                                                                <td> {provider.addres} </td>
                                                                <td> {provider.vat} </td>
                                                                <td> {new Date(provider.createdAt).toLocaleString()} </td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <div className="row mt-4">
                                        <div className="col-sm-6">
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="float-sm-right">
                                                <button 
                                                    className='btn btn-danger'
                                                    onClick={removeChecked}
                                                    disabled={checkedBranches.size ? false : true}
                                                >Ջնջել ընտրվածները</button>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            © BPA.
                            </div>
                        <div className="col-sm-6">
                            <div className="text-sm-right d-none d-sm-block">
                                Crafted with <i className="mdi mdi-heart text-danger"></i> by <Link to="https://themesbrand.com/" target="_blank" className="text-reset">Themesbrand</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {showModal &&
                <AddProviderModal
                    onSubmit={addProvider}
                    onCancel={toggleConfirm}
                    message={errorMessage}
                />
            }
            {
                showDeleteModal &&
                <DeleteProviderModal
                    onSubmit={removeProvider}
                    onCancel={showdeleteModal}
                    id={id}
                    name={name}
                />
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return{
        providers: state.activityReducer.providers,
        addProviderSuccess: state.activityReducer.addProviderSuccess,
        errorMessage: state.activityReducer.errorMessage,
        removeProviderSuccess: state.activityReducer.removeProviderSuccess
    }
};

const mapDispatchToProps = {
    getProviders,
    addProvider,
    removeProvider
}

export default connect(mapStateToProps, mapDispatchToProps)(Providers);