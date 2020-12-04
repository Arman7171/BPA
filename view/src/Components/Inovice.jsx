import React from 'react';

const Inovice = () => {
    return (
        <div className="main-content">

            <div className="page-content">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Invoice Detail</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="javascript: void(0);">Invoices</a></li>
                                        <li className="breadcrumb-item active">Invoice Detail</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>

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
                                            <div className="text-muted">
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
                                        <h5 className="font-size-15">Order summary</h5>

                                        <div className="table-responsive">
                                            <table className="table table-nowrap table-centered mb-0">
                                                <thead>
                                                    <tr>
                                                        <th style={{width: '70px'}}>No.</th>
                                                        <th>Item</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th className="text-right" style={{width: '120px'}}>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">01</th>
                                                        <td>
                                                            <h5 className="font-size-15 mb-1">Nike N012 Running Shoes</h5>
                                                            <ul className="list-inline mb-0">
                                                                <li className="list-inline-item">Color : <span className="font-weight-medium">Gray</span></li>
                                                                <li className="list-inline-item">Size : <span className="font-weight-medium">08</span></li>
                                                            </ul>
                                                        </td>
                                                        <td>$260</td>
                                                        <td>1</td>
                                                        <td className="text-right">$260.00</td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row">02</th>
                                                        <td>
                                                            <h5 className="font-size-15 mb-1">Adidas Running Shoes</h5>
                                                            <ul className="list-inline mb-0">
                                                                <li className="list-inline-item">Color : <span className="font-weight-medium">Black</span></li>
                                                                <li className="list-inline-item">Size : <span className="font-weight-medium">09</span></li>
                                                            </ul>
                                                        </td>
                                                        <td>$250</td>
                                                        <td>1</td>
                                                        <td className="text-right">$250.00</td>
                                                    </tr>


                                                    <tr>
                                                        <th scope="row" colspan="4" className="text-right">Sub Total</th>
                                                        <td className="text-right">$510.00</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" colspan="4" className="border-0 text-right">
                                                            Discount :</th>
                                                        <td className="border-0 text-right">- $50.00</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" colspan="4" className="border-0 text-right">
                                                            Shipping Charge :</th>
                                                        <td className="border-0 text-right">$25.00</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" colspan="4" className="border-0 text-right">
                                                            Tax</th>
                                                        <td className="border-0 text-right">$13.00</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" colspan="4" className="border-0 text-right">Total</th>
                                                        <td className="border-0 text-right"><h4 className="m-0">$498.00</h4></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="d-print-none mt-4">
                                            <div className="float-right">
                                                <a href="javascript:window.print()" className="btn btn-success waves-effect waves-light mr-1"><i className="fa fa-print"></i></a>
                                                <a href="#" className="btn btn-primary w-md waves-effect waves-light">Send</a>
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