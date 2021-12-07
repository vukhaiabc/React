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
    product : PropTypes.object,
};
const useStyles = makeStyles({
    title: {
        fontWeight: '600',
        textTransform: 'uppercase'
    }
})



function ProductDetailInfo(props) {
    const classes = useStyles()
    let rows = []
    const { product } = props
    const info = product.infoproductelectric || product.infoproductbook || null 
    function createData(info, tech) {
        return {info, tech};
    }
    if(info !== null ){
        if(!!info.display_technology) {
            rows = [
                createData('Công Nghệ Màn Hình',info.display_technology),
                createData('Độ Phân Giải Màn Hình',info.screen_resolution),
                createData('Vi xử lý',info.chip),
                createData('Camera',info.camera),
                createData('Bộ Nhớ Ram',info.memory),
                createData('Bộ Nhớ',info.storage),
                createData('Dung lượng Pin',info.battery_capacity),
            ]
        }
        else if(!!info.author){
            rows = [
                createData('Tác Giả',info.author),
                createData('Tiêu Đề',info.headline),
                createData('Chất lượng',info.rating),
                createData('Số Trang',info.number_of_pages),
                createData('Ngày xuất bản',info.pub_date),
            ]
        }
       
    }
    
    return (
        <Box p={2}>
            <Typography className={classes.title}>Thông Tin Chi Tiết</Typography>
            {info !== null && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell  sx={{fontWeight:'bold'}} >Thông Tin</TableCell>
                                <TableCell align="left" sx={{fontWeight:'bold'}}>Thông Số</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.info}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{fontWeight:'bold'}}>
                                        {row.info}
                                    </TableCell>
                                    <TableCell align="left">{row.tech}</TableCell> 
                                    
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