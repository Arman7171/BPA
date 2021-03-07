import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../config/config';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [UserInfo, setUserInfo] = useState({});
    const [workerImports, setWorkerImports] = useState([]);
    const [lastImport, setLastImport] = useState(null);
    const [lastExport, setLastExport] = useState(null);

    const { id } = useParams();
    var token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    useEffect(() => {
        axios.get(`${URL}/worker/worker-info/${id}`, config)
            .then((res) => {
                console.log('worker-info', res);
                setUserInfo(res.data);
            })
            .catch(err => console.log(err.response))


        axios.get(`${URL}/worker/worker-imports/${id}`, config)
            .then((res) => {
                console.log('worker-import', res);
                setWorkerImports(res.data);
            })
            .catch(err => console.log(err.response))


        axios.get(`${URL}/worker/worker-lastImport/${id}`, config)
            .then((res) => {
                console.log('worker-lastImport', res);
                setLastImport(res.data);
            })
            .catch(err => console.log(err.response))


        axios.get(`${URL}/worker/worker-lastExport/${id}`, config)
            .then((res) => {
                console.log('worker-lastExport', res);
                setLastExport(res.data);
            })
            .catch(err => console.log(err.response))
    }, []);
    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h4 className="mb-0">Profile</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to='#'>Contacts</Link></li>
                                        <li className="breadcrumb-item active">Profile</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-xl-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="text-center">
                                        <div className="dropdown float-right">
                                            <Link className="text-body dropdown-toggle font-size-18" to="#" role="button" data-toggle="dropdown" aria-haspopup="true">
                                                <i className="uil uil-ellipsis-v"></i>
                                            </Link>

                                            <div className="dropdown-menu dropdown-menu-right">
                                                <Link className="dropdown-item" to="#">Edit</Link>
                                                <Link className="dropdown-item" to="#">Action</Link>
                                                <Link className="dropdown-item" to="#">Remove</Link>
                                            </div>
                                        </div>
                                        <div className="clearfix d-flex"></div>
                                        <h5 className="mb-1"> {UserInfo.fullName} </h5>
                                    </div>

                                    <hr className="my-4" />

                                    <div>
                                        <h5 className="font-size-16">Ծննդյան օր</h5>
                                        <p> {UserInfo.birthDay && UserInfo.birthDay.slice(0, 10)} </p>
                                        <div className="table-responsive mt-4">
                                            <div>
                                                <p className="mb-1">Նույնականցման քարտի համար</p>
                                                <h5 className="font-size-16"> {UserInfo.icn} </h5>
                                            </div>
                                            <div>
                                                <p className="mb-1">Անձնագրի սերյա</p>
                                                <h5 className="font-size-16"> {UserInfo.ssn} </h5>
                                            </div>
                                            <div className="mt-4">
                                                <p className="mb-1">Հեռախոսահամար</p>
                                                <h5 className="font-size-16"> {UserInfo.mobile} </h5>
                                            </div>
                                            <div className="mt-4">
                                                <p className="mb-1">Էլէտրոնաին հասցե</p>
                                                <h5 className="font-size-16">
                                                    {UserInfo.email ? UserInfo.email : 'Նշված չէ'}
                                                </h5>
                                            </div>
                                            <div className="mt-4">
                                                <p className="mb-1">Մասնաճյուղի հասցե</p>
                                                <h5 className="font-size-16"> {UserInfo.branchAddres} </h5>
                                            </div>
                                            <div className="mt-4">
                                                <p className="mb-1">Աշխատավարձի չափ</p>
                                                <h5 className="font-size-16"> {UserInfo.salary} ֏</h5>
                                            </div>
                                            <div className="mt-4">
                                                <p className="mb-1">Դրույք</p>
                                                <h5 className="font-size-16"> {UserInfo.rate} </h5>
                                            </div>
                                            <div className="mt-4">
                                                <p className="mb-1">Գրանցման օր</p>
                                                <h5 className="font-size-16"> {new Date(UserInfo.createdAt).toLocaleString()} </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-8">
                            <div className="card mb-0">
                                <div className="tab-content p-4">
                                    <div className="tab-pane active" id="about" role="tabpanel">
                                        <div>
                                            <div>
                                                <h3 className="text-white text-center">Աշխատողի գործարքները</h3>
                                                <div className='row mt-5'>
                                                    <div className='col-4'>
                                                        <h5 className="font-size-16 mb-4">Վերջին մուտքը և ելքը</h5>

                                                        <ul className="activity-feed mb-0 pl-2">
                                                            {
                                                                lastImport ?
                                                                    <li className="feed-item">
                                                                        <div className="feed-item-list">
                                                                            <p className="text-muted mb-1"> {(new Date(lastImport.updatedAt).toLocaleDateString())} (Մուտք)</p>
                                                                            <h5 className="font-size-16">Մասնաճյուղը</h5>
                                                                            <p>{UserInfo.branchAddres}</p>
                                                                            <p className="text-muted">QR։ {lastImport.QRproduct}</p>
                                                                            <p className="text-muted">Անվանումը: {lastImport.productName}</p>
                                                                            <p className="text-muted">Քանակ: {lastImport.productCount}</p>
                                                                        </div>
                                                                    </li>
                                                                    : null
                                                            }
                                                            {
                                                                lastExport ?
                                                                    <li className="feed-item">
                                                                        <div className="feed-item-list">
                                                                            <p className="text-muted mb-1"> {(new Date(lastExport.updatedAt).toLocaleDateString())} (Ելք)</p>
                                                                            <h5 className="font-size-16">Մասնաճյուղը</h5>
                                                                            <p>{UserInfo.branchAddres}</p>
                                                                            <p className="text-muted">QR։ {lastExport.QRproduct}</p>
                                                                            <p className="text-muted">Անվանումը: {lastExport.productName}</p>
                                                                            <p className="text-muted">Քանակ: {lastExport.count}</p>                                                    </div>
                                                                    </li>
                                                                    : null
                                                            }

                                                        </ul>
                                                    </div>
                                                    <div className='col-8'>
                                                        <div className='mt-2'>
                                                            <div className="table-responsive">
                                                                <table className="table table-nowrap table-hover mb-0">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">#</th>
                                                                            <th scope="col">QR</th>
                                                                            <th scope="col">Գործարքի ամսեթիվ</th>
                                                                            <th scope="col">Քանակ</th>
                                                                            <th scope="col" style={{ width: '120px' }}>Տիպը</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            workerImports.map((workerImport, index) => {
                                                                                return (
                                                                                    <tr key={workerImport.id}>
                                                                                        <th scope="row">{index + 1}</th>
                                                                                        <td><Link to="#" className="text-dark">{workerImport.QRproduct}</Link></td>
                                                                                        <td>
                                                                                            {new Date(workerImport.updatedAt).toLocaleString()}
                                                                                        </td>
                                                                                        <td>
                                                                                            <span className="badge badge-soft-primary font-size-12">{workerImport.productCount}</span>
                                                                                        </td>
                                                                                        <td>
                                                                                            <span className="badge badge-soft-primary font-size-12 text-white">Մուտք</span>
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }
                                                                    </tbody>
                                                                </table>
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
                </div>
            </div>
        </div>
    );
};

export default Profile;