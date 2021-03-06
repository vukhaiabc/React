import { Close } from '@mui/icons-material';
import { Button, Chip, Container, Divider, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string'
import { Link } from 'react-router-dom';
import Login from '../../feature/Auth/components/Login';
import Register from '../../feature/Auth/components/Register';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logout } from '../../feature/Auth/userSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import { useHistory } from 'react-router';
import { getTotals } from '../../feature/Cart/cartSlice';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Avatar from '@mui/material/Avatar';
const useStyles = makeStyles({
    root: {
        backgroundColor: 'RGB(26, 148, 255)',
        padding: '12px 0'
    },
    title: {
        flexGrow: 1,
    },    
    link: {
        color: '#fff',
        fontWeight: 'bold',
        textDecoration: 'none',
    },
    register: {
        backgroundColor: '#cdcdcd',
    },
    dialog: {
        display: 'block',
        position: 'relative',
    },
    closeButton: {
        display: 'inline-block',
        width: '50px',
        height: '50px',
        top: '0px',
        right: '0px',
        zIndex: 1,
        fontSize: '30px',
    },
    buttonAddToCart: {
        fontSize: '24px',
        cursor: 'pointer',
        '& .MuiBadge-badge': {
            right: 0,
            top: 2,
            border: `2px solid white`,
            padding: '0 4px',
        },
    },
    search: {
        height: '38px',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        // padding:'6px 10px',
        borderRadius: '2px',
    },
    searchInput: {
        borderRadius: '2px',
        padding: '6px 10px',
        border: 'none',
        color: '#888',
        fontSize: '13px',
        outline: 'none',
        width: '100%'
    },
    searchButton: {
        width: '180px',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        padding: '0px 20px',
        height: '100%',
        backgroundColor: 'RGB(13, 92, 182)',
        color: '#fff',
        border: 'none',
        borderTopRightRadius: '2px',
        borderBottomRightRadius:'2px',
        cursor: 'pointer',
        fontWeight: '600',
        '& > span': {
            fontSize: '13px',
            fontWeight: 'bold'
        }
    },
    infoUser: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        textAlign:'left',
        '&:hover': {
            opacity: '0.9'
        }
    },
    infoDescription: {
        color: '#fff',
        fontSize:'14px'
    },
    shoppingIcon: {
        color: '#fff',
        '&:hover': { opacity: '0.8' },
    },
    recommend: {
        '&>a': {
            color: '#fff',
        },
        '&>a>span': {
            fontSize: '12px',
            marginRight: '12px',
        },
        '&>a:hover': {
            opacity: '0.8'
        }
    }
});


const MODE = {
    LOGIN: 'login',
    REGISTER: 'register'
}

export default function Header() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart);
    const { cartTotalQuantity } = cart
    const [mode, setMode] = useState(MODE.LOGIN)
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('')
    const loggedUser = useSelector((state) => state.user.current)
    const isLoggedIn = !!loggedUser.email
    const history = useHistory()
    React.useEffect(() => {
        dispatch(getTotals());
    }, [dispatch, cart]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleOnChangeSearch = (e) => {
        const valueSearch = e.target.value
        setSearchInput(valueSearch)
    }
    const handleSubmitSearch = () => {
        const searchObject = {
            name:searchInput,
        }
        
        history.push({
            pathname:'/product',
            search: queryString.stringify(searchObject)
        })
    }
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleLogoutClick = () => {
        setAnchorEl(null);
        const action = logout()
        dispatch(action)
    }
    const handleClickCart = () => {
        history.push('/cart')
    }
    const handleClickOrder = () => {
        setAnchorEl(null);
        history.push('/order')
    }
    return (
        <Box sx={{ flexGrow: 1 }} >
            <Box className={classes.root}>
                <Container>
                    <Grid container alignItems='center'>
                        <Grid item md={2} lg={2}>
                            <Link to='/'> <img width='60px' src="https://salt.tikicdn.com/ts/upload/ae/f5/15/2228f38cf84d1b8451bb49e2c4537081.png" alt="" /></Link>

                        </Grid>
                        <Grid item md={7} lg={7}>
                            <Box className={classes.search}>
                                <input
                                    value={searchInput}
                                    className={classes.searchInput}
                                    placeholder='T??m s???n ph???m mong mu???n'
                                    onChange={handleOnChangeSearch}
                                ></input>
                                <button
                                    className={classes.searchButton}
                                    onClick={handleSubmitSearch}
                                >
                                    <SearchIcon />
                                    <Typography component='span'>T??m Ki???m</Typography>
                                </button>
                            </Box>

                        </Grid>
                        <Grid item md={2} lg={2} textAlign='center'>

                            {!isLoggedIn && (
                                <IconButton margin='auto' onClick={handleClickOpen} >
                                    <AccountCircleIcon fontSize='large' sx={{ color: '#fff' }} />
                                </IconButton>
                            )}
                            {isLoggedIn && (
                                <Box className={classes.infoUser} onClick={handleClickMenu}>
                                    <IconButton >
                                    <Avatar alt="Remy Sharp" src={loggedUser.avatar} />
                                        {/* <AccountCircleIcon fontSize='large' sx={{ color: '#fff' }} /> */}
                                    </IconButton>
                                    {loggedUser.name}
                                    <Typography className={classes.infoDescription}>
                                        <Typography sx={{ fontSize: '12px'}} >
                                            T??i kho???n
                                        </Typography>
                                        <Typography display='flex'  >
                                            <Typography sx={{ fontSize: '14px'}} >
                                                {`${loggedUser.first_name} ${loggedUser.last_name}`}
                                            </Typography>
                                            <ArrowDropDownIcon />
                                        </Typography>


                                    </Typography>
                                </Box>

                            )}

                        </Grid>
                        <Grid item md={1} lg={1} textAlign='center'>
                            <Badge
                                className={classes.buttonAddToCart}
                                onClick={handleClickCart}
                                badgeContent={cartTotalQuantity || 0} color="error"
                            >
                                <ShoppingCartOutlinedIcon className={classes.shoppingIcon} fontSize="large" />
                            </Badge>
                        </Grid>
                    </Grid>
                    <Grid container alignItems='center'>
                        <Grid item md={2} lg={2}>
                            <Link to='/'> <img width='80px' src="https://salt.tikicdn.com/ts/upload/e5/1d/22/61ff572362f08ead7f34ce410a4a6f96.png" alt="" /></Link>
                        </Grid>
                        <Grid item md={7} lg={7} className={classes.recommend}>
                            <Link to='/product'>
                                <Typography component='span'>t???t c??? s???n ph???m</Typography>
                            </Link>
                            <Link to='/'>
                                <Typography component='span'>????? ??i???n t???</Typography>
                            </Link>
                            <Link to='/'>
                                <Typography component='span'>qu???n ??o nam n???</Typography>
                            </Link>
                            <Link to='/'>
                                <Typography component='span'>????? gia d???ng</Typography>
                            </Link>
                            <Link to='/'>
                                <Typography component='span'>l??m ?????p</Typography>
                            </Link>
                            <Link to='/'>
                                <Typography component='span'>g???o</Typography>
                            </Link>
                        </Grid>
                        <Grid item md={3} lg={3} textAlign='right'>
                            <Chip icon={<HomeOutlinedIcon fontSize='small' />} sx={{ backgroundColor: 'RGB(83, 175, 255)', cursor: 'pointer' }} variant='filled' color='info' label="B??n h??ng c??ng Fabbi" />
                        </Grid>
                    </Grid>

                </Container>

            </Box>
            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
                <IconButton size="large" className={classes.closeButton} onClick={handleClose} sx={{ color: 'red', position: 'absolute' }}>
                    <Close />
                </IconButton>
                <DialogTitle>Ch??o m???ng b???n ?????n v???i Fabbi</DialogTitle>

                <DialogContent>
                    {mode === 'login' && (
                        <>
                            <Login className={classes.register} closeDialog={handleClose} />
                            <Box textAlign='center'>
                                <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>
                                    B???n ch??a c?? t??i kho???n, click ????? ????ng k?? !!!
                                </Button>
                            </Box>
                        </>
                    )
                    }
                    {mode === 'register' && (
                        <>
                            <Register className={classes.register} closeDialog={handleClose} />
                            <Box textAlign='center'>
                                <Button color='primary' onClick={() => setMode(MODE.LOGIN)}>
                                    B???n ???? c?? t??i kho???n, h??y ????ng Nh???p!
                                </Button>
                            </Box>
                        </>
                    )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleCloseMenu}>Trang C?? Nh??n</MenuItem>
                <MenuItem onClick={handleClickOrder}>????n Mua</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogoutClick}>????ng Xu???t</MenuItem>
            </Menu>
        </Box>
    );
}
