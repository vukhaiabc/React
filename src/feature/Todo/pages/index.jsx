import React, { useState } from 'react';

import Todolist from '../components';

Todofeature.propTypes = {

};

function Todofeature(props) {
    const initTodoList = [
        {
            id: 1,
            title: 'Quang Khai',
            isActive: true
        },
        {
            id: 2,
            title: 'Ptit',
            isActive: false
        },
        {
            id: 3,
            title: 'Hai duong',
            isActive: true
        }
    ]
    const handleTodoClick = (index) => {
        const newTodoList = [...todoList]
        newTodoList[index] = {
            ...newTodoList[index],
            isActive: newTodoList[index].isActive === true ? false : true
        }
        setTodoList(newTodoList)
    }
    const [todoList, setTodoList] = useState(initTodoList)
    const [filteredTodoList, setFilteredTodoList] = useState('all')

    const handleShowAllClick = ()=>{
        setFilteredTodoList('all')
    }
    const handleShowActiveClick = ()=>{
        setFilteredTodoList('active')
    }
    const handleShowInActiveClick = ()=>{
        setFilteredTodoList('inactive')
    }
    const renderedTodoList = todoList.filter((todo)=>{
        let tmp = todo.isActive
        if(filteredTodoList === 'active'){
            tmp = true
        }
        if(filteredTodoList === 'inactive'){
            tmp = false
        }
        return todo.isActive === tmp
    })
    return (
        <div className='todo-feature'>
            <div className="control">
                <button onClick={handleShowAllClick}>All</button>
                <button onClick={handleShowActiveClick}>Active</button>
                <button onClick={handleShowInActiveClick}>inActive</button>
            </div>
            <h2>List Todo</h2>
            <Todolist todoList={renderedTodoList} onTodoClick={handleTodoClick} />
        </div>
    );
}

export default Todofeature;