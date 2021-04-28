import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIncome } from '../../Store/Activity/activityActions';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import BarChart from "../BarChart";
import Chart from "../Chart";
import { getBranches, getSellingProducts, getSellingProductsCount } from '../../Store/Activity/activityActions';

const Analytics = ({ getBranches, getIncome, incomePracent, income, getSellingProductsCount, importsChartData, sallingProduct, productCount, exportsChartData }) => {
    const { id } = useParams();
    const [month, setMonth] = useState(new Date().getMonth());
    const [productMonth, setProductMonth] = useState(new Date().getMonth());
    const [year,] = useState(new Date().getFullYear());
    const [branch, setBranch] = useState('all');
    const [importsData, setImportsData] = useState([]);
    const [importsLable, setImportsLable] = useState([]);
    const [exportsData, setExportsData] = useState([]);
    const [exportsLable, setExportsLable] = useState([]);
    const [productData, setProductData] = useState([]);
    const [productLable, setProductLable] = useState([]);
    const [prcentData, setPrcentData] = useState([]);
    const [prcentLable, setPrcentLable] = useState([]);
    const [monthValues,] = useState(['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']);


    useEffect(() => {
        getBranches();
        getIncome(month, year);
        getSellingProductsCount(month, year);
    }, []);

    useEffect(() => {
        if (sallingProduct.length > 0) {
            let chartData = [];
            let lable = [];
            for (let i = 0; i < sallingProduct.length; i++) {
                chartData.push(sallingProduct[i].price * sallingProduct[i].count);
                lable.push(sallingProduct[i].productName);
            }
            console.log('lable', lable);
            setProductData(chartData);
            setProductLable(lable);
        }
        else {
            setProductData([]);
            setProductLable([]);
        }
    }, [sallingProduct]);


    useEffect(() => {
        if (importsChartData.length > 0) {
            let chartData = [];
            let lable = [];
            for (let i = 0; i < importsChartData.length; i++) {
                chartData.push(importsChartData[i].income);
                lable.push(new Date(importsChartData[i].createdAt).toLocaleDateString());
            }
            console.log('lable', lable);
            setImportsData(chartData);
            setImportsLable(lable);
        }
        else {
            setImportsData([]);
            setImportsLable([]);
        }
    }, [importsChartData]);

    useEffect(() => {
        if (exportsChartData.length > 0) {
            let chartData = [];
            let lable = [];
            for (let i = 0; i < exportsChartData.length; i++) {
                chartData.push(exportsChartData[i].income);
                lable.push(new Date(exportsChartData[i].createdAt).toLocaleDateString());
            }
            console.log('lable', lable);
            setExportsData(chartData);
            setExportsLable(lable);
        }
        else {
            setExportsData([]);
            setExportsLable([]);
        }
    }, [exportsChartData]);


    const getMonths = () => {
        let Months = [];
        for (let i = 1; i <= 12; i++) {
            Months.push(<option key={i} value={i - 1}>{monthValues[i - 1]}</option>)
        }
        return Months;
    };

    const checkMonth = (val) => {
        setMonth(val);
        getIncome(val, year);

    };

    const checkProductsMonth = (val) => {
        setProductMonth(val);
        getSellingProductsCount(val, year);
    };

    const averageQuantity = (val1, val2, val3) => {
        return Math.round((val1 + val2 + val3)/3);
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
                                        <select style={{ width: '155px' }} name="" id="name" defaultValue={month} className='form-control mr-2' onChange={(e) => checkMonth(e.target.value)}>
                                            {getMonths()}
                                        </select>
                                        <select style={{ width: '155px' }} defaultValue={year} name="" id="name" className='form-control'>
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
                            <div className="col-12 text-center">
                                <div className="card-body">
                                    <div className="float-right mt-2">
                                        <div id="growth-chart"></div>
                                    </div>
                                    <div>
                                        <p className="text-muted mb-0">{year}թ․-ի {monthValues[month]} ամսվա եկամուտը</p>
                                        <h4 className="mb-1 mt-1"><span data-plugin="counterup">{income}</span> ֏</h4>
                                    </div>
                                    <p className="text-muted mt-3 mb-0">
                                        <span className={`${incomePracent < 0 ? 'text-danger' : 'text-success'} mr-1`}>
                                            <FontAwesomeIcon icon={incomePracent < 0 ? faArrowDown : faArrowUp} className='mr-1' />{incomePracent?.toFixed(2)}%
                                        </span> Աճը նախորդ ամսվա համեմատ
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 page-title-box">
                            <h4 className="mb-3">Ապրանքների վաճառքի քանկը</h4>
                            <Chart
                                data={importsData}
                                lables={importsLable}
                                lable="( ֏ )"
                                borderColor="rgba(3, 255, 61 ,1)"
                                y={false}
                            />
                        </div>
                        <div className="mt-4 page-title-box">
                            <h4 className="mb-3">Ապրանքների վաճառքի աճը նախորդ ամսվա համեմատ</h4>
                            <Chart
                                data={exportsData}
                                lables={exportsLable}
                                lable="( ֏ )"
                                borderColor="rgba(3, 255, 61 ,1)"
                                y={false}
                            />
                        </div>
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between mt-5">
                                <h3 className="mb-0 text-light">Ապրանքների վիճակագրություն</h3>
                                <div className='d-flex justify-content-between w-25'>
                                    <select style={{ width: '155px' }} name="" id="name" defaultValue={productMonth} className='form-control mr-2' onChange={(e) => checkProductsMonth(e.target.value)}>
                                        {getMonths()}
                                    </select>
                                    <select style={{ width: '155px' }} defaultValue={year} name="" id="name" className='form-control'>
                                        <option value={2021}>2021</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                productCount.map((product, index) => {
                                    return (
                                        <div className="col-3 text-light mt-5" key={index}>
                                            <h6 className="text-center mb-4">{product.productName} (#{product.QRproduct})</h6>
                                             <BarChart
                                                data={[product.month1Count*product.saleprice, product.month2Count*product.saleprice, product.month3Count*product.saleprice]}
                                                lables={[monthValues[month-1],monthValues[month-2],monthValues[month-3]]}
                                                lable="( ֏ )"
                                                borderColor="rgba(3, 255, 61 ,1)"
                                                y={false}
                                            />
                                            <h6 className="mt-4">Միջին նվազագույն քանակ {averageQuantity(product.month1Count, product.month2Count, product.month3Count)}</h6>
                                            <h6 className="mt-4">Առկա քանակ <span className={`${product.countNow > averageQuantity(product.month1Count, product.month2Count, product.month3Count) ? 'text-success' : 'text-danger'}`}>{product.countNow}</span></h6>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        branches: state.activityReducer.branches,
        sallingProduct: state.activityReducer.sallingProduct,
        sallingPrcent: state.activityReducer.sallingPrcent,
        income: state.activityReducer.income,
        incomePracent: state.activityReducer.incomePracent,
        importsChartData: state.activityReducer.importsChartData,
        exportsChartData: state.activityReducer.exportsChartData,
        productCount: state.activityReducer.productCount
    }
}

const mapDispatchToProps = {
    getBranches,
    getSellingProducts,
    getIncome,
    getSellingProductsCount
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);