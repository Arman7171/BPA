import React from 'react';
import { URL } from '../../../config/config';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SeeInovice from './SeeInovices';
import { connect } from 'react-redux';
import { addWorkerExport } from '../../../Store/Products/productActions';

const ProductExports = ({addWorkerExport, addingComplate, addImportSuccess}) => {
    const [type,] = useState(localStorage.getItem('type'));
    const [showInovice, setShowInovice] = useState(false);
    const [products, setProducts] = useState([]);
    const [productData, setProductData] = useState([
        {
            productName: '', QRProduct: '', count: '' , price: '' 
        }
    ]);

    var token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    useEffect(() => {
        if(addImportSuccess && addingComplate){
            setShowInovice(false);
            setProductData([
                {
                    productName: '', QRProduct: '', count: '', price: ''
                }
            ]);
            alert('Ապրանքը հաջողությամբ մուտքագրվեց');
        }
    }, [addImportSuccess])

    useEffect(() => {
            axios.get(`${URL}/product/my-products`, config)
            .then((res) => {
                console.log('my-product', res)
                setProducts(res.data);
            })
            .catch(err => console.log('err', err.response))
    }, []);

    const addProduct = (value, id, type) => {
        const newData = [...productData];
        newData[id][type] = value;
        setProductData(newData);
    };

    const inoviceToggle = () => {
        console.log(productData);
        for(let i=0; i<productData.length; i++){
            if(productData[i].count<=0){
                alert('Ապրանքի քանակը բացակայում է');
                return;
            }
        }
        setShowInovice(!showInovice);
    };

    const addProductData = () => {
        const newData = [...productData];
        newData.push(
            {
                productName: '', QRProduct: '', count: '', price: ''
            }
        );

        setProductData(newData);

    };
    const checkProduct = (id, dataIndex) => {
        const data = [...productData];
        let index = products.findIndex((product) => +product.id === +id);
        data[dataIndex].productName = products[index].productName;
        data[dataIndex].QRProduct = products[index].QRproduct;
        data[dataIndex].unit = products[index].unit;
        data[dataIndex].price = products[index].price;
        setProductData(data);
    };

    const SaveAddedProducts = () => {
        console.log(productData);
        addWorkerExport(productData);
    };

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Մուտքագրվող ապրանքի տվյալնները</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="">Contacts</Link></li>
                                        <li className="breadcrumb-item active">User List</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            {
                                productData.map((product, index) => {
                                    return (
                                        <div key={index}>
                                            <h5 className='my-4'>Ապրանքի տվյալները</h5>
                                            <div className="row">
                                              <div className="col-3">
                                              <div className="form-group">
                                                  <label htmlFor="name">Մուտք եղած ապրանքներ</label>
                                                  <select name="" id="name" className='form-control' onChange={(e) => checkProduct(e.target.value, index)}>
                                                      <option>---</option>
                                                      {
                                                          products.map((product) => {
                                                              return (
                                                                  <option
                                                                      key={product.id}
                                                                      value={product.id}
                                                                  >
                                                                      {product.productName} (QR` {product.QRproduct})
                                                                  </option>
                                                              );
                                                          })
                                                      }
                                                  </select>
                                              </div>
                                          </div>
                                                <div className="col-3">
                                                    <div className="form-group">
                                                        <label htmlFor="productName">Ապրանքի անվանումը</label>
                                                        <input
                                                            disabled={type === 'manager' && true}
                                                            type="text"
                                                            className="form-control"
                                                            id="productName"
                                                            value={product.productName}
                                                            onChange={(e) => addProduct(e.target.value, index, 'productName')}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="form-group">
                                                        <label htmlFor="productName">Ապրանքի շտրիխ կոդը</label>
                                                        <input
                                                            disabled={type === 'manager' && true}
                                                            type="text"
                                                            className="form-control"
                                                            id="qrProduct"
                                                            value={product.QRProduct}
                                                            onChange={(e) => addProduct(e.target.value, index, 'QRProduct')}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-3'>
                                                    <div className="form-group">
                                                        <label htmlFor="count">Քանակ</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="count"
                                                            value={product.count}
                                                            onChange={(e) => {
                                                                addProduct(e.target.value, index, 'count')
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                              
                                            </div>
                                            
                                            <hr style={{ background: 'white' }} />

                                        </div>
                                    )
                                })
                            }
                            <div className='text-right'>
                                <button
                                    className='btn btn-success'
                                    onClick={() => {
                                        addProductData();
                                    }}
                                >
                                    {type === 'manager' ? 'Ավելացնել հաջորդ ապրանքը' : 'Ավելացնել նույն Մատակարարի հաջորդ ապրանքը'}
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className='btn btn-info ml-3'
                    onClick={inoviceToggle}
                >
                    Տեսնել հաշիվ ապրանքագրը
                </button>

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
            {
                showInovice ?
                    <SeeInovice
                        onCancel={inoviceToggle}
                        inovices={productData}
                        onSubmit={SaveAddedProducts}
                        type={type}
                    />
                    : null
            }
        </div>
    );
};

const mapStateToProps = (state) =>{
    return{
        branches: state.activityReducer.branches,
        providers: state.activityReducer.providers,  
        addImportSuccess: state.productReducer.addImportSuccess,
        addingComplate: state.productReducer.addingComplate  
    }
};

const mapDispatchToProps = {
    addWorkerExport
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductExports);