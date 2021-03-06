import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserProducts, getProductsCount } from '../../../Store/Products/productActions';

const Products = ({getUserProducts, getProductsCount, products, productCount}) => {

    const [limit, setLimit] = useState(8);
    const [offset, setOffest] = useState(0);
    const [userProducts, setUserProducts] = useState([]);

    useEffect(() => {
        getProductsCount();
        getUserProducts(limit, offset);
    }, []);

    const loadMore = () => {
        getUserProducts(limit+8, offset+8);
        setLimit(limit+8);
        setOffest(offset+8);
    }

    useEffect(() => {
        console.log('products.length----------', products.length);
        if(products.length>0){
        setUserProducts((prevval) => {
            return prevval.concat(products)
        })
    }
    }, [products]);


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
                                        <li className="breadcrumb-item"><Link to="">Ապրանքներ</Link></li>
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
                                                    <th scope="col">Վաճառքի գին</th>
                                                    <th scope="col">Ստեղծման ամսեթիվ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    userProducts.map((product) => {
                                                        return (
                                                            <tr key={product.id}>
                                                                <td>
                                                                   {product.productName}
                                                                </td>
                                                                <td> {product.QRproduct} </td>
                                                                <td> {product.count} {product.unit} </td>
                                                                <td> {product.price} </td>
                                                                <td> {product.saleprice} </td>
                                                                <td> {new Date(product.createdAt).toLocaleString()} </td>
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
        </div>
    );
}

const mapStateToProps = (state) => {
    return{
        products: state.productReducer.products,
        productCount: state.productReducer.productCount,
    }
}

const mapDispatchToProps = {
    getUserProducts,
    getProductsCount
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);