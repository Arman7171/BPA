import React from "react";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { URL } from '../../../config/config';
import axios from 'axios';

const AddWorkerModal = (props) => {
    const [fullName, setFullName] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [ssn, setSsn] = useState('');
    const [icn, setIcn] = useState('');
    const [rate, setRate] = useState('');
    const [salary, setSalary] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const { onCancel, onSubmit } = props;
    const [message, setMessage] = useState('');
    const [branchId, setBranchId] = useState('');
    const [branches, setBranches] = useState([]);
    var token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    useEffect(() => {
        axios.get(`${URL}/branch/my-branches`, config)
            .then((res) => {
                console.log('my branches', res);
                setBranches(res.data);
            })
            .catch(err => console.log(err.response))
    }, []);

    const addWorker = () => {       
        if(fullName && birthDay && ssn && icn && rate && salary && email && password && branchId){
            if(password === confPassword){
                const data = {
                    fullName,
                    birthDay,
                    ssn,
                    icn,
                    rate,
                    salary,
                    email,
                    password,
                    branchId
                };
                onSubmit(data);
            }
            else{
                setMessage('Գաղթնաբառի սխալ կրկնություն');
            }
        }
        else{
            setMessage('Լրացրեք բոլոր տվյալները');
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={true}
            onHide={onCancel}
        >
            <Modal.Header closeButton>
            <Modal.Title>Աշխատակցի տվյալներ</Modal.Title>
            </Modal.Header>

                <Modal.Body id="contained-modal-title-vcenter">
                   
                <div className='w-75 mx-auto'>
                        <form onSubmit={(e) => { }}>
                            <div className="form-group">
                                <label htmlFor="name">Ամբողջական անուն</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required={true}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="birthDay">Ծննդյան օր</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="birthDay"
                                    value={birthDay}
                                    onChange={(e) => setBirthDay(e.target.value)}
                                    required={true}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="vat">Նույնականցման քարտի համար</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="vat"
                                    value={icn}
                                    onChange={(e) => setIcn(e.target.value)}
                                    required={true}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ssn">Անձնագրի սերյա</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="ssn"
                                    value={ssn}
                                    onChange={(e) => setSsn(e.target.value)}
                                    required={true}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="branch">Մասնաճյուղը</label>
                                <select id="branch" className="form-control" onChange={(e) => setBranchId(e.target.value)}>
                                    <option>---</option>
                                    {
                                        branches.map((branch) => {
                                            return(
                                                <option 
                                                    value={branch.id} 
                                                    key={branch.id}
                                                > 
                                                    {branch.addres} 
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="salary">Աշխատավրձի չափ</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="salary"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    required={true}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="rate">Դրույք</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="rate"
                                    placeholder="ՀՎՀՀ"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    required={true}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Մուտքի էլէտրոնաին հասցե</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required={true}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Գաղթնաբառ</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required={true}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confPassword">Կրկնել Գաղթնաբառը</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confPassword"
                                    value={confPassword}
                                    onChange={(e) => setConfPassword(e.target.value)}
                                    required={true}
                                />
                            </div>
                        </form>
                        {
                            message ? <p className='text-danger mt-2'> {message} </p> : null
                        }
                        {
                            props.message ? <p className='text-danger mt-2'> {props.message} </p> : null
                        }
                </div>
                </Modal.Body>

            <Modal.Footer>
                <Button onClick={addWorker} className='text-left' variant='success'>Ավելացնել</Button>
                <Button onClick={onCancel} variant='danger'>Չեղարկել</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AddWorkerModal;
