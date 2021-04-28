import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddBranchModal from './AddBranchModal';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBranches, addBranch, removeBranch } from '../../../Store/Activity/activityActions';

const Branches = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [checkedBranches, setCheckedBranches] = useState(new Set());
    const { branches } = props;

    useEffect(() => {
        props.getBranches();
    }, []);

    useEffect(() => {
        if(!props.addBranchSuccess){
            setShowModal(false);
        }
    }, [props.addBranchSuccess]);

    const toggleConfirm = () => {
        setShowModal(!showModal);
    };

    const addBranchs = (data) => {
        props.addBranch(data);
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
        props.removeBranch(data);
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
                                        <li className="breadcrumb-item"><Link to="">Մասնաճուղեր</Link></li>
                                        <li className="breadcrumb-item active">BPA</li>
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
                                                                    <Link to={`branchInfo/${branch.id}`} className="text-body"> {branch.branchName} </Link>
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
                    onSubmit={addBranchs}
                    onCancel={toggleConfirm}
                    message={props.errorMessage}
                />
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return{
        branches: state.activityReducer.branches,
        addBranchSuccess: state.activityReducer.addBranchSuccess,
        errorMessage: state.activityReducer.errorMessage
    }
}

const mapDispatchToProps = {
    getBranches,
    addBranch,
    removeBranch
};

export default connect(mapStateToProps, mapDispatchToProps)(Branches);