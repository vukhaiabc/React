import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
ProductDetailInfo.propTypes = {

};
const useStyles = makeStyles({
    title: {
        fontWeight: '600',
        textTransform: 'uppercase'
    }
})
function createData(info, tech) {
    return {info, tech};
}


function ProductDetailInfo(props) {
    const classes = useStyles()
    const rows = []
    const { product } = props
    const info = product.infoproductelectric || product.infoproductbook || null 
    if(info !== null) {
        for (const [key, value] of Object.entries(info)) {
            rows.push(createData(key,value))
        }
    }    
    return (
        <Box p={2}>
            <Typography className={classes.title}>Thông Tin Chi Tiết</Typography>
            {info !== null && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300, maxWidth:500 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>info </TableCell>
                                <TableCell align="right">Thông Số</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.info}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.info}
                                    </TableCell>
                                    <TableCell align="right">{row.tech}</TableCell> 
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

        </Box>
    );
}

export default ProductDetailInfo;