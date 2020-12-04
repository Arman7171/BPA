import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddBranchModal from './AddBranchModal';
import { URL } from '../../../config/config';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Branches = () => {
    const [showModal, setShowModal] = useState(false);
    const [branches, setBranches] = useState([]);
    const [errMessage, setErrMessage] = useState('');
    const [checkedBranches, setCheckedBranches] = useState(new Set());

    var token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    useEffect(() => {
        axios.get(`${URL}/branch/my-branches`, config)
            .then((res) => {
                console.log('my branches', res);
                setBranches(res.data);
            })
            .catch(err => console.log(err.response))
    }, []);

    const toggleConfirm = () => {
        setShowModal(!showModal);
        setErrMessage('');
    };

    const addBranch = (data) => {
        console.log('add', data);
        axios.post(`${URL}/branch/add`, data, config)
            .then((res) => { 
                console.log('branch', res);
                setBranches([ res.data, ...branches]);
                setShowModal(false); 
            })
            .catch(err => {
                console.log('branch', err.response.data.error);
                setErrMessage(err.response.data.error);
            });
    };

    const handleCheck = (id) => {
        var checkedb = new Set(checkedBranches);
        if (checkedb.has(id)) {
            checkedb.delete(id);
        } else checkedb.add(id);
        setCheckedBranches(checkedb);
    };

    const removeChecked = () => {
        console.log([...checkedBranches]);
        var data = [...checkedBranches];
        const checkedb = new Set(checkedBranches);
        var otherBranches = [...branches];
        axios.patch(`${URL}/branch/delete`,data, config)
            .then((res) => { 
                console.log('branch', res);
                checkedb.forEach(id => {
                    console.log('id', id);
                    otherBranches = otherBranches.filter((branch) => branch.id !== id);
                });
                checkedb.clear();
                setCheckedBranches(checkedb);
                setBranches(otherBranches);
            })
            .catch(err => {
                console.log('branch', err.response.data.error);
            });
    };


    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Մասնաճուղեր</h4>
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
                                                    <FontAwesomeIcon icon={faPlus} /> Ավելացնել մասնաճուղ
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
                                                    branches.map((branch, index) => {
                                                        return (
                                                            <tr key={branch.id}>
                                                                <th scope="row">
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input 
                                                                            type="checkbox" 
                                                                            className="custom-control-input"
                                                                            onClick={() => handleCheck(branch.id)}
                                                                            id={branch.id}
                                                                        />
                                                                        <label className="custom-control-label" htmlFor={branch.id}></label>
                                                                    </div>
                                                                </th>
                                                                <td>
                                                                    <Link to="#" className="text-body"> {branch.branchName} </Link>
                                                                </td>
                                                                <td> {branch.addres} </td>
                                                                <td> {branch.vat} </td>
                                                                <td> {new Date(branch.createdAt).toLocaleString()} </td>
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
                                                    disabled={checkedBranches.size ? false : true}
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
                                Crafted with <i className="mdi mdi-heart text-danger"></i> by <Link to="https://themesbrand.com/" target="_blank" className="text-reset">Themesbrand</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {showModal &&
                <AddBranchModal
                    onSubmit={addBranch}
                    onCancel={toggleConfirm}
                    message={errMessage}
                />
            }
        </div>
    );
}

export default Branches;