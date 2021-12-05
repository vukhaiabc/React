import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ProductDetailDescriptionItem from './ProductDetailDescriptionItem';
import ProductDetailInfo from './ProductDetailInfo';
import ProductDetailRatingComment from './ProductDetailRatingComment';
import clsx from 'clsx';
ProductDetailDescription.propTypes = {

};
const useStyles = makeStyles({
    root: {
        listStyle: 'none',
        p: '0',
        m: '0',
        display: 'flex',
        flexFlow: 'wrap nowrap',
        justifyContent: 'center',
        '& > li': {
            padding: '16px 16px'
        },
    },
    item: {
        textDecoration: 'none',
        textTransform: 'uppercase',
        color: 'black',
        fontWeight: '600',
        padding: '8px 8px',
        cursor: 'pointer',
        '&:hover': {
            color: 'blue'
        }
    },
    active: {
        border: '1px solid red',
        color: 'red',
    }

})
function ProductDetailDescription(props) {
    const { product } = props
    const classes = useStyles()
    const [tab, setTab] = useState(1)
    return (
        <Box >
            <Box component='ul' className={classes.root}>
                <li onClick={() => setTab(1)}>
                    <Box
                        className={tab === 1 ? clsx(classes.item, classes.active) : classes.item} 
                        >Thông Tin Chi Tiết</Box>
                </li>
                <li onClick={() => setTab(2)} >
                    <Box
                        className={tab === 2 ? clsx(classes.item, classes.active) : classes.item} 
                        >Mô Tả Sản Phẩm</Box>
                </li>
                <li onClick={() => setTab(3)}>
                    <Box
                        className={tab === 3 ? clsx(classes.item, classes.active) : classes.item} 
                        >Đánh Giá Và Bình Luận</Box>
                </li>
            </Box>
            {tab === 1 && (<ProductDetailInfo product={product} />)}
            {tab === 2 && (<ProductDetailDescriptionItem productDescription={product.description} />)}
            {tab === 3 && (<ProductDetailRatingComment product={product} />)}
        </Box>

    );
}

export default ProductDetailDescription;