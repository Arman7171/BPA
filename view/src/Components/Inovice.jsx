import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Inovice = (props) => {
    const { inovices } = props;
    const [allTotal, setAllTotal] = useState(0);

    useEffect(() => {
        var allPrices = 0;
        inovices.map((inovice) => {
            console.log('total', inovice.total);
            return allPrices+= inovice.total;
        })
        setAllTotal(allPrices);
    }, []);
    return (
        <div className="main-content" style={{margin: '0'}}>

            <div className="page-content" style={{padding: '14px 0'}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="invoice-title">
                                        <h4 className="float-right font-size-16">Invoice #MN0131 <span className="badge badge-success font-size-12 ml-2">Paid</span></h4>
                                        <div className="mb-4">
                                            <img src="assets/images/logo-dark.png" alt="logo" height="20" />
                                        </div>
                                        <div className="text-muted">
                                            <p className="mb-1">641 Counts Lane Wilmore, KY 40390</p>
                                            <p className="mb-1"><i className="uil uil-envelope-alt mr-1"></i> abc@123.com</p>
                                            <p><i className="uil uil-phone mr-1"></i> 012-345-6789</p>
                                        </div>
                                    </div>

                                    <hr className="my-4" />

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="text-white">
                                                <h5 className="font-size-16 mb-3">Billed To:</h5>
                                                <h5 className="font-size-15 mb-2">Preston Miller</h5>
                                                <p className="mb-1">4450 Fancher Drive Dallas, TX 75247</p>
                                                <p className="mb-1">PrestonMiller@armyspy.com</p>
                                                <p>001-234-5678</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="text-muted text-sm-right">
                                                <div>
                                                    <h5 className="font-size-16 mb-1">Invoice No:</h5>
                                                    <p>#MN0131</p>
                                                </div>
                                                <div className="mt-4">
                                                    <h5 className="font-size-16 mb-1">Invoice Date:</h5>
                                                    <p>09 Jul, 2020</p>
                                                </div>
                                                <div className="mt-4">
                                                    <h5 className="font-size-16 mb-1">Order No:</h5>
                                                    <p>#1123456</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="py-2">
                                        <h5 className="font-size-15">Պատվերի ամփոփում</h5>

                                        <div className="table-responsive">
                                            <table className="table table-nowrap table-centered mb-0">
                                                <thead>
                                                    <tr>
                                                        <th style={{width: '70px'}}>No.</th>
                                                        <th>Անվանումը</th>
                                                        <th>Գինը</th>
                                                        <th>Քանակը</th>
                                                        <th>Զեղչ</th>
                                                        <th className="text-right" style={{width: '120px'}}>Արժեք</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        inovices.map((inovice, index) => {
                                                            return(
                                                                <tr key={index}>
                                                                    <th scope="row"> {index+1} </th>
                                                                    <td>
                                                                        <h5 className="font-size-15 mb-1"> {inovice.productName} </h5>
                                                                    </td>
                                                                    <td> {inovice.price} </td>
                                                                    <td> {inovice.count} {inovice.unit} </td>
                                                                    <td> {inovice.discount} </td>
                                                                    <td className="text-right"> {inovice.total} </td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                    <tr>
                                                        <th scope="row" colSpan="5" className="text-right"><h3>Total</h3></th>
                                                        <td className="text-right"><h4> {allTotal} </h4></td>
                                                    </tr>
                                     
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="d-print-none mt-4">
                                            <div className="float-right">
                                                <a href="" className="btn btn-success waves-effect waves-light mr-1"><i className="fa fa-print"></i></a>
                                                <a href="#" className="btn btn-primary w-md waves-effect waves-light" onClick={props.onSubmit}>Send</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inovice;