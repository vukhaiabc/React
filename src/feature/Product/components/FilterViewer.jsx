import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';


FilterViewer.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
};
FilterViewer.defaultProps = {
    onChange:null,
    filters: {},
};

function FilterViewer(props) {
    const { filters,onChange } = props
    const listFilters = [
        {
            isActive : !!(filters.categoryId),
            label : 'Danh Mục',
            onRemove : () => {
                delete filters.categoryId
            }
        },
        {
            isActive : !!(filters.salePrice_gte ||filters.salePrice_lte),
            label : `Từ ${filters.salePrice_gte}$ - ${filters.salePrice_lte}$`,
            onRemove : () => {
                delete filters.salePrice_gte;
                delete filters.salePrice_lte;
            }
        },
        {
            isActive : !!(filters.brandName),
            label : filters.brandName,
            onRemove : () => {
                delete filters.brandName
            }
        },
        {
            isActive : !!(filters.rate_gte),
            label : `Từ ${filters.rate_gte} sao`,
            onRemove : () => {
                delete filters.rate_gte
            }
        }
    ]
    
    const handleDeleteChip = (item) => {
        if(!onChange) return;
        item.onRemove()
        onChange(filters)
    }
    return (
        <Box p={1}>
            <Stack direction="row" spacing={1}>
                {listFilters.map((item)=>{
                    if (item.isActive ){
                        return <Chip
                            key = {item.label}
                            label={item.label}
                            color="primary"
                            onDelete={() => handleDeleteChip(item)}
                        />
                    }
                })}
            </Stack>
        </Box>
    );
}

export default FilterViewer;