import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link, Redirect } from 'react-router-dom';
import Copyright from './CopyRight';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const label = {
    LOGIN: 'Логин',
    PASSWORD: 'Пароль',
};

const text = {
    SIGN_IN: 'Войти',
    REGISTER_REDIRECT: 'Еще нет аккаунта? Зарегистрируйтесь',
};

export default function AuthPage(props) {
    const {
        login, password,
        changeLogin, changePassword,
        onSubmit: onSubmitDispatch,
    } = props;

    const onSubmit = event => {
        event.preventDefault();
        return onSubmitDispatch();
    };

    const classes = useStyles();

    return (
        localStorage.getItem('token')
            ? <Redirect to={{ pathname: '/', state: { from: '/auth' } }} />
            : (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <form className={classes.form} onSubmit={onSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label={label.LOGIN}
                                value={login || ''}
                                onChange={changeLogin}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label={label.PASSWORD}
                                type="password"
                                value={password || ''}
                                onChange={changePassword}
                            />
                            {/* <FormControlLabel */}
                            {/*    control={<Checkbox value="remember" color="primary" />} */}
                            {/*    label="Remember me" */}
                            {/* /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {text.SIGN_IN}

                            </Button>
                            <Grid container justify="flex-end">
                                {/* <Grid item xs> */}
                                {/*    <Link href="#" variant="body2"> */}
                                {/*        Forgot password? */}
                                {/*    </Link> */}
                                {/* </Grid> */}
                                <Grid item>
                                    <Link to="/register">{text.REGISTER_REDIRECT}</Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
            )
    );
}
