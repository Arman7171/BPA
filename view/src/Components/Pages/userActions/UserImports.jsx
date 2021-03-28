import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getUserImports } from '../../../Store/Activity/activityActions';
import { connect } from 'react-redux';
import Chart from "../../Chart";

const UserImports = ({getUserImports, userImports}) => {

    const [month, setMonth] = useState(new Date().getMonth());
    const [year, ] = useState(new Date().getFullYear());
    const [importData, setImportData] = useState([]);
    const [importLable, setImportLable] = useState([]);

    useEffect(() => {
        getUserImports(month, year);
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
        getUserImports(val, year);
    };

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Մասնաճուղեր</h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="">Contacts</Link></li>
                                        <li className="breadcrumb-item active">User List</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3">
                            <select defaultValue={year} name="" id="name" className='form-control'>
                                <option value={2021}>2021</option>
                            </select>
                        </div>
                        <div className="col-3">
                        <select name="" id="name" defaultValue={month} className='form-control' onChange={(e) => checkMonth(e.target.value)}>
                                {getMonths()}
                            </select>
                        </div>
                    </div>
                    <div className="my-5">
                        <Chart
                            data={importData}
                            lables={importLable}
                            lable="Մուտք ( ֏ )"
                            borderColor="rgba(255,99,132,1)"
                        />
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive mb-4">
                                        <table className="table table-centered table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Անվանումը</th>
                                                    <th scope="col">QR</th>
                                                    <th scope="col">Քանակ</th>
                                                    <th scope="col">Գին</th>
                                                    <th scope="col">Վաճառքի գին</th>
                                                    <th scope="col">Մուտքի օր</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    userImports.map((imports, index) => {
                                                        return (
                                                            <tr key={imports.id}>
                                                                <td> {imports.productName} </td>
                                                                <td>{imports.QRproduct}</td>
                                                                <td> {imports.count} {imports.unit}</td>
                                                                <td> {imports.price} ֏</td>
                                                                <td> {imports.saleprice} ֏</td>
                                                                <td> {new Date(imports.createdAt).toLocaleString()} </td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-sm-6">
                                        </div>
                                        <div className="col-sm-6">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
        </div>

    )
}

const mapStateToProps = (state) => {
    return{
        userImports: state.activityReducer.userImports
    }
}


const mapDispatchToProps = {
    getUserImports,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserImports);