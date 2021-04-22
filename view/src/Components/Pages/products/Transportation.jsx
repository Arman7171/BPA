import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { importInStore } from '../../../Store/Products/productActions';
import { connect } from 'react-redux';

const Transportation = (props) => {

    const { onCancel, productname, allcount, qr, branches, importInStore } = props;
    const [message, setMessage] = useState('');
    const [transverProduct, setTransverProduct] = useState([{count: '', branch: ''}])

    const addTransverProduct = () => {
        if(transverProduct.length+1>branches.length){
            alert(`Մասնաճյուղերի մաքսիմալ քանակը ${branches.length}-ն է`);
            return;
        }
        setTransverProduct((value) => {
            return(
                [...value, {count: '', branch: ''}]
            )
        })
    };

    const changeData = (type, value, index) => {
        let newValue = [...transverProduct];
        newValue[index][type]= value;
        setTransverProduct(newValue);
    };

    const save = () => {
        let count = 0;
        for(let i=0; i<transverProduct.length; i++){
            if(transverProduct[i].count == '' || transverProduct[i].branch == ''){
                alert('Լրացրեք բոլոր դաշտերը');
                break;
            }
            else{
                count += +transverProduct[i].count;
            }
        }
        console.log(count, allcount);
        if(count>allcount){
            alert('Տեղափոխվող ապրանքի քանակը գերազանցում է եղաց քանակին');
            return;
        }
        importInStore(qr, transverProduct, productname);
        alert('Ապրանքը հաջողությամբ տեղափոխվեց');
        onCancel(true);
    };

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={true}
            onHide={onCancel}
        >
            <Modal.Header closeButton>
            <Modal.Title>{productname} (#{qr})</Modal.Title>
            </Modal.Header>

                <Modal.Body id="contained-modal-title-vcenter">
                   
                <div className=''>
                    {
                        transverProduct.map((p, index) => {
                            return(
                                <div className="mx-2 justify-content-center d-flex" key={index}>
                                <div className="form-group mr-5 w-100">
                                    <label htmlFor="name">Քանակ</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        onChange={(e) => {changeData('count', e.target.value, index)} }
                                        id="name"
                                        value={p.count}
                                        required={true}
                                    />
                                </div>
    
                                <div className="form-group w-100">
                                    <label htmlFor="addres">Մասնաճուղ</label>
                                    <select id="branch" onChange={(e) => {changeData('branch', e.target.value, index)} } className="form-control w-100">
                                        <option>---</option>
                                        {
                                            branches ? branches.map((branch) => {
                                                return(
                                                    <option 
                                                        value={branch.id} 
                                                        key={branch.id}
                                                    > 
                                                        {branch.addres} 
                                                    </option>
                                                )
                                            })
                                            : null
                                        }
                                    </select>
                                </div>
                            </div>
                            )
                        })
                    }
                       
                        {
                            message ? <p className='text-danger mt-2'> {message} </p> : null
                        }
                </div>
                </Modal.Body>

            <Modal.Footer>
                <Button onClick={addTransverProduct} className='text-left' variant='info'>Ավելացնել</Button>
                <Button className='text-left' variant='success' onClick={save}>Պահպանել</Button>
                <Button onClick={onCancel} variant='danger'>Չեղարկել</Button>
            </Modal.Footer>
        </Modal>
    );
}

const mapDispatchToProps = {
    importInStore
};

export default connect(null, mapDispatchToProps)(Transportation);