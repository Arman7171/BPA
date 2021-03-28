import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getBranches, getProviders, getWorkers, getIncome, getUserImports, getExports } from "../../Store/Activity/activityActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Chart from "../Chart";

const Home = ({getBranches, getProviders, getIncome, getUserImports, getExports, exports, userImports, getWorkers,income, providers, workers, incomePracent, branches}) => {

    const [type, ] = useState(localStorage.getItem('type'));
    const [importData, setImportData] = useState([]);
    const [importLable, setImportLable] = useState([]);
    const [exportData, setExportData] = useState([]);
    const [exportLable, setExportLable] = useState([]);

    useEffect(() => {
        getBranches();
        getProviders();
        getWorkers();
        getIncome();
        getUserImports(new Date().getMonth(), new Date().getFullYear());
        getExports(new Date().getMonth(), new Date().getFullYear());
    }, []);

    useEffect(() => {
        if (userImports.length > 0) {
            let chartData = [];
            let lable = [];
            for (let i = 0; i < userImports.length; i++) {
                chartData.push(userImports[i].total);
                lable.push(new Date(userImports[i].updatedAt).toLocaleDateString());
            }
            setImportData(chartData);
            setImportLable(lable);
        }
        else{
            setImportData([]);
            setImportLable([]);
        }
    }, [userImports]);

    useEffect(() => {
        if (exports.length > 0) {
            let chartData = [];
            let lable = [];
            for (let i = 0; i < exports.length; i++) {
                chartData.push(exports[i].price*exports[i].count);
                lable.push(new Date(exports[i].updatedAt).toLocaleDateString());
            }
            setExportData(chartData);
            setExportLable(lable);
        }
        else{
            setExportLable([]);
            setExportData([]);
        }
    }, [exports]);

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Աշխատասենյակ</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="">BPA</Link></li>
                                        <li className="breadcrumb-item active">Աշխատասենյակ</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    {
                        type === 'manager' ? null :

                    <div className="row mb-3">
                            <div className="col-md-6 col-xl-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="float-right mt-2">
                                            <div id="total-revenue-chart"></div>
                                        </div>
                                        <div>
                                            <h4 className="mb-1 mt-1"><span data-plugin="counterup"> {branches.length} </span></h4>
                                            <p className="text-muted mb-0">Մասնաճյուղեր</p>
                                        </div>
                                    </div>
                                </div>
                            </div> 

                            <div className="col-md-6 col-xl-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="float-right mt-2">
                                            <div id="orders-chart"> </div>
                                        </div>
                                        <div>
                                            <h4 className="mb-1 mt-1"><span data-plugin="counterup"> {workers.length} </span></h4>
                                            <p className="text-muted mb-0">Աշխատակիցներ</p>
                                        </div>
                                    </div>
                                </div>
                            </div> 

                            <div className="col-md-6 col-xl-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="float-right mt-2">
                                            <div id="customers-chart"> </div>
                                        </div>
                                        <div>
                                            <h4 className="mb-1 mt-1"><span data-plugin="counterup"> {providers.length} </span></h4>
                                            <p className="text-muted mb-0">Մատակարարներ</p>
                                        </div>
                                    </div>
                                </div>
                            </div> 

                            <div className="col-md-6 col-xl-3">

                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="float-right mt-2">
                                            <div id="growth-chart"></div>
                                        </div>
                                        <div>
                                            <p className="text-muted mb-0">Վերջի ամսվա Եկամուտը</p>
                                            <h4 className="mb-1 mt-1"><span data-plugin="counterup">{income}</span> ֏</h4>
                                        </div>
                                        <p className="text-muted mt-3 mb-0"><span className={`${incomePracent < 0 ? 'text-danger' : 'text-success'} mr-1`}>
                                            <FontAwesomeIcon icon={incomePracent < 0 ? faArrowDown : faArrowUp} className='mr-1' />{incomePracent?.toFixed(2)}%</span> Աճը նախորդ ամսվա համեմատ
                                        </p>
                                    </div>
                                </div>
                            </div> 
                        </div> 
                }
                    <div className="row">
                            <div className="col-xl-8">
                                <div className="card">
                                    <div className="card-body">
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
                                        <h6 className="ml-5 my-4">Վերջին ամսվա մուտքեր</h6>
                                        <Chart
                                            data={importData}
                                            lables={importLable}
                                            lable="Մուտք ( ֏ )"
                                            borderColor="rgba(255,99,132,1)"
                                        />
                                        <h6 className="ml-5 my-4">Վերջին ամսվա ելքեր</h6>
                                        <Chart
                                            data={exportData}
                                            lables={exportLable}
                                            lable="Ելք ( ֏ )"
                                            borderColor="rgba(255,99,132,1)"
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div> 

                            <div className="col-xl-4">
                                <div className="card bg-primary">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-sm-8">
                                                <p className="text-white font-size-18">Մասնաճյուղերի վերաբերյալ ավելի մանրամսն իմֆորմացիա կարող եք տեսնել այստեղ</p>
                                                <div className="mt-4">
                                                    <Link to="/branches" className="btn btn-success waves-effect waves-light">Տեսնել ավելին</Link>
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
                                                <Link className="dropdown-toggle text-reset" to="#" id="dropdownMenuButton1"
                                                    data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                    <span className="font-weight-semibold">Sort By:</span> <span className="text-muted">Yearly<i className="mdi mdi-chevron-down ml-1"></i></span>
                                                </Link>

                                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton1">
                                                    <Link className="dropdown-item" to="#">Monthly</Link>
                                                    <Link className="dropdown-item" to="#">Yearly</Link>
                                                    <Link className="dropdown-item" to="#">Weekly</Link>
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
};

const mapStateToProps = (state) => {
    return{
        workers: state.activityReducer.workers,
        branches: state.activityReducer.branches,
        providers: state.activityReducer.providers,
        income: state.activityReducer.income,
        incomePracent: state.activityReducer.incomePracent,
        userImports: state.activityReducer.userImports,
        exports: state.activityReducer.exports
    }
};

const mapDispatchToProps = {
    getBranches,
    getWorkers,
    getProviders,
    getIncome,
    getUserImports,
    getExports
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);