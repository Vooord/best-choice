import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import {omit, pick, keys, entries} from 'lodash';


const actionButtonStyle = theme => ({
    margin: '10px 5px',
    padding: 10,
    border: `1px solid ${theme.palette.grey[300]}`,
});

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    headCell: {
        border: `2px solid ${theme.palette.grey[500]}`,
        fontWeight: 'bold',
    },
    bodyCell: {
        border: `1px solid ${theme.palette.grey[300]}`,
    },
    buttonCell: {
        padding: 0,
    },
    bottomButtons: {
        textAlign: 'right',
    },
    logoutButton: {
        ...actionButtonStyle(theme),
        color: theme.palette.secondary.main,
    },
    updateButton: {
        ...actionButtonStyle(theme),
        color: theme.palette.primary.main,
    },
}));


const headers = {
    title: 'Тема',
    adviser: 'Научрук',
    // subject: 'Предмет',
    owner: 'Исполнитель',
};

const StudentMainTable = props => {
    const {topics, onOccupyButtonClick, onLogoutClick} = props;
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {entries(headers).map(([id, name]) =>
                            <TableCell
                                key={id}
                                id={id}
                                className={classes.headCell}
                                align={(id === 'title' && 'left') || (id === 'owner' && 'center') || 'right'}
                            >{name}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {topics.map(topic => (
                        <TableRow key={topic.title} className={classes.tableRow}>
                            <TableCell component="th" scope="row" className={classes.bodyCell}>{topic.title}</TableCell>
                            {entries(omit(pick(topic, keys(headers)), ['title', 'owner'])).map(([k, v]) =>
                                <TableCell
                                    key={k}
                                    className={classes.bodyCell}
                                    align={'right'}
                                >{v}</TableCell>)
                            }
                            <TableCell className={`${classes.bodyCell} ${classes.buttonCell}`} align={'center'}>{
                                topic.owner ||
                                <Button size="small" variant="outlined" onClick={() => onOccupyButtonClick(topic.title)}
                                >{'Занять'}</Button>
                            }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.bottomButtons}>
                <Button onClick={() => console.log('UPDATE')} className={classes.updateButton}>{'Обновить'}</Button>
                <Button onClick={onLogoutClick} className={classes.logoutButton}>{'Выйти'}</Button>
            </div>
        </TableContainer>
    );
};

export default StudentMainTable;
