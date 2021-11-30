import { Close } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Login from '../../feature/Auth/components/Login';
import Register from '../../feature/Auth/components/Register';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logout } from '../../feature/Auth/userSlice';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
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
    }
});
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const MODE = {
    LOGIN: 'login',
    REGISTER: 'register'
}
export default function Header() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [mode, setMode] = useState(MODE.LOGIN)
    const [open, setOpen] = useState(false);
    const loggedUser = useSelector((state) => state.user.current)
    const isLoggedIn = !!loggedUser.email


    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
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
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link className={classes.link} to='/'>Fabbi</Link>

                    </Typography>
                    <NavLink to='/product' activeClassName='menu-item-active'>
                        <Button color="inherit">Product</Button>
                    </NavLink>
                    <NavLink to='/todos' activeClassName='menu-item-active' >
                        <Button color="inherit">Todo</Button>
                    </NavLink>
                    <NavLink to='/albums' activeClassName='menu-item-active'>
                        <Button color="inherit">Album</Button>
                    </NavLink>
                    <NavLink to='/counter' activeClassName='menu-item-active'>
                        <Button color="inherit">Counter</Button>
                    </NavLink>
                    
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Tìm kiếm…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    {!isLoggedIn && (
                        <Button color="inherit" fontWeight='700' onClick={handleClickOpen}>Đăng Nhập</Button>
                    )}
                    {isLoggedIn && (
                        <IconButton color='inherit' onClick={handleClickMenu}>
                            <AccountCircleIcon fontSize='large' />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            <Dialog open={open} onClose={handleClose} className={classes.dialog}>
                <IconButton size="large" className={classes.closeButton} onClick={handleClose} sx={{ color: 'red', position: 'absolute' }}>
                    <Close />
                </IconButton>
                <DialogTitle>Chào mừng bạn đến với Fabbi</DialogTitle>

                <DialogContent>
                    {mode === 'login' && (
                        <>
                            <Login className={classes.register} closeDialog={handleClose} />
                            <Box textAlign='center'>
                                <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>
                                    Bạn chưa có tài khoản, click để đăng kí !!!
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
                                    Bạn đã có tài khoản, hãy Đăng Nhập!
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
                <MenuItem onClick={handleCloseMenu}>Trang Cá Nhân</MenuItem>

                <MenuItem onClick={handleLogoutClick}>Đăng Xuất</MenuItem>
            </Menu>
        </Box>
    );
}
