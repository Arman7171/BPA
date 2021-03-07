import React from "react";
import { Modal } from "react-bootstrap";
import Inovice from '../../Inovice';

const SeeInovices = (props) => {
    const { onCancel, onSubmit } = props;

    const sendData = () => {
        onSubmit();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={true}
            onHide={onCancel}
        >
            <Modal.Header style={{background: '#16171e'}}>
            <Modal.Title style={{color: 'white'}}>Մասնաճուղի տվյալներ</Modal.Title>
            </Modal.Header>

                <Modal.Body id="contained-modal-title-vcenter">
                   <Inovice 
                        inovices={props.inovices}
                        onSubmit={sendData}
                        type={props.type}
                    />
                </Modal.Body>
        </Modal>
    );
}
export default SeeInovices;
