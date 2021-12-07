import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Grid, TextField, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { makeStyles } from '@mui/styles';
import productApi from '../../../api/productApi';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
AddToCart.propTypes = {
    productQuantity:PropTypes.number,
    onSubmitAddToCart:PropTypes.func,
};
const useStyles = makeStyles({
    root: {

    },
    quatity: {
        display: 'flex',
        alignItems: 'center'
    },
    quantityIcon: {
        padding: '0 12px',
        color: 'black',
        cursor: 'pointer'
    },
    inputField: {
        p: '0',
        width: '80px'
    },
    buttonAddToCart: {
        display:'flex',
        alignItems :'center',
        padding:'10px 16px',
        border:'1px solid #d20c25',
        borderRadius:'3px',
        color : '#e34c4f',
        backgroundColor :'#fbebed',
        cursor:'pointer',
        '&:hover' : {
            opacity : '0.85'
        }
    }
})
function AddToCart(props) {
    const { productQuantity ,onSubmitAddToCart } = props
    const [value, setValue] = useState(1)
    const classes = useStyles()
    const handleClick = (quantity) => {
        if(!onSubmitAddToCart) return;
        console.log(quantity);
        onSubmitAddToCart(quantity)
        
    }
    return (
        <Box>
            <Box p={2} color='#888'>
                <Grid container alignItems='center'>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        Số Lượng
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} display='flex' alignItems='center' >
                        <Box className={classes.quatity}>
                            <RemoveCircleOutlineIcon className={classes.quantityIcon}
                                onClick={() => {
                                    if (value > 1) setValue(value - 1)
                                }}
                            />
                            <TextField  className={classes.inputField}
                                size='small'
                                InputProps={{ inputProps: { min: 1} }}
                                value={value}
                                id="outlined-number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => {
                                    setValue(Number.parseInt(e.target.value))
                                }}
                            />
                            <AddCircleOutlineIcon
                                className={classes.quantityIcon}
                                onClick={() => {
                                    if (value !== '')
                                        setValue(value + 1)
                                }}
                            />
                        </Box>
                        <Typography fontSize='24px' padding='0 18px'>|</Typography>
                        <Box>{`${productQuantity} sản phẩm có sẵn`}</Box>
                    </Grid>
                </Grid>

            </Box>
            <Grid p={2} container >
                <Box className={classes.buttonAddToCart} onClick={()=>handleClick(value)}>
                    <AddShoppingCartOutlinedIcon />
                    <Typography padding='0px 12px' component='span'>Thêm Vào Giỏ Hàng</Typography>
                </Box>
            </Grid>
        </Box>
    );
}

export default AddToCart;