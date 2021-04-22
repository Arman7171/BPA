import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStoreProducts, getProductsCount } from '../../../Store/Products/productActions';
import { getBranches } from "../../../Store/Activity/activityActions";
import Transportation from "./Transportation";

const Store = ({getStoreProducts, products, getBranches, branches, productCount}) => {

    const [limit, setLimit] = useState(8);
    const [offset, setOffest] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [productName, setProductName] = useState('');
    const [allCount, setAllCount] = useState(0);
    const [QR, setQR] = useState('');

    useEffect(() => {
        getBranches();
        getStoreProducts(limit, offset);
    }, []);

    const loadMore = () => {
        getStoreProducts(limit+8, offset+8);
        setLimit(limit+8);
        setOffest(offset+8);
    }

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const ShowModal = (product, Qr, count) => {
        console.log(product, Qr);
        setProductName(product);
        setQR(Qr);
        setAllCount(count);
        toggleModal();
    }


    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Ապրանքներ</h4>
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
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-inline float-md-right mb-3">
                                                <div className="search-box ml-2">
                                                    <div className="position-relative d-flex align-items-center">
                                                        <input type="text" className="form-control rounded bg-light border-0" placeholder="Search..." />
                                                        <FontAwesomeIcon className='search-icon text-dark' icon={faSearch} />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                    <div className="table-responsive mb-4">
                                        <table className="table table-centered table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Անվանումը</th>
                                                    <th scope="col">QR</th>
                                                    <th scope="col">Քանակ</th>
                                                    <th scope="col">Գին</th>
                                                    <th scope="col">Ստեղծման ամսեթիվ</th>
                                                    <th scope="col">Վերջին թարմացում</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    products.map((product) => {
                                                        return (
                                                            <tr key={product.id}>
                                                                <td>
                                                                    <Link to="#" className="text-body"> {product.productName} </Link>
                                                                </td>
                                                                <td> {product.QRproduct} </td>
                                                                <td> {product.count} {product.unit} </td>
                                                                <td> {product.price} </td>
                                                                <td> {new Date(product.createdAt).toLocaleString()} </td>
                                                                <td> {new Date(product.updatedAt).toLocaleString()} </td>
                                                                <td> 
                                                                    <FontAwesomeIcon 
                                                                        icon={faArrowRight} 
                                                                        role="button" 
                                                                        onClick={()=>{ShowModal(product.productName, product.QRproduct, product.count)}} 
                                                                    />
                                                                </td>
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
                                        {
                                            productCount>=8 && limit<productCount ?
                                            <div className="col-sm-6">
                                            <div className="float-sm-right">
                                                <button className='btn btn-success' onClick={() => loadMore()}>Բեռնել ավելին</button>
                                            </div>
                                        </div>
                                        : null
                                        }
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
                <Transportation
                    onCancel={toggleModal}
                    productname={productName}
                    qr={QR}
                    branches={branches}
                    allcount={allCount}
                />
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return{
        products: state.productReducer.products,
        productCount: state.productReducer.productCount,
        branches: state.activityReducer.branches
    }
}

const mapDispatchToProps = {
    getStoreProducts,
    getProductsCount,
    getBranches
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);