import React, { useState, useEffect } from 'react';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddWorkerModal from './AddWorkerModal';
import axios from 'axios';
import { URL } from '../../../config/config';

const Workers = () => {
    const [showModal, setShowModal] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [workers, setWorkers] = useState([]);

    var token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    useEffect(() => {
        axios.get(`${URL}/worker/my-workers`, config)
            .then((res) => {
                console.log('my workers', res);
                setWorkers(res.data);
            })
            .catch(err => console.log(err.response))
    }, []);

    const toggleConfirm = () => {
        setShowModal(!showModal);
        setErrMessage('');
    };

    const removeChecked = () => {

    };

    const addWorker = (data) => {
        console.log('add', data);
        axios.post(`${URL}/worker/add`, data, config)
            .then((res) => {
                console.log('worker', res);
                setWorkers([res.data, ...workers]);
                setShowModal(false);
            })
            .catch(err => {
                console.log('branch', err.response.data.error);
                setErrMessage(err.response.data.error);
            });
    };

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Աշխատակիղներ</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="">Contacts</a></li>
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
                                                                    <input 
                                                                        type="checkbox" 
                                                                        className="custom-control-input"
                                                                        id={worker.id}
                                                                    />
                                                                    <label className="custom-control-label" htmlFor={worker.id}></label>
                                                                </div>
                                                            </th>
                                                            <td>
                                                                <a href="#" className="text-body"> {worker.fullName} </a>
                                                            </td>
                                                            <td> {worker.branchId} </td>
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
                                    <div className="row mt-4">
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
                                    </div>
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
                                Crafted with <i className="mdi mdi-heart text-danger"></i> by <a href="https://themesbrand.com/" target="_blank" className="text-reset">Themesbrand</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {showModal &&
                <AddWorkerModal
                    onSubmit={addWorker}
                    onCancel={toggleConfirm}
                    message={errMessage}
                />
            }
        </div>
    );
};

export default Workers;