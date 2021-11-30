import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { currrentUser, loginUser, register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import LoginForm from '../LoginForm';
Login.propTypes = {
    closeDialog : PropTypes.func,
};

function Login(props) {
    const {closeDialog} = props
    const dispatch = useDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const handleSubmitData = async (data) => {

        data.username = data.email
        
        delete data.email;

        try {
            const action = loginUser(data)
            const resultAction = await dispatch(action)
            const data_rs = unwrapResult(resultAction)
            // console.log(data_rs);

            const action2 = currrentUser(data_rs.access)
            const resultAction1 = await dispatch(action2)
            const data_rs1 = unwrapResult(resultAction1)
            // console.log(data_rs1)

            if(closeDialog){
                closeDialog();
            }
            
            enqueueSnackbar('Chào bạn đã trở lại !!!',{variant : 'success'})
        } catch (error) {
            enqueueSnackbar(error.message, {variant:'error'})
        }
    };
    return (
        <div>
            <LoginForm onSubmit={handleSubmitData} />
        </div>
    );
}

export default Login;