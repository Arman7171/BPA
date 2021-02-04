import React from 'react';
import { URL } from '../../../config/config';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SeeInovice from './SeeInovices';

const ProductImports = () => {
    const [type,] = useState(localStorage.getItem('type'));
    const [myImportedProducts, setMyImportedProducts] = useState([]);
    const [providers, setProviders] = useState([]);
    const [providerId, setProviderId] = useState('');
    const [providerAddres, setProviderAddres] = useState('');
    const [providerVat, setProviderVat] = useState('');
    const [branches, setBranches] = useState([]);
    const [showInovice, setShowInovice] = useState(false);
    const [productData, setProductData] = useState([
        {
            productName: '', unit: 'հատ', count: '', price: '', discount: 0, total: 0, status: 'import',
            productPlacement: [
                { branchId: '', productCount: '' }
            ]
        }
    ]);

    var token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };


    useEffect(() => {
        axios.get(`${URL}/provider/my-providers`, config)
            .then((res) => {
                console.log('my branches', res);
                setProviders(res.data);
            })
            .catch(err => console.log(err.response))

        axios.get(`${URL}/branch/my-branches`, config)
            .then((res) => {
                console.log('my branches', res);
                setBranches(res.data);
            })
            .catch(err => console.log(err.response))

        if(type === 'manager'){
            axios.get(`${URL}/product/mybranch-products`, config)
            .then((res) => {
                console.log('my-product', res)
                setMyImportedProducts(res.data)
            })
            .catch(err => console.log('err', err.response))
        }
    }, []);

    const addProduct = (value, id, type) => {
        const newData = [...productData];
        newData[id][type] = value;
        setProductData(newData);
    };

    const getTotal = (id) => {
        const newData = [...productData];
        newData[id].total = newData[id].count * newData[id].price - ((newData[id].count * newData[id].price) * newData[id].discount) / 100;
        setProductData(newData);
    };

    const addProductPlacement = (value, id1, id2, type) => {
        const newData = [...productData];
        newData[id1].productPlacement[id2][type] = value;
        setProductData(newData);
    }

    const AddBranch = (index) => {
        const newData = [...productData];
        if (newData[index].productPlacement.length + 1 > branches.length) {
            alert('Բոլոր մասնաճյուղերը օգտագործված են');
        }
        else {
            newData[index].productPlacement.push({ branchId: '', productCount: '' });
            setProductData(newData);
        }
    }

    const inoviceToggle = () => {
        setShowInovice(!showInovice);
    };

    const addProductData = () => {
        const newData = [...productData];
        newData.push(
            {
                productName: '', unit: 'հատ', count: '', price: '', discount: 0, total: 0,
                productPlacement: [
                    { branchId: '', productCount: '' }
                ]
            }
        )

        setProductData(newData);

    };

    const checkProvider = id => {
        console.log(id);
        const index = providers.findIndex((provider) => provider.id == id);
        console.log(index, providers[index]);
        setProviderId(providers[index].id);
        setProviderAddres(providers[index].addres);
        setProviderVat(providers[index].vat);
    };

    const checkProduct = id => {
        console.log(id);
        axios.get(`${URL}/product/product-info/${id}`, config)
        .then(res => {
            console.log('info', res);
        })
    };

    const SaveAddedProducts = () => {
        axios.post(`${URL}/product/add-products`, { productData, providerId }, config)
            .then((res) => {
                console.log('add-product', res.data);
                inoviceToggle();
            })
            .catch((err) => console.log('err', err.response))
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
                                type === 'manager' ?
                                   null :
                                    <>
                                        <h5 className='mb-4'>Մատակարարի տվյալները</h5>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label htmlFor="name">Մատակարարի անվանումը</label>
                                                    <select name="" id="name" className='form-control' onChange={(e) => checkProvider(e.target.value)}>
                                                        <option>---</option>
                                                        {
                                                            providers.map((provider) => {
                                                                return (
                                                                    <option
                                                                        key={provider.id}
                                                                        value={provider.id}
                                                                    >
                                                                        {provider.providerName}
                                                                    </option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label htmlFor="addres">Հասցե</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="addres"
                                                        value={providerAddres}
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label htmlFor="vat">ՀՎՀՀ</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="vat"
                                                        value={providerVat}
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                            }
                            {
                                productData.map((product, index) => {
                                    return (
                                        <div key={index}>
                                            <h5 className='my-4'>Ապրանքի տվյալները</h5>
                                            <div className="row">
                                            {
                                                type === 'manager' ?
                                            <>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label htmlFor="name">Մուտքագրված ապրանքների ցանկը</label>
                                                    <select name="" id="name" className='form-control' onChange={(e) => checkProduct(e.target.value)}>
                                                        <option>---</option>
                                                        {
                                                            myImportedProducts.map((product) => {
                                                                return (
                                                                    <option
                                                                        key={product.id}
                                                                        value={product.productId}
                                                                    >
                                                                        {product.id}
                                                                    </option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col-6'></div>
                                            </> : null
                                        }
                                                <div className="col-6">
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
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label htmlFor="item">Չափման միաոր</label>
                                                        <select
                                                            id="item"
                                                            className='form-control'
                                                            onChange={(e) => addProduct(e.target.value, index, 'unit')}
                                                            disabled={type === 'manager' && true}
                                                        >
                                                            <option value='հատ'>Հատ</option>
                                                            <option value='կգ'>Կգ</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label htmlFor="count">Քանակ</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="count"
                                                            value={product.count}
                                                            onChange={(e) => {
                                                                addProduct(e.target.value, index, 'count')
                                                                getTotal(index);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label htmlFor="price">Միաոր գին</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="price"
                                                            value={product.price}
                                                            disabled={type === 'manager' && true}
                                                            onChange={(e) => {
                                                                addProduct(e.target.value, index, 'price')
                                                                getTotal(index)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label htmlFor="discount">Զեղչ</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="discount"
                                                            value={product.discount}
                                                            disabled={type === 'manager' && true}
                                                            onChange={(e) => {
                                                                addProduct(e.target.value, index, 'discount')
                                                                getTotal(index)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label htmlFor="total">Արժեքը</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="total"
                                                            value={product.total}
                                                            disabled={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                type !== 'manager' ? 
                                                <>
                                                    <h5 className='my-4'>Ապրանքի տեղաբաշխում</h5>
                                            {
                                                product.productPlacement.map((placement, productIndex) => {
                                                    return (
                                                        <>
                                                            <div className="row" key={productIndex}>
                                                                <div className="col-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="name">Մասնաճյուղ</label>
                                                                        <select
                                                                            id="name"
                                                                            className='form-control'
                                                                            onChange={(e) => addProductPlacement(e.target.value, index, productIndex, 'branchId')}
                                                                        >
                                                                            <option>---</option>
                                                                            {
                                                                                branches.map((branch) => {
                                                                                    return (
                                                                                        <option
                                                                                            key={branch.id}
                                                                                            value={branch.id}
                                                                                        >
                                                                                            {branch.branchName}
                                                                                        </option>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="addres">Տեղափոխող ապրանքի քանակ</label>
                                                                        <input
                                                                            type="number"
                                                                            className="form-control"
                                                                            id="addres"
                                                                            value={placement.productCount}
                                                                            onChange={(e) => addProductPlacement(e.target.value, index, productIndex, 'productCount')}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                            <div className='text-right mb-2'>
                                                <button
                                                    className='btn btn-success'
                                                    onClick={() => {
                                                        AddBranch(index);
                                                    }}
                                                >
                                                    Ավելացնել Մասնաճյուղ
                                                </button>
                                            </div>
                                                </> : null
                                            }
                                            
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
                                    Ավելացնել նույն Մատակարարի հաջորդ ապրանքը
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
                    />
                    : null
            }
        </div>
    );
};

export default ProductImports;