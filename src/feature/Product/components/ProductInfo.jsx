import ElectricCarOutlinedIcon from '@mui/icons-material/ElectricCarOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Grid, Rating, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart,addToCartValue, getTotals } from '../../Cart/cartSlice';
import AddToCart from './AddToCart';
ProductInfo.propTypes = {
    product: PropTypes.object,
};
const useStyles = makeStyles({
    root: {
        p : '12px'
    },
    containerPrice: {
        backgroundColor: '#fafafa',
        borderRadius:'3px'
    },
    price: {
        padding: '12px 16px',
    },
    subPrice: {

    },
    priceCurrent: {
        fontSize: '32px',
        color: '#ff424e',
    },
    priceOld: {
        textDecoration: 'line-through',
        color: '#888',
        m : '0 12px'
    },
    salePercent: {
        color: '#ff424e',
        border: '1px solid #ff424e',
        padding: '2px 2px',
        borderRadius: '2px'
    },
    colorItem: {
        border: '1px solid #CDCDCD',
        padding: '10px 20px',
        borderRadius: '2px',
        color: 'black',
        cursor: 'pointer',
        margin: '0 8px',
        '&:hover': {
            color: '#d0011b',
            border: '1px solid #d0011b',
        }
    },
})

function ProductInfo(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { product } = props
   
    if(!product) return (<Box>Loading</Box>)
    
    const handleSubmitAddToCart = (value)=>{
        console.log(value);
        dispatch(addToCartValue({product,value}))
       
    }
    return (
        <Box className={classes.root}>
            <Typography fontSize='14px' >Thương hiệu : <Typography component='span' color='blue'>{product.brand}</Typography>  </Typography>
            <Typography component='h1' variant='h4' >{product.name}</Typography>
            <Box padding='4px 0' color='#999' display='flex' alignItems='center'>
                <Rating name="read-only" value={product.rating} readOnly />
                <Typography margin='0 12px'>|</Typography>
                <Typography component='span'> Đã bán {product.amount_sold}</Typography>
            </Box>
            <Box className={classes.containerPrice}>
                <Box className={classes.price}>
                    <Typography className={classes.priceCurrent} component='span' variant='h4'>{product.price} $</Typography>
                    <Typography className={classes.priceOld} component='span'>{product.price_old} $ </Typography>
                    {product.sale_percent > 0 ? <Typography className={classes.salePercent} component='span'>-{product.sale_percent}% </Typography> : ''}
                </Box>
                <Box className={classes.subPrice}>
                    <Grid container alignItems='center'>
                        <Grid item md={1} lg={1}>
                            <Box p='6px 10px'>
                                <img src="https://chondeal247.com/wp-content/uploads/2021/08/cach-san-sale-gi-cung-re-tren-shopee.jpg"
                                    alt="gì cũng rẻ" width='100%' />
                            </Box>

                        </Grid>
                        <Grid item md={11} lg={11} p='0 8px'>
                            <Box display='flex'>
                                <Typography color='#ff424e'>Gì cũng rẻ </Typography>
                                <HelpOutlineOutlinedIcon sx={{ padding: '0 12px' }} />
                            </Box>

                            <Typography color='#888'>Giá tốt nhất trên thị trường</Typography>
                        </Grid>

                    </Grid>
                </Box>

            </Box>
            <Box p={2} color='#888'>
                <Grid container>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        Vận Chuyển
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8}>
                        <Box display='flex' color='red' >
                            <ElectricCarOutlinedIcon />
                            <Typography sx={{ m: '0 12px',color:'#888' }} component={'span'}>
                                Xử lý đơn hàng bởi shopee
                            </Typography>
                        </Box>
                        <Box>
                            <Typography>Miễn phí vận chuyển cho đơn hàng trên ₫500.000</Typography>
                        </Box>
                    </Grid>
                </Grid>

            </Box>
            <Box p={2} color='#888'>
                <Grid container>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        Color
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8}>
                        <Box>
                            {
                                product.colors !== '' ? product.colors.map((color) => {
                                    return (<Typography sx={{ m: '0 8px' }} key={color} className={classes.colorItem} component={'span'}>{color}</Typography>)
                                })
                                    : (
                                        <Typography key='default' sx={{ m: '0 8px' }} className={classes.colorItem} component={'span'}>Default</Typography>
                                    )
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <AddToCart productQuantity={product.quantity} onSubmitAddToCart={handleSubmitAddToCart} />
        </Box>
    );
}

export default ProductInfo;