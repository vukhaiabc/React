import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import { Divider } from '@mui/material';
import FilterByRate from './Filters/FilterByRate';
import FilterByBrand from './Filters/FilterByBrand';

ProductFilters.propTypes = {
    filters : PropTypes.object.isRequired,
    onChange : PropTypes.func,
};
ProductFilters.defaultProps = {
    onChange : null,
};
function ProductFilters(props) {
    const {filters,onChange} = props
    const handleChangeCategory = (newCategoryId)=>{
        if (!onChange) return;
        const newFilters = {
            ...filters,
            categoryId : newCategoryId,
        } 
        onChange(newFilters)
    }
    const handleChangePrice = (value)=>{
        if (!onChange) return;
        const newFilters = {
            ...filters,
            ...value,
        } 
        onChange(newFilters)
    }
    const handleChangeRate = (value) => {
        if (!onChange) return;
        const newFilters = {
            ...filters,
            rate_gte : value,
        } 
        onChange(newFilters)
    }
    const handleChangeBrand = (newBrandStr) => {
        if (!onChange) return;
        const newFilters = {
            ...filters,
            brandName : newBrandStr,
        } 
        onChange(newFilters)
    }
    return (
        <Box p={1}>
            <FilterByCategory onChange={handleChangeCategory} />
            <Divider color ='#999' height='4px' />
            <FilterByPrice onChange = {handleChangePrice} />
            <Divider color='#999' height='4px' />          
            
            <FilterByBrand onChange = {handleChangeBrand} />
            <Divider color='#999' height='4px' />
            <FilterByRate filters={filters} onChange = {handleChangeRate} />
        </Box>
    );
}

export default ProductFilters;