import { Checkbox, FormGroup, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import brandApi from '../../../../api/brandApi';

FilterByBrand.propTypes = {
    onChange: PropTypes.func,
};
FilterByBrand.defaultProps = {
    onChange: null,
};
const useStyles = makeStyles({
    brandList: {
        listStyle: 'none',
        padding: '0',
        margin: '0',
    },
    active: {
        color: '#d0011b',
    },
    brandItem: {
        display: 'flex',
        padding: '0px 6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
    },
});
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function FilterByBrand(props) {
    const classes = useStyles();
    const { onChange } = props
    const [listBrand, setListBrand] = useState([])
    const [listCheck, setListCheck] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const response = await brandApi.getAll()
                console.log(response)
                setListBrand(response)
            }
            catch (error) {
                console.log('loi roi', error);
            }

        })()
    }, [])

    const handleClickMenuItem = (e) => {
        const { name, checked } = e.target
        const newListCheck = [...listCheck]
        if (checked === true) {
            newListCheck.push(name)
        }

        else {
            const index = listCheck.findIndex((item) => item === name)
            newListCheck.splice(index, 1)
        }
        console.log(newListCheck);
        setListCheck(newListCheck)

        if (onChange) {
            const text = newListCheck.toString();
            console.log(text)
            if (text !== '') {
                onChange(text)
            }
            else {
                onChange(null)
            }

        }
    }
    return (
        <Box>
            <Typography p={1} fontWeight='bold' >Thương Hiệu</Typography>
            <ul className={classes.brandList}>
                {
                    listBrand.map((brand) => {
                        return (
                            <li
                                className={classes.brandItem}
                                key={brand.id}

                            >
                                <Checkbox {...label} name={brand.name}
                                    checked={listCheck.includes(brand.name)}

                                    onChange={handleClickMenuItem}
                                />
                                <Typography>{brand.name}</Typography>
                            </li>
                        )
                    })
                }
            </ul>
        </Box>
    );
}

export default FilterByBrand;