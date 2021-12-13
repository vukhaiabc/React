import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import orderApi from '../../api/orderApi';
import { Box } from '@mui/system';
import { Container, Grid, Typography, Paper, Slider, Divider, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { toast } from "react-toastify";
import productApi from '../../api/productApi';

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
const labels = {
    1: 'Tệ',
    2: 'Ổn',
    3: 'OK',
    4: 'Good',
    5: 'Xuất Sắc',
};
function OrderFeature(props) {
    const classes = useStyles()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [valueRate, setValueRate] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
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
    const [productId, setProductId] = useState(null)
    const [description,setDescription ] = useState('');
    const onChangeDescription = (e)=>{
        const des = e.target.value;
        setDescription(des)
    }
    const onClickSendRating = (idProduct) => {
        const data = {
            rate: valueRate,
            description
        }
        console.log(idProduct)
        async function fetchData(data) {
            try {
                const response = await productApi.createRate(idProduct, data)

                console.log(response)
                toast.info("Cảm ơn bạn đã đánh giá ! ", {
                    position: "top-right",
                });
            }
            catch (error) {
                console.log('loi roi', error);
            }
        }
        fetchData(data)
        handleClose();
        setDescription('')
    }
    return (
        <Box className={classes.root}>
            <Container>
                <Typography className={classes.title} component='h2' variant='h5'> Tất cả đơn hàng của bạn</Typography>

                <Paper elevation={0}>
                    <Grid container sm={9} md={9.5} lg={9.5} >

                        <Grid container padding={1} fontWeight='600'>
                            <Grid item md={4.5} lg={4.5}>
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
                                    <Paper key={order.id} elevation={0} sx={{ margin: '20px 0px' }}>
                                        <Grid container  >
                                            <Grid item md={9.5} sm={9.5} lg={9.5}>
                                                <Typography p={1} fontWeight='600' >Đơn hàng : {order.id} - Thời gian : {new Date(order.created_at).toLocaleString()}</Typography>
                                                {order.orderitem.map((item) => {

                                                    return (
                                                        <Grid container padding={1} fontWeight='600' key={`${order.id}_${item.product.id}`} alignItems='center'
                                                            borderBottom='1px solid RGB(243, 243, 243)' >
                                                            <Grid item md={4.5} lg={4.5} display='flex' alignItems='center'>
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
                                                            <Grid item md={1.5} lg={1.5}>
                                                                {
                                                                    order.status === 3 &&
                                                                    <Button
                                                                        onClick={() => {
                                                                            setProductId(item.product.id);
                                                                            handleClickOpen()
                                                                        }}
                                                                        variant="contained"
                                                                        color="success">
                                                                        Đánh Giá
                                                                    </Button>
                                                                }

                                                            </Grid>

                                                        </Grid>
                                                    )
                                                })}
                                                <Box p={1} display='flex' alignItems='center' justifyContent='space-between'>
                                                    <Box>
                                                        <Typography>Trạng thái đơn hàng : </Typography>
                                                        <Slider
                                                            aria-label="status"
                                                            defaultValue={order.status}
                                                            step={1}
                                                            marks
                                                            min={0}
                                                            max={3}
                                                        />
                                                    </Box>
                                                    <Box >
                                                        {/* {
                                                            order.status === 3 &&
                                                            <Button
                                                                onClick={handleClickOpen}
                                                                variant="contained"
                                                                color="success">
                                                                Đánh Giá
                                                            </Button>
                                                        } */}

                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item sm={2.5} md={2.5} lg={2.5}>
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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle display='flex' alignItems='center'>

                    <Typography fontWeight='bold'>
                        Đánh Giá Sản Phẩm
                    </Typography>
                </DialogTitle>
                <Divider></Divider>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Alert severity="success">Đánh giá để có cơ hội nhận được 100 xu!</Alert>
                        <Box
                            sx={{
                                margin: '0 auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '20px 0'
                            }}
                        >
                            <Rating
                                size='large'
                                name="hover-feedback"
                                value={valueRate}
                                precision={1}
                                onChange={(event, newValue) => {
                                    setValueRate(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            {valueRate !== null && (
                                <Box >{labels[hover !== -1 ? hover : valueRate]}</Box>
                            )}
                        </Box>
                        <TextField
                            value={description}
                            placeholder="Hãy chia sẻ điều bạn thích về sản phẩm"
                            multiline
                            rows={2}
                            fullWidth
                            onChange = {onChangeDescription}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={() => onClickSendRating(productId)} >Gửi Đánh Giá</Button>
                    <Button onClick={handleClose}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default OrderFeature;