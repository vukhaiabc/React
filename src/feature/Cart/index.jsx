import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from '@mui/material/IconButton';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Link } from "react-router-dom";
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from './cartSlice';
import { Box } from '@mui/system';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Alert, Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import userApi from '../../api/userApi';
CartFeature.propTypes = {

};
const useStyles = makeStyles({
    root: {
        maxWidth: '1300px',
        margin: '0 auto'
    },

    containerImage: {
        justifyContent: 'center'
    },
    imageProduct: {
        flex: '1',
    },
    titleProduct: {
        flex: '2',
        padding: '8px 16px',
        cursor: 'pointer',
        '& > a': {
            color: 'black',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
        },
        '&>a:hover': {
            color: 'RGB(61, 118, 181)'
        },
    },
    rootTotal: {
        padding: '16px 16px',
        marginTop: '16px'
    },
    subTotal: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '4px 0'

    },
    labelSubTotal: {
        color: '#5c5c5c'
    }
})
function CartFeature(props) {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [address, setAddress] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            try {
                const response = await userApi.getAddress();
                console.log(response)
                setAddress(response)
                setLoading(false)
            }
            catch (error) {
                console.log('loi roi', error);
            }

        })();
    }, [])
    const { cartItems, cartTotalAmount, cartTotalQuantity } = cart

    const classes = useStyles()
    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };
    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
    };
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };
    return (
        <Box className={classes.root}>
            <Grid container >
                <Stack sx={{ width: '100%' }} spacing={2} p='12px 0'>
                    <Alert severity="info">Do ảnh hưởng của dịch Covid-19, một số khu vực có thể nhận hàng chậm hơn dự kiến. Tiki đang nỗ lực giao các đơn hàng trong thời gian sớm nhất. Cám ơn sự thông cảm của quý khách!</Alert>
                    <Alert severity="info">
                        <Typography component='span' fontSize='13px' marginRight='8px'>Miễn phí vận chuyển đơn từ 149K của mỗi nhà bán có logo</Typography>

                        <img src="https://salt.tikicdn.com/ts/upload/3d/e3/de/2c71b5485f7335d41cb3c06198035fe3.png" alt="icon" width="76" height="12" ></img>
                    </Alert>
                </Stack>
            </Grid>
            <Grid container padding='12px 0'>
                <Grid item xs={12} sm={6} md={9} lg={9} display='flex' justifyContent='space-between'>
                    <Typography component='h2' variant='' >Giỏ Hàng</Typography>
                    <Button variant="outlined" color='error' startIcon={<DeleteIcon />}
                        onClick={() => {
                            if (window.confirm("Bạn muốn xoá tất cả sản phẩm")) {
                                handleClearCart()
                            }
                        }}
                    >
                        Clear
                    </Button>
                </Grid>
            </Grid>



            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={9} lg={9}>
                    <Paper elevation={0}>
                        <Grid container padding={1} fontWeight='600' margin='16px 0'>
                            <Grid item md={5} lg={5}>
                                Sản Phẩm
                            </Grid>
                            <Grid item md={2} lg={2}>
                                Đơn Giá
                            </Grid>
                            <Grid item md={2} lg={2}>
                                Số Lượng
                            </Grid>
                            <Grid item md={2} lg={2}>
                                Thành Tiền
                            </Grid>
                            <Grid item md={1} lg={1}>
                                <DeleteForeverOutlinedIcon />
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={0}>

                        {
                            cartItems.map((cartItem) => {
                                return (
                                    <Grid container padding={1} fontWeight='600' key={cartItem.id} alignItems='center'
                                        borderBottom='1px solid RGB(243, 243, 243)' >
                                        <Grid item md={5} lg={5} display='flex' alignItems='center'>


                                            <img src={cartItem.img_url[0]} width='100px' alt={cartItem.name}></img>
                                            <Box className={classes.titleProduct}>
                                                <Link to={`/product/${cartItem.id}`} >{cartItem.name}</Link>
                                            </Box>


                                        </Grid>
                                        <Grid item md={2} lg={2}>
                                            <Typography component='span' sx={{ fontWeight: 600 }}>
                                                {cartItem.price}$
                                            </Typography>
                                            <Typography component='span'
                                                sx={{ fontSize: '12px', textDecoration: 'line-through', color: '#666', marginLeft: '2px' }}>
                                                {cartItem.price_old}$
                                            </Typography>


                                        </Grid>
                                        <Grid item md={2} lg={2}>
                                            <Box display='flex' alignItems='center' >
                                                <IconButton aria-label="decrement" size="small" onClick={() => handleDecreaseCart(cartItem)}>
                                                    <RemoveCircleOutlineIcon />
                                                </IconButton>
                                                <Typography sx={{ fontSize: '18px', p: '4px 4px' }}>{cartItem.cartQuantity}</Typography>

                                                <IconButton aria-label="increment" size="small" onClick={() => handleAddToCart(cartItem)}>
                                                    <AddCircleOutlineIcon />
                                                </IconButton>
                                            </Box>

                                        </Grid>
                                        <Grid item md={2} lg={2}>
                                            <Typography color='RGB(255, 89, 121)'>{parseFloat((cartItem.cartQuantity * cartItem.price).toFixed(2))}$</Typography>

                                        </Grid>
                                        <Grid item md={1} lg={1}>
                                            <DeleteForeverOutlinedIcon
                                                style={{ fill: 'red', cursor: 'pointer', p: '4px 6px' }}
                                                onClick={() => {
                                                    if (window.confirm("Bạn muốn xoá sản phẩm khỏi giỏ hàng")) {
                                                        handleRemoveFromCart(cartItem)
                                                    }
                                                }}
                                            />
                                        </Grid>

                                    </Grid>
                                )
                            })
                        }



                    </Paper>


                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Paper elevation={0}>
                        <Box padding={1} margin='16px 16px 0 0'>
                            <Box display='flex' justifyContent='space-between' >
                                <Typography fontWeight='600'>Giao tới</Typography>
                                <Typography sx={{ fontSize: '14px', color: 'RGB(61, 118, 181)', cursor: 'pointer' }}>Thay Đổi</Typography>
                            </Box>
                            {loading === false && (
                                <Box >
                                    <Typography component='span'>{address[0].recipient_name}</Typography>
                                    <Typography component='span' p='0px 12px' color='#999'>|</Typography>
                                    <Typography component='span'>{address[0].recipient_phone}</Typography>
                                    <Box sx={{ fontSize: '14px', color: '#777' }}>{address[0].address_detail}</Box>
                                </Box>

                            )}
                        </Box>
                    </Paper>
                    <Paper elevation={0}>
                        <Box className={classes.rootTotal}>
                            <Box className={classes.subTotal} >
                                <Typography className={classes.labelSubTotal} >Tổng Sản Phẩm</Typography>
                                <Typography>{cartTotalQuantity}</Typography>
                            </Box>
                            <Box className={classes.subTotal}>
                                <Typography className={classes.labelSubTotal}>Tạm tính</Typography>
                                <Typography>{cartTotalAmount}$</Typography>
                            </Box>
                            <Box className={classes.subTotal}>
                                <Typography className={classes.labelSubTotal}>Giảm Giá</Typography>
                                <Typography>0</Typography>
                            </Box>
                            <Divider />
                            <Box className={classes.subTotal} margin='16px 0 0 0'>
                                <Typography className={classes.labelSubTotal}>Tổng cộng</Typography>
                                <Typography color='red'>{cartTotalAmount}$</Typography>
                            </Box>
                        </Box>

                    </Paper>
                    <Box marginTop='16px'>
                        <Button variant='contained' fullWidth >Mua Hàng</Button>
                    </Box>


                </Grid>
            </Grid>

        </Box>
    )

};


export default CartFeature;