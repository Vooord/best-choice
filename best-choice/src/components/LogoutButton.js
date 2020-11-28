import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    wrapper: {
        textAlign: 'right',
        marginRight: 20,
        padding: 5,
    },
}));

const LogoutButton = props => {
    const { onClick } = props;
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <IconButton color="secondary" onClick={onClick}>
                Выйти
            </IconButton>
        </div>
    );
};

export default LogoutButton;
