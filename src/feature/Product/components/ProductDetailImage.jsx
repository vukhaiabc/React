import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
ProductDetailImage.propTypes = {
    product: PropTypes.object,
};
const useStyles = makeStyles({
    root:{

    },
    active :{
        border:'1px solid blue',
        borderRadius :'4px'
    }
})
function ProductDetailImage(props) {
    const classes = useStyles()
    const { listProductImage } = props
    const [imageLink, setImageLink] = useState(listProductImage[0])
    const [isActive,setIsActive] = useState(0)
    const handleOnClick = (item,index) => {
        setIsActive(index)
        setImageLink(item)
    }
    
    return (
        <Box p={3}>
            <Box padding='12px 0'>
                {
                    <img src={imageLink} width='100%' alt='Anh san pham'></img>
                }
            </Box>
            <Box padding="24px 0">
                <Grid container>
                    {
                        listProductImage.map((item,index) => {
                            return (
                                <Grid sx={{
                                    cursor:'pointer',
                                }}
                                key= {index}
                                className={isActive === index ? classes.active :'' }
                                padding={1} 
                                item 
                                xs={6} sm={4} md={3} lg={3}>
                                     <img 
                                    
                                     src={item} 
                                     width='100%' 
                                     alt='Anh san pham' 
                                     onClick={()=>handleOnClick(item,index)}></img>
                                </Grid>
                            )
                        })
                    }

                </Grid>
            </Box>
        </Box>
    );
}

export default ProductDetailImage;