import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import orderApi from '../../api/orderApi';
import { Box } from '@mui/system';
import { Container, Grid, Typography, Paper, Slider, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';


OrderFeature.propTypes = {

};
const useStyles = makeStyles({
    root: {

    },
    title: {
        padding: '16px 0px'
    },
    rootTotal: {
        backgroundColor: 'RGB(245, 245, 250)',
        padding: '16px 16px',
        marginTop: '16px',
        marginRight: '16px'
    },
    subTotal: {
        padding: '4px 0'
    },

    total_price: {
        fontSize: '20px',
        color: 'red',
        textAlign: 'center'
    }
})
function OrderFeature(props) {
    const classes = useStyles()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const response = await orderApi.getListOrderByUser();
                setOrders(response)
                setLoading(false)
                console.log(response)
            }
            catch (error) {
                console.log('loi roi', error);
            }

        })();
    }, [])
    return (
        <Box className={classes.root}>
            <Container>
                <Typography className={classes.title} component='h2' variant='h5'> Tất cả đơn hàng của bạn</Typography>

                <Paper elevation={0}>
                    <Grid container sm={9} md={9} lg={9} >

                        <Grid container padding={1} fontWeight='600'>
                            <Grid item md={6} lg={6}>
                                Sản Phẩm
                            </Grid>
                            <Grid item md={3} lg={3}>
                                Đơn Giá
                            </Grid>
                            <Grid item md={1} lg={1}>
                                Số Lượng
                            </Grid>
                            <Grid item md={2} lg={2} textAlign='center'>
                                Thành Tiền
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

                {loading === false && (
                    <Box>
                        {
                            orders.map((order) => {
                                return (
                                    <Paper elevation={0} sx={{ margin: '20px 0px' }}>
                                        <Grid container  >
                                            <Grid item md={9} sm={9} lg={9}>
                                                <Typography p={1} fontWeight='600' >Đơn hàng : {order.id} - Thời gian : {new Date(order.created_at).toLocaleString()}</Typography>
                                                {order.orderitem.map((item) => {

                                                    return (
                                                        <Grid container padding={1} fontWeight='600' key={order.id} alignItems='center'
                                                            borderBottom='1px solid RGB(243, 243, 243)' >
                                                            <Grid item md={6} lg={6} display='flex' alignItems='center'>
                                                                <img src={item.product.img_url} width='100px' alt={item.product.name}></img>
                                                                <Box className={classes.titleProduct}>
                                                                    <Link to={`/product/${item.product.id}`} >{item.product.name}</Link>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item md={3} lg={3}>
                                                                <Typography component='span' sx={{ fontWeight: 600 }}>
                                                                    {item.product.price}$
                                                                </Typography>
                                                                <Typography component='span'
                                                                    sx={{ fontSize: '12px', textDecoration: 'line-through', color: '#666', marginLeft: '2px' }}>
                                                                    {item.product.price_old}$
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item md={1} lg={1}>

                                                                <Typography sx={{ fontSize: '18px', p: '4px 4px' }}>x{item.quantity}</Typography>

                                                            </Grid>
                                                            <Grid item md={2} lg={2} textAlign='center' >
                                                                <Typography color='RGB(255, 89, 121)'>{parseFloat((item.quantity * item.product.price).toFixed(2))}$</Typography>

                                                            </Grid>

                                                        </Grid>
                                                    )
                                                })}
                                                <Grid container p={1}>
                                                    <Grid item md={7} lg={7}>
                                                        <Typography>Trạng thái đơn hàng : </Typography>
                                                        <Slider
                                                            aria-label="status"
                                                            defaultValue={order.status}
                                                            step={1}
                                                            marks
                                                            min={0}
                                                            max={3}
                                                        />
                                                    </Grid>
                                                    {/* <Grid item md={3} lg={3}>

                                                    </Grid> */}
                                                </Grid>
                                            </Grid>
                                            <Grid item sm={3} md={3} lg={3}>
                                                <Box className={classes.rootTotal}>

                                                    <Box className={classes.subTotal}>
                                                        <Typography >Vận chuyển đến : </Typography>
                                                        <Typography color='#5c5c5c' >{order.receiving_address}</Typography>
                                                    </Box>
                                                    <Box className={classes.subTotal}>
                                                        <Typography >Phí vận chuyển : <Typography component='span' color='red' > {order.price_ship} $</Typography> </Typography>

                                                    </Box>

                                                    <Divider />
                                                    <Box className={classes.subTotal}>
                                                        <Typography >Tổng cộng : </Typography>
                                                        <Typography className={classes.total_price}>{order.total_price}$</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Paper>)
                            })
                        }
                    </Box>
                )}
            </Container>
        </Box>
    );
}

export default OrderFeature;