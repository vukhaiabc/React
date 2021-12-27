import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'

Todolist.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func,
};
Todolist.defaultProps = {
    todoList: [],
    onTodoClick : null,
};
function Todolist(props) {
    const {todoList,onTodoClick} = props
    function handleClick(index) {
        if(!onTodoClick) return;
        onTodoClick(index)
    }
    return (
        <ul className='todo-list'>
            {
                todoList.map((item, index) => {
                    return (
                        <li key={item.id}
                        className = {classnames({
                            'todo-item':true,
                            'no-active': item.isActive === false
                        })}
                        onClick = {()=>handleClick(index)}
                        >
                            {item.title}
                        </li>
                    )
                })
            }
        </ul>
    );
}

export default Todolist;