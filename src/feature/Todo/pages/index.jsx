import React, { useEffect, useMemo, useState } from 'react';
import { Redirect, useHistory, useLocation, useRouteMatch } from 'react-router';
import queryString from 'query-string'
import Todolist from '../components';
import styled from 'styled-components'

Todofeature.propTypes = {

};
const Title = styled.h1`
        color : ${props => props.color || 'blue'}
    `
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

    const location = useLocation()
    const match = useRouteMatch()
    const history = useHistory()
    const [todoList, setTodoList] = useState(initTodoList)
    console.log(match.path)
    const [filteredTodoList, setFilteredTodoList] = useState(() => {
        const parsed = queryString.parse(location.search);
        console.log(parsed)
        return parsed.status || 'all'
    })
    useEffect(() => {
        setFilteredTodoList(queryString.parse(location.search).status)
    }, [location.search])


    const handleShowAllClick = () => {
        const queryParams = { status: 'all' }
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams)
        })
    }
    const handleShowActiveClick = () => {
        const queryParams = { status: 'active' }
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams)
        })
    }
    const handleShowInActiveClick = () => {
        const queryParams = { status: 'inactive' }
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams)
        })
    }
    const renderedTodoList = useMemo(() => {
        return todoList.filter((todo) => {
            let tmp = todo.isActive
            if (filteredTodoList === 'active') {
                tmp = true
            }
            if (filteredTodoList === 'inactive') {
                tmp = false
            }
            return todo.isActive === tmp
        })
    }, [filteredTodoList, todoList])
    return (
        <div className='todo-feature'>
            <Title color='red' >Đây là todo</Title>
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