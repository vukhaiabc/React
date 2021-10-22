import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'

Todolist.propTypes = {
    todoList: PropTypes.func,
};
Todolist.defaultProps = {
    todoList: [],
};
function Todolist({ todoList }) {
    return (
        <ul className='todo-list'>
            {todoList.map(item => <li key={item.id}>{item.title}</li>)}
        </ul>
    );
}

export default Todolist;