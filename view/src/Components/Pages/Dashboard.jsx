import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Dashboard</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="">Minible</a></li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                            <div className="col-md-6 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="float-right mt-2">
                                            <div id="total-revenue-chart"></div>
                                        </div>
                                        <div>
                                            <h4 className="mb-1 mt-1">$<span data-plugin="counterup">34,152</span></h4>
                                            <p className="text-muted mb-0">Total Revenue</p>
                                        </div>
                                        <p className="text-muted mt-3 mb-0"><span className="text-success mr-1"><i className="mdi mdi-arrow-up-bold ml-1"></i>2.65%</span> since last week
                                        </p>
                                    </div>
                                </div>
                            </div> 

                            <div className="col-md-6 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="float-right mt-2">
                                            <div id="orders-chart"> </div>
                                        </div>
                                        <div>
                                            <h4 className="mb-1 mt-1"><span data-plugin="counterup">5,643</span></h4>
                                            <p className="text-muted mb-0">Orders</p>
                                        </div>
                                        <p className="text-muted mt-3 mb-0"><span className="text-danger mr-1"><i className="mdi mdi-arrow-down-bold ml-1"></i>0.82%</span> since last week
                                        </p>
                                    </div>
                                </div>
                            </div> 

                            <div className="col-md-6 col-xl-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="float-right mt-2">
                                            <div id="customers-chart"> </div>
                                        </div>
                                        <div>
                                            <h4 className="mb-1 mt-1"><span data-plugin="counterup">45,254</span></h4>
                                            <p className="text-muted mb-0">Customers</p>
                                        </div>
                                        <p className="text-muted mt-3 mb-0"><span className="text-danger mr-1"><i className="mdi mdi-arrow-down-bold ml-1"></i>6.24%</span> since last week
                                        </p>
                                    </div>
                                </div>
                            </div> 

                            <div className="col-md-6 col-xl-3">

                                <div className="card">
                                    <div className="card-body">
                                        <div className="float-right mt-2">
                                            <div id="growth-chart"></div>
                                        </div>
                                        <div>
                                            <h4 className="mb-1 mt-1">+ <span data-plugin="counterup">12.58</span>%</h4>
                                            <p className="text-muted mb-0">Growth</p>
                                        </div>
                                        <p className="text-muted mt-3 mb-0"><span className="text-success mr-1"><i className="mdi mdi-arrow-up-bold ml-1"></i>10.51%</span> since last week
                                        </p>
                                    </div>
                                </div>
                            </div> 
                        </div> 
                
                    <div className="row">
                            <div className="col-xl-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="float-right">
                                            <div className="dropdown">
                                                <a className="dropdown-toggle text-reset" href="#" id="dropdownMenuButton5"
                                                    data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                    <span className="font-weight-semibold">Sort By:</span> <span className="text-muted">Yearly<i className="mdi mdi-chevron-down ml-1"></i></span>
                                                </a>

                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton5">
                                                    <a className="dropdown-item" href="#">Monthly</a>
                                                    <a className="dropdown-item" href="#">Yearly</a>
                                                    <a className="dropdown-item" href="#">Weekly</a>
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="card-title mb-4">Sales Analytics</h4>

                                        <div className="mt-1">
                                            <ul className="list-inline main-chart mb-0">
                                                <li className="list-inline-item chart-border-left mr-0 border-0">
                                                    <h3 className="text-primary">$<span data-plugin="counterup">2,371</span><span className="text-muted d-inline-block font-size-15 ml-3">Income</span></h3>
                                                </li>
                                                <li className="list-inline-item chart-border-left mr-0">
                                                    <h3><span data-plugin="counterup">258</span><span className="text-muted d-inline-block font-size-15 ml-3">Sales</span>
                                                    </h3>
                                                </li>
                                                <li className="list-inline-item chart-border-left mr-0">
                                                    <h3><span data-plugin="counterup">3.6</span>%<span className="text-muted d-inline-block font-size-15 ml-3">Conversation Ratio</span></h3>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="mt-3">
                                            <div id="sales-analytics-chart" className="apex-charts" dir="ltr"></div>
                                        </div>
                                    </div>
                                </div>
                            </div> 

                            <div className="col-xl-4">
                                <div className="card bg-primary">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-sm-8">
                                                <p className="text-white font-size-18">Enhance your <b>Campaign</b> for better outreach <i className="mdi mdi-arrow-right"></i></p>
                                                <div className="mt-4">
                                                    <a href="" className="btn btn-success waves-effect waves-light">Upgrade Account!</a>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="mt-4 mt-sm-0">
                                                    <img src="assets/images/setup-analytics-amico.svg" className="img-fluid" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div> 

                                <div className="card">
                                    <div className="card-body">
                                        <div className="float-right">
                                            <div className="dropdown">
                                                <a className="dropdown-toggle text-reset" href="#" id="dropdownMenuButton1"
                                                    data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                    <span className="font-weight-semibold">Sort By:</span> <span className="text-muted">Yearly<i className="mdi mdi-chevron-down ml-1"></i></span>
                                                </a>

                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton1">
                                                    <a className="dropdown-item" href="#">Monthly</a>
                                                    <a className="dropdown-item" href="#">Yearly</a>
                                                    <a className="dropdown-item" href="#">Weekly</a>
                                                </div>
                                            </div>
                                        </div>

                                        <h4 className="card-title mb-4">Top Selling Products</h4>


                                        <div className="row align-items-center no-gutters mt-3">
                                            <div className="col-sm-3">
                                                <p className="text-truncate mt-1 mb-0"><i className="mdi mdi-circle-medium text-primary mr-2"></i> Desktops </p>
                                            </div>

                                            <div className="col-sm-9">
                                                <div className="progress mt-1" style={{'height': '6px'}}>
                                                    <div className="progress-bar progress-bar bg-primary" role="progressbar"
                                                        style={{'width': '52%'}} aria-valuenow="52" aria-valuemin="0"
                                                        aria-valuemax="52">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row align-items-center no-gutters mt-3">
                                            <div className="col-sm-3">
                                                <p className="text-truncate mt-1 mb-0"><i className="mdi mdi-circle-medium text-info mr-2"></i> iPhones </p>
                                            </div>
                                            <div className="col-sm-9">
                                                <div className="progress mt-1" style={{'height': '6px'}}>
                                                    <div className="progress-bar progress-bar bg-info" role="progressbar"
                                                        style={{'width': '45%'}} aria-valuenow="45" aria-valuemin="0"
                                                        aria-valuemax="45">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row align-items-center no-gutters mt-3">
                                            <div className="col-sm-3">
                                                <p className="text-truncate mt-1 mb-0"><i className="mdi mdi-circle-medium text-success mr-2"></i> Android </p>
                                            </div>
                                            <div className="col-sm-9">
                                                <div className="progress mt-1" style={{'height': '6px'}}>
                                                    <div className="progress-bar progress-bar bg-success" role="progressbar"
                                                        style={{'width': '48%'}} aria-valuenow="48" aria-valuemin="0"
                                                        aria-valuemax="48">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row align-items-center no-gutters mt-3">
                                            <div className="col-sm-3">
                                                <p className="text-truncate mt-1 mb-0"><i className="mdi mdi-circle-medium text-warning mr-2"></i> Tablets </p>
                                            </div>
                                            <div className="col-sm-9">
                                                <div className="progress mt-1" style={{'height': '6px'}}>
                                                    <div className="progress-bar progress-bar bg-warning" role="progressbar"
                                                        style={{'width': '78%'}} aria-valuenow="78" aria-valuemin="0"
                                                        aria-valuemax="78">
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 

                                        <div className="row align-items-center no-gutters mt-3">
                                            <div className="col-sm-3">
                                                <p className="text-truncate mt-1 mb-0"><i className="mdi mdi-circle-medium text-purple mr-2"></i> Cables </p>
                                            </div>
                                            <div className="col-sm-9">
                                                <div className="progress mt-1" style={{'height': '6px'}}>
                                                    <div className="progress-bar progress-bar bg-purple" role="progressbar"
                                                        style={{'width': '63%'}} aria-valuenow="63" aria-valuemin="0"
                                                        aria-valuemax="63">
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
        </div>
    );
}

export default Home;