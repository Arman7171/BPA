import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spiner from '../Spinner/Spinner';

const Activate = (props) => {
    const { token } = useParams();
    console.log('activate', token);

    axios.get(`http://localhost:5000/activate/${token}`)
    .then((res) => {
        console.log('activate', res);
        props.history.push('/login/?status=true');
    })
    .catch((err) => console.log(err.response))
    
    return (
        <Spiner />
    );
}

export default Activate;