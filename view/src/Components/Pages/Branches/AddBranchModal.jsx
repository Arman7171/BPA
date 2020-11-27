import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const AddBranchModal = (props) => {
    const [branchName, setBranchName] = useState('');
    const [addres, setAddres] = useState('');
    const [vat, setVat] = useState('');
    const { onCancel, onSubmit } = props;

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
            <Modal.Title>Մասնաճուղի տվյալներ</Modal.Title>
            </Modal.Header>

                <Modal.Body id="contained-modal-title-vcenter">
                   
                <div className='w-75 mx-auto'>
                        <form onSubmit={(e) => { }}>
                            <div className="form-group">
                                <label htmlFor="name">Մասնաճուղի կարճ անվանում</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="անվանումը"
                                    value={branchName}
                                    onChange={(e) => setBranchName(e.target.value)}
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
                </div>
                </Modal.Body>

            <Modal.Footer>
                <Button onClick={onSubmit} className='text-left' variant='success'>Ավելացնեկ</Button>
                <Button onClick={onCancel} variant='danger'>Չեղարկել</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AddBranchModal;
