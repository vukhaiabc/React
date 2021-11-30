import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
Register.propTypes = {
    closeDialog : PropTypes.func,
};

function Register(props) {
    const {closeDialog} = props
    const dispatch = useDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const handleSubmitData = async (data) => {

        data.username = data.email
        data.first_name = data.firstName
        data.last_name = data.lastName
        delete data.confirmpassword;
        delete data.lastName;
        delete data.firstName;

        try {
            const action = register(data)
            const resultAction = await dispatch(action)
            const user = unwrapResult(resultAction)
            if(closeDialog){
                closeDialog();
            }
            
            enqueueSnackbar('Bạn đã đăng kí thành công !!!',{variant : 'success'})
        } catch (error) {
            enqueueSnackbar(error.message, {variant:'error'})
        }
    };
    return (
        <div>
            <RegisterForm onSubmit={handleSubmitData} />
        </div>
    );
}

export default Register;