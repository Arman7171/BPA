import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../config/config';
import {Link} from 'react-router-dom';

const Profile = () => {
    const [UserInfo, setUserInfo] = useState({});

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
    }, []);
    return(
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
                                    <div className="clearfix"></div>
                                    <h5 className="mt-3 mb-1"> {UserInfo.fullName} </h5>
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

                                            <h5 className="font-size-16 mb-4">Experience</h5>

                                            <ul className="activity-feed mb-0 pl-2">
                                                <li className="feed-item">
                                                    <div className="feed-item-list">
                                                        <p className="text-muted mb-1">2019 - 2020</p>
                                                        <h5 className="font-size-16">UI/UX Designer</h5>
                                                        <p>Abc Company</p>
                                                        <p className="text-muted">To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual</p>
                                                    </div>
                                                </li>
                                                <li className="feed-item">
                                                    <div className="feed-item-list">
                                                        <p className="text-muted mb-1">2017 - 2019</p>
                                                        <h5 className="font-size-16">Graphic Designer</h5>
                                                        <p>xyz Company</p>
                                                        <p className="text-muted">It will be as simple as occidental in fact, it will be Occidental. To an English person, it will seem like simplified English, as Link skeptical Cambridge friend of mine told me what Occidental </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h5 className="font-size-16 mb-4">Projects</h5>

                                            <div className="table-responsive">
                                                <table className="table table-nowrap table-hover mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Projects</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col" style={{width: '120px'}}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">01</th>
                                                            <td><Link to="#" className="text-dark">Brand Logo Design</Link></td>
                                                            <td>
                                                                18 Jun, 2020
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-soft-primary font-size-12">Open</span>
                                                            </td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <Link className="text-muted dropdown-toggle font-size-18 px-2" to="" role="button" data-toggle="dropdown" aria-haspopup="true">
                                                                        <i className="uil uil-ellipsis-v"></i>
                                                                    </Link>
                                                                
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <Link className="dropdown-item" to="#">Action</Link>
                                                                        <Link className="dropdown-item" to="#">Another action</Link>
                                                                        <Link className="dropdown-item" to="#">Something else here</Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">02</th>
                                                            <td><Link to="#" className="text-dark">Minible Admin</Link></td>
                                                            <td>
                                                                06 Jun, 2020
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-soft-primary font-size-12">Open</span>
                                                            </td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <Link className="text-muted dropdown-toggle font-size-18 px-2" to="" role="button" data-toggle="dropdown" aria-haspopup="true">
                                                                        <i className="uil uil-ellipsis-v"></i>
                                                                    </Link>
                                                                
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <Link className="dropdown-item" to="#">Action</Link>
                                                                        <Link className="dropdown-item" to="#">Another action</Link>
                                                                        <Link className="dropdown-item" to="#">Something else here</Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">03</th>
                                                            <td><Link to="#" className="text-dark">Chat app Design</Link></td>
                                                            <td>
                                                                28 May, 2020
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-soft-success font-size-12">Complete</span>
                                                            </td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <Link className="text-muted dropdown-toggle font-size-18 px-2" to="" role="button" data-toggle="dropdown" aria-haspopup="true">
                                                                        <i className="uil uil-ellipsis-v"></i>
                                                                    </Link>
                                                                
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <Link className="dropdown-item" to="#">Action</Link>
                                                                        <Link className="dropdown-item" to="#">Another action</Link>
                                                                        <Link className="dropdown-item" to="#">Something else here</Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">04</th>
                                                            <td><Link to="#" className="text-dark">Minible Landing</Link></td>
                                                            <td>
                                                                13 May, 2020
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-soft-success font-size-12">Complete</span>
                                                            </td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <Link className="text-muted dropdown-toggle font-size-18 px-2" to="" role="button" data-toggle="dropdown" aria-haspopup="true">
                                                                        <i className="uil uil-ellipsis-v"></i>
                                                                    </Link>
                                                                
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <Link className="dropdown-item" to="#">Action</Link>
                                                                        <Link className="dropdown-item" to="#">Another action</Link>
                                                                        <Link className="dropdown-item" to="#">Something else here</Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">05</th>
                                                            <td><Link to="#" className="text-dark">Authentication Pages</Link></td>
                                                            <td>
                                                                06 May, 2020
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-soft-success font-size-12">Complete</span>
                                                            </td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <Link className="text-muted dropdown-toggle font-size-18 px-2" to="" role="button" data-toggle="dropdown" aria-haspopup="true">
                                                                        <i className="uil uil-ellipsis-v"></i>
                                                                    </Link>
                                                                
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <Link className="dropdown-item" to="#">Action</Link>
                                                                        <Link className="dropdown-item" to="#">Another action</Link>
                                                                        <Link className="dropdown-item" to="#">Something else here</Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
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
    );
};

export default Profile;