import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';


ProductDetailDescriptionItem.propTypes = {
    
};

function ProductDetailDescriptionItem(props) {
    const {productDescription} = props
    return (
        <Box p ={2}>
            <Box component ='h2'> Mô tả về sản phẩm</Box>
            <Box>
            {productDescription}
            </Box>
            
        </Box>
    );
}

export default ProductDetailDescriptionItem;