import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { getBranches, getProviders, getWorkers, getIncome, getUserImports, getExports, getProductsSell } from "../../Store/Activity/activityActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Chart from "../Chart";

const Home = ({ getBranches, getProviders, getIncome, sallingPrcent, getUserImports, getProductsSell, getExports, exports, userImports, getWorkers, income, providers, workers, incomePracent, branches }) => {

    const [type,] = useState(localStorage.getItem('type'));
    const [importData, setImportData] = useState([]);
    const [importLable, setImportLable] = useState([]);
    const [exportData, setExportData] = useState([]);
    const [exportLable, setExportLable] = useState([]);
    const [totalImports, setTotalImports] = useState(0);
    const [totalExports, setTotalExports] = useState(0);

    useEffect(() => {
        getBranches();
        getProviders();
        getWorkers();
        getIncome(new Date().getMonth(), new Date().getFullYear());
        getUserImports(new Date().getMonth() , new Date().getFullYear());
        getExports(new Date().getMonth(), new Date().getFullYear());
        getProductsSell(new Date().getMonth(), new Date().getFullYear());
    }, []);

    useEffect(() => {
        if (userImports.length > 0) {
            let chartData = [];
            let lable = [];
            let total = 0;

            for (let i = 0; i < userImports.length; i++) {
                total += userImports[i].total;
                chartData.push(userImports[i].total);
                lable.push(new Date(userImports[i].updatedAt).toLocaleDateString());
            }
            setImportData(chartData);
            setImportLable(lable);
            setTotalImports(total);
        }
        else {
            setImportData([]);
            setImportLable([]);
        }
    }, [userImports]);

    useEffect(() => {
        if (exports.length > 0) {
            let chartData = [];
            let lable = [];
            let total = 0;
            for (let i = 0; i < exports.length; i++) {
                total += exports[i].price * exports[i].count;
                chartData.push(exports[i].price * exports[i].count);
                lable.push(new Date(exports[i].updatedAt).toLocaleDateString());
            }
            setExportData(chartData);
            setExportLable(lable);
            setTotalExports(total);
        }
        else {
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
                      

                             
                            </div>
                    }
                    <div className="row">
                        <div className="col-xl-8">
                            <div className="row">
                            <div className="col-md-6 col-lg-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="float-right mt-2">
                                                <div id="total-revenue-chart"></div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <h4 className="mb-1 mt-1"><span data-plugin="counterup"> {branches.length} </span></h4>
                                                <h5 className="mb-0 ml-3">Մասնաճյուղեր</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="float-right mt-2">
                                                <div id="orders-chart"> </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <h4 className="mb-1 mt-1"><span data-plugin="counterup"> {workers.length} </span></h4>
                                                <h5 className="mb-0 ml-3">Աշխատակիցներ</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 col-lg-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="float-right mt-2">
                                                <div id="customers-chart"> </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <h4 className="mb-1 mt-1"><span data-plugin="counterup"> {providers.length} </span></h4>
                                                <h5 className="mb-0 ml-3">Մատակարարներ</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="mt-1">
                                        <ul className="list-inline main-chart mb-0">
                                            <li className="list-inline-item chart-border-left mr-0">
                                                <h3><span data-plugin="counterup" className="text-danger">{totalImports}</span> ֏<span className="text-muted d-inline-block font-size-15 ml-3">Ընդանուր մուտքեր</span>
                                                </h3>
                                            </li>
                                            <li className="list-inline-item chart-border-left mr-0">
                                                <h3><span data-plugin="counterup" className=" text-success">{totalExports}</span> ֏<span className="text-muted d-inline-block font-size-15 ml-3">Ընդանուր ելքեր</span></h3>
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
                                            borderColor="rgba(3, 255, 61 ,1)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4">

                        <div className="card">
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
                            <div className="card">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-sm-8">
                                            <p className="font-size-18">Մասնաճյուղերի վերաբերյալ ավելի մանրամսն իմֆորմացիա կարող եք տեսնել այստեղ</p>
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
                                    <h4 className="card-title mb-4">Ապրանքները ըստ նախորդ ամսվա աճի</h4>

                                    {
                                        sallingPrcent.map((salling, index) => {
                                            return (
                                                <div className="row align-items-center no-gutters mt-3" key={index}>
                                                    <div className="col-sm-3">
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={
                                                                <Tooltip>
                                                                    <strong>{salling.prcent}%</strong>
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <p className="text-truncate mt-1 mb-0">{salling.name}</p>

                                                        </OverlayTrigger>
                                                    </div>

                                                    <div className="col-sm-9">
                                                        <div className="progress mt-1" style={{ 'height': '6px' }}>
                                                            <div className="progress-bar progress-bar"
                                                                style={{ 'width': `${salling.prcent}%`, 'background': `#${Math.floor(Math.random()*16777215).toString(16)}` }} aria-valuenow={`${salling.prcent}`} aria-valuemin="0"
                                                                aria-valuemax={`${salling.prcent}`}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    <div className="text-right my-2">
                                        <Link to='/ProductsSelling'>Տեսնել ավելին</Link>
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
    return {
        workers: state.activityReducer.workers,
        branches: state.activityReducer.branches,
        providers: state.activityReducer.providers,
        income: state.activityReducer.income,
        incomePracent: state.activityReducer.incomePracent,
        userImports: state.activityReducer.userImports,
        exports: state.activityReducer.exports,
        sallingPrcent: state.activityReducer.sallingPrcent,
    }
};

const mapDispatchToProps = {
    getBranches,
    getWorkers,
    getProviders,
    getIncome,
    getUserImports,
    getExports,
    getProductsSell
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);