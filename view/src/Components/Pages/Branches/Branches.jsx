import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import AddBranchModal from './AddBranchModal';

const Branches = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleConfirm = () => {
        setShowModal(!showModal);
    };

    const addBranch = () => {
        console.log('add');
    }

    return(
        <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Ձեր Ընկերության մասնաճուղերը</h4>
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
                                                    <th scope="col" style={{width: '50px'}}>
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="contacusercheck" />
                                                            <label className="custom-control-label" htmlFor="contacusercheck"></label>
                                                        </div>
                                                    </th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Position</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col" style={{width: '200px'}}>Action</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input" id="contacusercheck1" />
                                                                <label className="custom-control-label" htmlFor="contacusercheck1"></label>
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <img src="assets/images/users/avatar-2.jpg" alt="" className="avatar-xs rounded-circle mr-2" />
                                                            <a href="#" className="text-body">Simon Ryles</a>
                                                        </td>
                                                        <td>Full Stack Developer</td>
                                                        <td>SimonRyles@minible.com</td>
                                                        <td>
                                                            <ul className="list-inline mb-0">
                                                                <li className="list-inline-item">
                                                                    <a href="" className="px-2 text-primary" data-toggle="tooltip" data-placement="top" title="Edit"><i className="uil uil-pen font-size-18"></i></a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="" className="px-2 text-danger" data-toggle="tooltip" data-placement="top" title="Delete"><i className="uil uil-trash-alt font-size-18"></i></a>
                                                                </li>
                                                                <li className="list-inline-item dropdown">
                                                                    <a className="text-muted dropdown-toggle font-size-18 px-2" href="" role="button" data-toggle="dropdown" aria-haspopup="true">
                                                                        <i className="uil uil-ellipsis-v"></i>
                                                                    </a>
                                                                
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#">Action</a>
                                                                        <a className="dropdown-item" href="#">Another action</a>
                                                                        <a className="dropdown-item" href="#">Something else here</a>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input" id="contacusercheck2" />
                                                                <label className="custom-control-label" htmlFor="contacusercheck2"></label>
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <img src="assets/images/users/avatar-3.jpg" alt="" className="avatar-xs rounded-circle mr-2" />
                                                            <a href="#" className="text-body">Marion Walker</a>
                                                        </td>
                                                        <td>Frontend Developer</td>
                                                        <td>MarionWalker@minible.com</td>
                                                        <td>
                                                            <ul className="list-inline mb-0">
                                                                <li className="list-inline-item">
                                                                    <a href="" className="px-2 text-primary" data-toggle="tooltip" data-placement="top" title="Edit"><i className="uil uil-pen font-size-18"></i></a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="" className="px-2 text-danger" data-toggle="tooltip" data-placement="top" title="Delete"><i className="uil uil-trash-alt font-size-18"></i></a>
                                                                </li>
                                                                <li className="list-inline-item dropdown">
                                                                    <a className="text-muted dropdown-toggle font-size-18 px-2" href="" role="button" data-toggle="dropdown" aria-haspopup="true">
                                                                        <i className="uil uil-ellipsis-v"></i>
                                                                    </a>
                                                                
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#">Action</a>
                                                                        <a className="dropdown-item" href="#">Another action</a>
                                                                        <a className="dropdown-item" href="#">Something else here</a>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input" id="contacusercheck3" />
                                                                <label className="custom-control-label" htmlFor="contacusercheck3"></label>
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className="avatar-xs d-inline-block mr-2">
                                                                <div className="avatar-title bg-soft-primary rounded-circle text-primary">
                                                                    <i className="mdi mdi-account-circle m-0"></i>
                                                                </div>
                                                            </div>
                                                            <a href="#" className="text-body">Frederick White</a>
                                                        </td>
                                                        <td>UI/UX Designer</td>
                                                        <td>FrederickWhite@minible.com</td>
                                                        <td>
                                                            <ul className="list-inline mb-0">
                                                                <li className="list-inline-item">
                                                                    <a href="" className="px-2 text-primary" data-toggle="tooltip" data-placement="top" title="Edit"><i className="uil uil-pen font-size-18"></i></a>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <a href="" className="px-2 text-danger" data-toggle="tooltip" data-placement="top" title="Delete"><i className="uil uil-trash-alt font-size-18"></i></a>
                                                                </li>
                                                                <li className="list-inline-item dropdown">
                                                                    <a className="text-muted dropdown-toggle font-size-18 px-2" href="" role="button" data-toggle="dropdown" aria-haspopup="true">
                                                                        <i className="uil uil-ellipsis-v"></i>
                                                                    </a>
                                                                
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#">Action</a>
                                                                        <a className="dropdown-item" href="#">Another action</a>
                                                                        <a className="dropdown-item" href="#">Something else here</a>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                      </tr>                                                                                             
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-sm-6">
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="float-sm-right">
                                                    <ul className="pagination mb-sm-0">
                                                        <li className="page-item">
                                                            <a href="#" className="page-link"><FontAwesomeIcon icon={faChevronLeft} /></a>
                                                        </li>
                                                        <li className="page-item">
                                                            <a href="#" className="page-link">1</a>
                                                        </li>
                                                        <li className="page-item active">
                                                            <a href="#" className="page-link">2</a>
                                                        </li>
                                                        <li className="page-item">
                                                            <a href="#" className="page-link">3</a>
                                                        </li>
                                                        <li className="page-item">
                                                            <a href="#" className="page-link"><FontAwesomeIcon icon={faChevronRight} /></a>
                                                        </li>
                                                    </ul>
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
                                 © Minible.
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
                    <AddBranchModal
                        onSubmit={addBranch}
                        onCancel={toggleConfirm}
                    />
                }
            </div>
    );
}

export default Branches;