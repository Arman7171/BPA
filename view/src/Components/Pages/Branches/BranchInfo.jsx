import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBranchWorkers, getBranchImports, getBranchExports, getBranchProducts } from '../../../Store/Activity/activityActions';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Chart from "../../Chart";

const BranchInfo = ({ branchWorkers, branchImports, getBranchProducts, branchProducts, prevMonthExports, prevMonthImports, branchExports, monthImports, exportPracent, monthExports, importPercent, getBranchWorkers, getBranchImports, getBranchExports }) => {
    const { id } = useParams();
    const [importData, setImportData] = useState([]);
    const [importLable, setImportLable] = useState([]);
    const [exportData, setExportData] = useState([]);
    const [exportLable, setExportLable] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, ] = useState(new Date().getFullYear());
    const [limit, ] = useState(8);
    const [offset, ] = useState(0);

    useEffect(() => {
        getBranchWorkers(id);
        getBranchImports(id, month, year);
        getBranchExports(id, month, year);
        getBranchProducts(limit, offset, id);
    }, []);

    useEffect(() => {
        if (branchImports.length > 0) {
            console.log('branchImports-----------------', branchImports);
            let chartData = [];
            let lable = [];
            for (let i = 0; i < branchImports.length; i++) {
                chartData.push(branchImports[i].price * branchImports[i].productCount);
                lable.push(new Date(branchImports[i].updatedAt).toLocaleDateString());
            }
            console.log('lable', lable);
            setImportData(chartData);
            setImportLable(lable);
        }
        else{
            setImportData([]);
            setImportLable([]);
        }
    }, [branchImports]);

    useEffect(() => {
        if (branchExports.length > 0) {
            console.log('branchExports-----------------', branchExports);
            let chartData = [];
            let lable = [];
            for (let i = 0; i < branchExports.length; i++) {
                chartData.push(branchExports[i].price * branchExports[i].count);
                lable.push(new Date(branchExports[i].createdAt).toLocaleDateString());
            }
            console.log('lable', lable);
            setExportData(chartData);
            setExportLable(lable);
        }
        else{
            setExportData([]);
            setExportLable([]);
        }
    }, [branchExports]);

    const getAllPracent = (dif) => {
        let prevDif = prevMonthExports - prevMonthImports;
        // console.log('def--------', dif, prevDif, dif - prevDif);
        let pracent = ((dif - prevDif) / Math.abs(dif)) * 100;
        // console.log(pracent);
        return pracent;
    };

    const getMonths = () => {
        let Months = [];
        let monthValues = ['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']
        for(let i=1; i<=12; i++){
            Months.push(<option key={i} value={i-1}>{monthValues[i-1]}</option>)
        }
        return Months;
    };

    const checkMonth = (val) =>{
        setMonth(val);
        getBranchExports(id, val, year);
        getBranchImports(id, val, year);
    };

    return (
        <>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Մասնաճյուղի տվյալները</h4>
                                    <div className='d-flex justify-content-between w-25'>
                                        <select name="" id="name" defaultValue={month} className='form-control mr-2' onChange={(e) => checkMonth(e.target.value)}>
                                                {getMonths()}
                                        </select>
                                        <select defaultValue={year} name="" id="name" className='form-control'>
                                            <option value={2021}>2021</option>
                                        </select>
                                    </div>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><Link to="">BPA</Link></li>
                                            <li className="breadcrumb-item active">Մասնաճյուղ</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-xl-3 mb-2">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="float-right mt-2">
                                            <div id="orders-chart"> </div>
                                        </div>
                                        <div>
                                            <p className="text-muted mb-0">Աշխատակիցներ</p>
                                            <h4 className="mb-1 mt-1"><span data-plugin="counterup"> {branchWorkers.length} </span></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-xl-3 mb-2">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="float-right mt-2">
                                            <div id="growth-chart"></div>
                                        </div>
                                        <div>
                                            <p className="text-muted mb-0">Վերջի ամսվա մուտքեր</p>
                                            <h4 className="mb-1 mt-1"><span data-plugin="counterup">{monthImports}</span> ֏</h4>
                                        </div>
                                        <p className="text-muted mt-3 mb-0"><span className={`${importPercent < 0 ? 'text-danger' : 'text-success'} mr-1`}>
                                            <FontAwesomeIcon icon={importPercent < 0 ? faArrowDown : faArrowUp} className='mr-1' />{importPercent?.toFixed(2)}%</span> Աճը նախորդ ամսվա համեմատ
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-xl-3 mb-2">

                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="float-right mt-2">
                                            <div id="growth-chart"></div>
                                        </div>
                                        <div>
                                            <p className="text-muted mb-0">Վերջի ամսվա ելքեր</p>
                                            <h4 className="mb-1 mt-1"><span data-plugin="counterup">{monthExports}</span> ֏</h4>
                                        </div>
                                        <p className="text-muted mt-3 mb-0"><span className={`${exportPracent < 0 ? 'text-danger' : 'text-success'} mr-1`}>
                                            <FontAwesomeIcon icon={exportPracent < 0 ? faArrowDown : faArrowUp} className='mr-1' />{exportPracent?.toFixed(2)}%</span> Աճը նախորդ ամսվա համեմատ
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-xl-3 mb-2">

                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="float-right mt-2">
                                            <div id="growth-chart"></div>
                                        </div>
                                        <div>
                                            <p className="text-muted mb-0">Վերջի ամսվա եկամուտը</p>
                                            <h4 className="mb-1 mt-1"><span data-plugin="counterup">{monthExports - monthImports}</span> ֏</h4>
                                        </div>
                                        <p className="text-muted mt-3 mb-0"><span className={`${getAllPracent(monthExports - monthImports) < 0 ? 'text-danger' : 'text-success'} mr-1`}>
                                            <FontAwesomeIcon icon={getAllPracent(monthExports - monthImports) < 0 ? faArrowDown : faArrowUp} className='mr-1' />{getAllPracent(monthExports - monthImports)?.toFixed(2)}%</span> Աճը նախորդ ամսվա համեմատ
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h4 className="text-white ml-4 mb-5">Վերջին ամսվա մուտքերի գրաֆիկ</h4>
                            <Chart
                                data={importData}
                                lables={importLable}
                                lable="Մոտք ( ֏ )"
                                borderColor="rgba(255,99,132,1)"
                            />
                        </div>
                        <div className="mt-5">
                            <h4 className="text-white ml-4 mb-5">Վերջին ամսվա ելքրի գրաֆիկ</h4>
                            <Chart
                                data={exportData}
                                lables={exportLable}
                                lable="Ելք ( ֏ )"
                                borderColor="rgba(255,99,132,1)"
                            />
                        </div>
                        <h4 className="text-white ml-4 my-5">Մասնաճյուղում առկա ապրանքները</h4>
                        <div className="table-responsive mb-4">
                            <table className="table table-centered table-nowrap mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Անվանումը</th>
                                        <th scope="col">QR</th>
                                        <th scope="col">Քանակ</th>
                                        <th scope="col">Վերջին թարմացման ամսեթիվ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        branchProducts.map((product) => {
                                            return (
                                                <tr key={product.id + 101}>
                                                    <td>
                                                        <Link to="#" className="text-body"> {product.productName} </Link>
                                                    </td>
                                                    <td> {product.QRproduct} </td>
                                                    <td> {product.count} {product.unit} </td>
                                                    <td> {new Date(product.updatedAt).toLocaleString()} </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        branchWorkers: state.activityReducer.branchWorkers,
        monthImports: state.activityReducer.monthImports,
        monthExports: state.activityReducer.monthExports,
        importPercent: state.activityReducer.importPercent,
        branchImports: state.activityReducer.branchImports,
        branchExports: state.activityReducer.branchExports,
        exportPracent: state.activityReducer.exportPracent,
        prevMonthImports: state.activityReducer.prevMonthImports,
        prevMonthExports: state.activityReducer.prevMonthExports,
        branchProducts: state.activityReducer.branchProducts
    }
}

const mapDispatchToProps = {
    getBranchWorkers,
    getBranchImports,
    getBranchExports,
    getBranchProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchInfo);