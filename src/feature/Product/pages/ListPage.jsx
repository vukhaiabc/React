import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Container, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import productApi from '../../../api/productApi';
import Typography from '@mui/material/Typography';
import ProductListSkeleton from '../components/ProductListSkeleton';
import Skeleton from '@mui/material/Skeleton';

ListPage.propTypes = {

};

function ListPage(props) {
    const [productList,setProductList] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        (async ()=>{
            try{
                const response = await productApi.getAll();
                setProductList(response.results)
                console.log(response.results);
            }  
            catch (error){
                console.log('loi roi',error);
            }

        })();
    },[])
    return (
        <Box>
            <Container>
                <Grid container spacing={0}>
                    <Grid item xs={4} md={3} sm={3} lg={2}>
                        <Paper elevation={0}>
                            Left
                        </Paper>

                    </Grid>
                    <Grid item xs={8} md={9} sm={9} lg={10}>
                        <Paper elevation={0}>
                            
                           {
                               loading? <ProductListSkeleton/> : <Typography>abcuuuu</Typography>
                           }
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;