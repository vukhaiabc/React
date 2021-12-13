import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import productApi from '../../../api/productApi';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Button, Divider, Grid, Rating, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
ProductDetailRatingComment.propTypes = {
    product: PropTypes.object,
};
const useStyles = makeStyles({
    root: {
        padding: '20px 20px',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '20px',
    },
    rated: {
        display: 'flex',
        // justifyContent:'space-between',
        alignItems: 'center'
    },
    star: {
        marginLeft: '20px',
        '&>div': {
            color: 'RGB(128, 128, 137)',
            fontSize: '13px'
        }
    },
    boxComment: {
        padding: '20px 12px',
    },
    infoUser: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        textAlign: 'left',
        '&:hover': {
            opacity: '0.9'
        }
    },
    infoDescription: {
        fontSize: '14px'
    },
    purchase: {
        display: 'flex',
        alignItems: 'center',
        color: 'RGB(0, 171, 86)',
        padding: '6px 0px',
        '&>span': {
            fontSize: '14px',
            marginLeft: '6px'
        }
    },
    content: {
        marginTop: '20px',
        fontSize: '15px'
    },
    buttonAction : {
        marginTop:'20px',
        '&>button':{
            textTransform: 'capitalize',

        },

    }
});
const labels = {
    1: 'Tệ',
    2: 'Ổn',
    3: 'OK',
    4: 'Good',
    5: 'Xuất Sắc',
};
function ProductDetailRatingComment(props) {
    const classes = useStyles()
    const { product } = props
    const [listComment, setListComment] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            try {
                const response = await productApi.getRating(product.id);
                setListComment(response)
                setLoading(false)
                console.log(response);
            }
            catch (error) {
                console.log('loi roi', error);
            }

        })();
    }, [])
    return (
        <Box className={classes.root}>
            <Box component='span' className={classes.title}>Tất Cả Đánh Giá</Box>
            <Box className={classes.rated}>
                <Box component='h1'>{product.rating}</Box>
                <Box className={classes.star}>
                    <Rating name="read-only" value={product.rating} readOnly />
                    <Typography component='div' >{listComment.length} nhận xét</Typography>
                </Box>

            </Box>
            {loading === false &&
                listComment.map((comment)=> {
                    return (
                        <Box>
                        <Grid container  className={classes.boxComment}>
                            <Grid item sm={4} md={4} lg={4} >
                                <Box className={classes.infoUser}>
                                    <IconButton >
                                        <Avatar alt="Remy Sharp" src={comment.creator.avatar} />
                                    </IconButton>
                                    <Typography className={classes.infoDescription}>
                                        <Typography display='flex' alignItems='center'  >
                                            <Typography sx={{ fontSize: '18px' }} >
                                                {comment.creator.username}
                                            </Typography>
                                            <ArrowDropDownIcon />
                                        </Typography>
        
        
                                    </Typography>
                                </Box>
                            </Grid>
        
                            <Grid item sm={8} md={8} lg={8} >
                                <Box
                                    sx={{
                                        width: 300,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Rating
                                        name="text-feedback"
                                        value={comment.rate}
                                        readOnly
                                        precision={0.5}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    <Box sx={{ ml: 2, fontWeight: '600' }}>{labels[comment.rate]}</Box>
                                </Box>
                                <Box className={classes.purchase}>
                                    <CheckCircleOutlineRoundedIcon fontSize='small' />
                                    <Typography component='span'> Đã mua hàng</Typography>
                                </Box>
                                <Box className={classes.content}>
                                    {comment.des}
                                </Box>
                                <Box sx={{color :'#9ca5b9', fontSize:'14px', marginTop:'6px'}}>Đánh giá vào {new Date(comment.created_date).toLocaleString()}</Box>
                                <Box className={classes.buttonAction}>
                                    <Button variant="outlined" startIcon={<ThumbUpOutlinedIcon />}>
                                        Hữu ích
                                    </Button>
                                    <Button sx={{marginLeft:'10px'}}>
                                        Bình Luận
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Divider sx={{color:'RGB(245, 245, 245)'}} />
                        </Box>
                        
                    )
                })
            
            }

        </Box>
    );
}

export default ProductDetailRatingComment;