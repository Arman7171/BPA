import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBranchWorkers, getBranchImports, getBranchExports, getBranchProducts } from '../../../Store/Activity/activityActions';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import BarChart from "../../BarChart";
import { getBranches, getSellingProducts } from '../../../Store/Activity/activityActions';

const ProductsSelling = ({ getBranches, branches, sallingProduct, getSellingProducts, sallingPrcent }) => {
    const { id } = useParams();
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, ] = useState(new Date().getFullYear());
    const [branch, setBranch] = useState('all');
    const [productData, setProductData] = useState([]);
    const [productLable, setProductLable] = useState([]);
    const [prcentData, setPrcentData] = useState([]);
    const [prcentLable, setPrcentLable] = useState([]);

    useEffect(() => {
        getBranches()
        getSellingProducts(month, year, branch)
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
        else{
            setProductData([]);
            setProductLable([]);
        }
    }, [sallingProduct]);


    useEffect(() => {
        if (sallingPrcent.length > 0) {
            let chartData = [];
            let lable = [];
            for (let i = 0; i < sallingPrcent.length; i++) {
                chartData.push(sallingPrcent[i].prcent);
                lable.push(sallingPrcent[i].name);
            }
            console.log('lable', lable);
            setPrcentData(chartData);
            setPrcentLable(lable);
        }
        else{
            setPrcentData([]);
            setPrcentLable([]);
        }
    }, [sallingPrcent]);
    
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
        getSellingProducts(val, year, branch)
    };

    const checkBranch = (val) => {
        setBranch(val);
        getSellingProducts(month, year, val)
    }

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
                                        <select style={{width: '155px'}} name="" id="name" defaultValue={month} className='form-control mr-2' onChange={(e) => checkMonth(e.target.value)}>
                                                {getMonths()}
                                        </select>
                                        <select style={{width: '155px'}} defaultValue={year} name="" id="name" className='form-control'>
                                            <option value={2021}>2021</option>
                                        </select>
                                        <select style={{width: '155px'}} defaultValue={branch} name="" id="name" className='form-control ml-2' onChange={(e) => checkBranch(e.target.value)}>
                                            <option value={'all'}>Մասնաճյուղը</option>
                                            <option value={'all'}>Բոլորը</option>
                                            {
                                                branches.map((branch) => {
                                                    return(
                                                        <option key={branch.id} value={branch.id}>{branch.addres}</option>
                                                    )
                                                })
                                            }
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
                        </div>
                        <div className="mt-4 page-title-box">
                            <h4 className="mb-3">Ապրանքների վաճառքի քանկը</h4>
                            <BarChart
                                data={productData}
                                lables={productLable}
                                lable="( ֏ )"
                                borderColor="rgba(3, 255, 61 ,1)"
                                y = {false}
                            />
                        </div>
                        <div className="mt-4 page-title-box">
                            <h4 className="mb-3">Ապրանքների վաճառքի աճը նախորդ ամսվա համեմատ</h4>
                            <BarChart
                                data={prcentData}
                                lables={prcentLable}
                                lable="( % )"
                                borderColor="rgba(3, 255, 61 ,1)"
                                y = {true}
                            />
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
        sallingPrcent: state.activityReducer.sallingPrcent
    }
}

const mapDispatchToProps = {
    getBranches,
    getSellingProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsSelling);