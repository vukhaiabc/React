import React from 'react';
import PropTypes from 'prop-types';
import Todolist from '../components';

Todofeature.propTypes = {
    
};

function Todofeature(props) {
    const todoList = [
        {
            id : 1,
            title : 'Quang Khai'
        },
        {
            id : 2,
            title : 'Ptit'
        },
        {
            id : 3,
            title : 'Hai duong'
        }
    ] 
    return (
        <div className='todo-feature'>
            <h2>List Todo</h2>
            <Todolist todoList = {todoList} />
        </div>
    );
}

export default Todofeature;