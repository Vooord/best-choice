import React from 'react';

import AdminMainTable from './AdminMainTable';
import StudentMainTable from './StudentMainTable';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    preloaderWrapper: {
        marginTop: '30px',
        textAlign: 'center',
    },
    preloader: {
        color: theme.palette.info.main,
    },
}));

const Preloader = () => {
    const classes = useStyles();

    return (
        <div className={classes.preloaderWrapper}>
            <CircularProgress className={classes.preloader} size={50} />
        </div>
    );
};

const MainTableSwitcher = props => {
    const { isAdmin } = props;
    if (isAdmin === undefined) {
        return <Preloader />;
    }

    return isAdmin
        ? <AdminMainTable />
        : <StudentMainTable />;
};

const mapStateToProps = state => {
    const { isAdmin } = state.user.current;
    return {
        isAdmin,
    };
};

export default connect(mapStateToProps)(MainTableSwitcher);
