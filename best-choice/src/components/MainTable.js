import React from 'react';

import {omit, pick, keys, entries} from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    headCell: {
        border: `2px solid ${theme.palette.grey[500]}`,
        fontWeight: 'bold',
    },
    tableCell: {
        border: `1px solid ${theme.palette.grey[300]}`,
    },
}));

const headers = {
    title: 'Тема',
    adviser: 'Научрук',
    // subject: 'Предмет',
    owner: 'Исполнитель',
};



const MainTable = props => {
    const {topics, onOccupyButtonClick} = props;
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
                            <TableCell component="th" scope="row" className={classes.tableCell}>{topic.title}</TableCell>
                            {entries(omit(pick(topic, keys(headers)), ['title', 'owner'])).map(([k, v]) =>
                                <TableCell
                                    key={k}
                                    className={classes.tableCell}
                                    align={'right'}
                                >{v}</TableCell>)
                            }
                            <TableCell className={classes.tableCell} align={'center'}>{
                                topic.owner ||
                                <Button variant="outlined" onClick={() => onOccupyButtonClick(topic.title)}
                                >{'Занять'}</Button>
                            }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MainTable;
