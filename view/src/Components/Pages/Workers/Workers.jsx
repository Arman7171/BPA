import React, { useState, useEffect } from 'react';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddWorkerModal from './AddWorkerModal';
import DeleteWorkerModal from './DeleteWorkerModal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWorkers, addWorker, removeWorker } from "../../../Store/Activity/activityActions";

const Workers = ({getWorkers, addWorker, workers, errorMessage, addWorkerSuccess, removeWorker, removeWorkerSuccess}) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [fullName, setFullName] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        getWorkers();
    }, []);

    useEffect(() => {
        if(!addWorkerSuccess){
            setShowModal(false);
        }
        if(!removeWorkerSuccess){
            setShowDeleteModal(false);
        }
    }, [addWorkerSuccess, removeWorkerSuccess]);

    const toggleConfirm = () => {
        setShowModal(!showModal);
    };

    const showdeleteModal = (id, fullName) => {
        setId(id);
        setFullName(fullName);
        setShowDeleteModal(!showDeleteModal);
    };

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Աշխատակիցներ</h4>
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
                                                    <FontAwesomeIcon icon={faPlus} /> Ավելացնել աշխատակցի
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
                                                    <th scope="col">Անուն</th>
                                                    <th scope="col">Մասնաճյուղ</th>
                                                    <th scope="col">Աշխատավարձ</th>
                                                    <th scope="col">Դրույք</th>
                                                    <th scope="col">Գրանցման օր</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                workers.map((worker,) => {
                                                    return (
                                                        <tr key={worker.id}>
                                                            <th scope="row">
                                                                <div className="custom-control custom-checkbox">
                                                                    <h6 
                                                                        className='text-danger'
                                                                        style={{cursor: 'pointer'}} 
                                                                        onClick={() => showdeleteModal(worker.id, worker.fullName)}
                                                                    >
                                                                        Հեռացնել
                                                                    </h6>
                                                                </div>
                                                            </th>
                                                            <td>
                                                                <Link to={`/profile/${worker.id}`} className="text-body"> {worker.fullName} </Link>
                                                            </td>
                                                            <td> {worker.branchAddres} </td>
                                                            <td> {worker.salary} </td>
                                                            <td> {worker.rate} </td>
                                                            <td> {new Date(worker.createdAt).toLocaleString()} </td>
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
                <AddWorkerModal
                    onSubmit={addWorker}
                    onCancel={toggleConfirm}
                    message={errorMessage}
                />
            }
            {
                showDeleteModal &&
                <DeleteWorkerModal
                    onSubmit={removeWorker}
                    onCancel={showdeleteModal}
                    id={id}
                    fullname={fullName}
                />
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        workers: state.activityReducer.workers,
        addWorkerSuccess: state.activityReducer.addWorkerSuccess,
        errorMessage: state.activityReducer.errorMessage,
        removeWorkerSuccess: state.activityReducer.removeWorkerSuccess
    }
};

const mapDispatchToProps={
    getWorkers,
    addWorker,
    removeWorker
};

export default connect(mapStateToProps, mapDispatchToProps)(Workers);