import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Link, NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router';



Footer.propTypes = {

};
const useStyles = makeStyles({
    root: {
        marginTop: '40px'
    },
    title: {
        fontWeight: '700',
        color: '#383848',
        lineHeight: '30px'
    },
    listLink: {
        listStyleType: 'none',
        padding: '0',
        '& > li': {
            padding: '6px 0',
            fontSize: '13px',
            color: '#999',
        },
        '& > li > a': {
            color: '#555',
            fontWeight: '500'
        },
        '& > li > a:hover': {
            textDecoration: 'underline'
        }
    }
})
function Footer(props) {
    const classes = useStyles()
    const { url } = useRouteMatch()
    return (
        <Box className={classes.root} >
            <Paper elevation={0}>
                <Container>
                    <Grid container padding >
                        <Grid item sm={4} md={3} lg={3}>
                            <Typography variant='' className={classes.title} >Hỗ trợ khách hàng</Typography>
                            <ul className={classes.listLink}>
                                <li><Link to={url}>Các câu hỏi thường gặp</Link></li>
                                <li><Link to={url}>Gửi yêu cầu hỗ trợ</Link></li>
                                <li><Link to={url}>Hướng dẫn đặt hàng</Link></li>
                                <li><Link to={url}>Phương thức vận chuyển</Link></li>
                                <li><Link to={url}>Chính sách đổi trả</Link></li>
                                <li><Link to={url}>Hỗ trợ khách hàng:hotro@tiki.vn</Link></li>
                                <li><Link to={url}>Báo lỗi bảo mật: security@tiki.vn</Link></li>
                            </ul>

                        </Grid>
                        <Grid item sm={4} md={3} lg={3}>
                            <Typography variant='' className={classes.title} >Về Tiki</Typography>
                            <ul className={classes.listLink}>
                                <li><Link to={url}>Giới thiệu Tiki</Link></li>
                                <li><Link to={url}>Tuyển dụng</Link></li>
                                <li><Link to={url}>Chính sách bảo mật thanh toán</Link></li>
                                <li><Link to={url}>Chính Sách bảo mật thông tin cá nhân</Link></li>
                                <li><Link to={url}>Chính sách giải quyết khiếu nại</Link></li>
                                <li><Link to={url}>Điều khoản sử dụng</Link></li>
                                <li><Link to={url}>Giới thiệu Tiki Xu</Link></li>
                            </ul>

                        </Grid>
                        <Grid item sm={4} md={3} lg={3}>
                            <Typography variant='' className={classes.title} >Phương Thức Thanh Toán</Typography>

                        </Grid>
                        <Grid item sm={4} md={3} lg={3}>
                            <Typography variant='' className={classes.title} >Kết nối với chúng tôi</Typography>

                        </Grid>
                    </Grid>
                </Container>

            </Paper>
        </Box>

    );
}

export default Footer;