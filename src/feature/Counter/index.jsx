import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';
import styles from './styles.module.css';
import Button from '@mui/material/Button';

function CounterTest(props) {
    const dispatch = useDispatch()
    const count = useSelector(state => state.counter)
    
    const handleClickDecre = ()=> {
        const action = decrease()
        dispatch(action)
    }
    return (
        <div className={styles.counter}>
            <h2>{count}</h2>
            <Button variant="contained" onClick = {()=> dispatch(increase())}>Increase</Button>
            <Button variant="contained" onClick = {handleClickDecre}>Decrease</Button>
        </div>
    );
}

export default CounterTest;