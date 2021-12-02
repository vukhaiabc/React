import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

ProductListSort.propTypes = {
    onChange : PropTypes.func,
    currentSort : PropTypes.string,
};

function ProductListSort({currentSort,onChange}) {

    const handleChange = (event, newValue) => {
        if(onChange) onChange(newValue);
    };

    return (
        <Box sx={{ width: '100%' }} p = {2}>
            
            <Tabs
                value={currentSort}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >   
                
                <Tab value="popular" label="Xem Nhiều" />
                <Tab value="ctime" label="Mới Nhất" />
                <Tab value="sales" label="Bán Chạy" />
                <Tab value="price:asc" label="Giá Từ Thấp Tới Cao" />
                <Tab value="price:desc" label="Giá Từ Cao Tới Thấp" />
            </Tabs>
        </Box>
    );
}

export default ProductListSort;