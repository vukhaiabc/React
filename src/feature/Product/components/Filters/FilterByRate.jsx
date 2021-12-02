import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Rating, Typography } from '@mui/material';


FilterByRate.propTypes = {
    onChange: PropTypes.func,
};
FilterByRate.defaultProps = {
    onChange: null,
};
function FilterByRate(props) {
    const {onChange} = props

    return (
        <Box mb={2}>
            <Typography p='16px 0px' fontWeight='bold'>Lọc Theo Rating</Typography>
            <Box display='flex' value={5} justifyContent='space-around'sx = {{cursor:'pointer'}}  onClick = {()=>{
                onChange(5)
            }} >
                <Rating name="read-only" value={5} readOnly  /><Typography>Từ 5 sao</Typography>
            </Box>
            <Box display='flex' value={4} justifyContent='space-around'sx = {{cursor:'pointer'}} 
            onClick = {()=>{
                onChange(4)
            }} >
                <Rating name="read-only" value={4} readOnly  /><Typography>Từ 4 sao</Typography>
            </Box>
            <Box display='flex' value={3} justifyContent='space-around'sx = {{cursor:'pointer'}} onClick = {()=>{
                onChange(3)
            }}>
                <Rating name="read-only" value={3} readOnly /><Typography>Từ 3 sao</Typography>
            </Box>
        </Box>
    );
}

export default FilterByRate;