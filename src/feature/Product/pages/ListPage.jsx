import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Container, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import productApi from '../../../api/productApi';
import Typography from '@mui/material/Typography';
import ProductListSkeleton from '../components/ProductListSkeleton';
import ProductList from '../components/ProductList';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ProductListSort from '../components/ProductListSort';
import ProductFilters from '../components/ProductFilters';

ListPage.propTypes = {

};

function ListPage(props) {
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        page: 1,
        perpage: 10,
        sortBy: 'popular',
    })
    const [countProduct, setCountProduct] = useState(0)
    useEffect(() => {
        (async () => {
            try {
                const response = await productApi.getAll(filters);
                setProductList(response.results)
                setCountProduct(response.count)
                setLoading(false)
            }
            catch (error) {
                console.log('loi roi', error);
            }

        })();
    }, [filters])
    const handleChangePage = (e, page) => {
        setFilters(prev => ({
            ...prev,
            page: page,
        }))
    }
    const handleOnChageSort = (value) => {
        setFilters(prev => ({
            ...prev,
            sortBy: value,
        }))
    }
    const handleFiltersChange = (newFilters) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters,
        }))
    }
    return (
        <Box>
            <Container>
                <Grid container spacing={0}>
                    <Grid item xs={4} md={3} sm={3} lg={2.5}>
                        <Paper elevation={0}>
                            <ProductFilters filters={filters} onChange={handleFiltersChange} />
                        </Paper>

                    </Grid>
                    <Grid item xs={8} md={9} sm={9} lg={9.5}>
                        <Paper elevation={0}>
                            <ProductListSort currentSort={filters.sortBy} onChange={handleOnChageSort} />
                            {
                                loading ? <ProductListSkeleton /> : <ProductList data={productList} />
                            }
                            <Stack spacing={2} p={3} alignItems="center">
                                <Pagination
                                    count={Math.ceil(countProduct / filters.perpage)}
                                    page={filters.page}
                                    size="large"
                                    color='primary'
                                    onChange={handleChangePage}
                                />
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;