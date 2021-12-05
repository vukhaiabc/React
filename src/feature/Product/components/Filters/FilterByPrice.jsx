import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Button, Chip, InputAdornment, TextField, Typography } from '@mui/material';
import { AccountCircle, TextFields } from '@mui/icons-material';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
FilterByPrice.propTypes = {
    onChange: PropTypes.func,
};
FilterByPrice.defaultProps = {
    onChange: null,
};

function FilterByPrice(props) {
    const { onChange } = props
    const [value,setValue] = useState({
        salePrice_gte : 0,
        salePrice_lte : 0,
    })
    const handleOnchange = (e)=> {
        const {name, value} = e.target
        setValue((prev) => ({
            ...prev,
            [name]:value,
        }));
    }
    const handleSubmit = (value) => {
        if(!onChange) return;
        onChange(value)
        // if(value.salePrice_lte > value.salePrice_gte){
            
        // }
    }

    return (
        <Box>
            <Typography p='16px 0px' fontWeight='bold' >Lọc Theo Giá</Typography>

            <Chip sx = {{margin:'4px'}} label="Dưới 300$"  onClick={()=>{
                setValue((prev)=>({
                    salePrice_lte : 300,
                    salePrice_gte :0
                }))
            }} />
            <Chip sx = {{margin:'4px'}} label="Từ 300 $ đến 600$" onClick={()=>{
                setValue((prev)=>({
                    
                    salePrice_gte : 300,
                    salePrice_lte : 600,
                }))
            }}
            />
            <Chip sx = {{margin:'4px'}} label="Từ 600 $ đến 1000$" onClick={()=>{
                setValue((prev)=>({
                  
                    salePrice_gte : 600,
                    salePrice_lte : 1000,
                }))
            }}/>
            <Chip sx = {{margin:'4px'}} label="Trên 1000 $" onClick={()=>{
                setValue((prev)=>({
                    salePrice_lte : 1000000,
                    salePrice_gte : 1000,
                }))
            }}
            />
            
            <Box pb={2} pt={1}>
                <Typography fontSize='14px' color ='#888'>Chọn khoảng giá</Typography>
                <Box display='flex' alignItems='center' marginBottom='16px'>
                   
                    <TextField  size='small' 
                    id="input-with-icon-textfield"
                    
                    onChange = {handleOnchange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                        <MonetizationOnOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                    name= 'salePrice_gte'
                    value={value.salePrice_gte}
                    >

                    </TextField> 
                    
                    <TextField size='small'
                    id="input-with-icon-textfield"
                    
                    onChange = {handleOnchange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MonetizationOnOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                    name = 'salePrice_lte'
                    value={value.salePrice_lte}
                   >

                    </TextField>  
                </Box>
                <Button variant='outlined'  onClick={() =>handleSubmit(value)}>Áp Dụng</Button>
            </Box>
        </Box>
    );
}

export default FilterByPrice;