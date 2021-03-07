import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteWorkerModal = (props) => {
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
            </Modal.Header>
                <h4 className='my-4 ml-3'>Ցանակնում ե՞ք հեռացնել {props.fullname} Աշխատակցին</h4>
            <Modal.Footer>
                <Button onClick={()=>onSubmit(props.id)} className='text-left' variant='success'>Այո</Button>
                <Button onClick={onCancel} variant='danger'>Ոչ</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default DeleteWorkerModal;
