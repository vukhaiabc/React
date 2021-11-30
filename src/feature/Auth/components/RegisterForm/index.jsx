import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import LinearProgress from '@mui/material/LinearProgress';
import { makeStyles } from '@mui/styles';


RegisterForm.propTypes = {
    onSubmit : PropTypes.func,
};
const useStyles = makeStyles({
    progresslinear: {
        margin : "20px 10px"
    },
    
});
const schema = yup.object({
    firstName: yup.string().required('Vui Lòng Nhập FirstName!'),
    lastName: yup.string().required('Vui Lòng Nhập Last Name!'),
    email: yup.string().required('Vui Lòng Nhập Email!').email('Vui Lòng Nhập Đúng Định Dạng Email'),
    password :yup.string().required('Vui Lòng Nhập Mật Khẩu!').min(6,'Mật khẩu tối thiểu 6 kí tự'),
    confirmpassword: yup.string().required('Hãy Nhập Lại Mật Khẩu!')
        .min(6,'Mật khẩu tối thiểu 6 kí tự')
        .oneOf([yup.ref('password')],'Mật khẩu không khớp!'),
}).required();

const theme = createTheme();

export default function RegisterForm(props) {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors, touchedFields,isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });
    const handleOnSubmit = async (e) => {
        const {onSubmit} = props
        if(!onSubmit) return;
        await onSubmit(e)
      };
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <ThemeProvider theme={theme}>
           
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                        Sign up
                    </Typography>
                    <form onSubmit={handleSubmit(handleOnSubmit)} sx={{ mt: 2 }}>
                 
                    {isSubmitting && <LinearProgress color="success" width= "100%" className={classes.progresslinear} />}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>

                                <TextField
                                    {...register("firstName")}
                                    error={!!(errors['firstName'])}
                                    helperText={errors.firstName?.message}

                                    name="firstName"
                     
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    {...register("lastName")}
                                    error={!!(errors['lastName'])}
                                    helperText={errors.lastName?.message}
                                  
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("email")}
                                    error={!!( errors['email'])}
                                    helperText={errors.email?.message}
                               
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl error={!!errors['password']} sx={{ m: 0, width: '100%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        {...register("password")}
                                        error={!!errors['password']}
                                       
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        fullWidth
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        name='password'
                                    />
                                    <FormHelperText id="outlined-weight-helper-text">{errors.password?.message}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("confirmpassword")}
                                    error={!!(errors['confirmpassword'])}
                                    helperText={errors.confirmpassword?.message}
                               
                                    fullWidth
                                    id="confirmpassword"
                                    label="Confirm Password"
                                    name="confirmpassword"
                                    autoComplete="confirmpassword"
                                    type ='password'
                                    
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="Chấp Nhận Các Điều Khoản của Công Ty"
                                />
                            </Grid>
                            
                        </Grid>
                        <Button
                            disabled = {isSubmitting}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng Kí
                        </Button>
                        
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}