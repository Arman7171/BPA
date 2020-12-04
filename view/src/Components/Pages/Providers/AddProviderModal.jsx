import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const AddProviderModal = (props) => {
    const [providerName, setProviderName] = useState('');
    const [addres, setAddres] = useState('');
    const [vat, setVat] = useState('');
    const { onCancel, onSubmit } = props;
    const [message, setMessage] = useState('');

    const addProvider = () => {
        console.log('mtav');
        if(providerName && addres && vat){
            const data = {
                providerName,
                addres,
                vat
            };
            onSubmit(data);
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
            <Modal.Title>Մատակարարի տվյալները</Modal.Title>
            </Modal.Header>

                <Modal.Body id="contained-modal-title-vcenter">
                   
                <div className='w-75 mx-auto'>
                        <form onSubmit={(e) => { }}>
                            <div className="form-group">
                                <label htmlFor="name">Անվանումը</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="անվանումը"
                                    value={providerName}
                                    onChange={(e) => setProviderName(e.target.value)}
                                    required={true}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="addres">Հասցե</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addres"
                                    placeholder="Հասցե"
                                    value={addres}
                                    onChange={(e) => setAddres(e.target.value)}
                                    required={true}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="vat">ՀՎՀՀ</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="vat"
                                    placeholder="ՀՎՀՀ"
                                    value={vat}
                                    onChange={(e) => setVat(e.target.value)}
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
                <Button onClick={addProvider} className='text-left' variant='success'>Ավելացնել</Button>
                <Button onClick={onCancel} variant='danger'>Չեղարկել</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AddProviderModal;
