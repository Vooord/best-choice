import React, { useState } from 'react';
import {EditingState} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table, TableHeaderRow, TableEditRow, TableEditColumn,
    DragDropProvider,
    TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';



const rows = [
    {
        'title': 'Тема курсовой',
        'owner': null,
        'adviser': 'AVordovak AVord',
    },
    {
        'title': 'Другая тема курсовой',
        'owner': null,
        'adviser': 'AVordovak AVord',
    },
];
const setRows = () => console.log('rows update');

const columns = [
    { name: 'title', title: 'Тема' },
    { name: 'adviser', title: 'Научрук' },
    { name: 'owner', title: 'Исполнитель' },
];
const tableColumnExtensions = [
    { columnName: 'owner', width: 180, align: 'right' },
];




const AddButton = ({ onExecute }) => (
    <div style={{ textAlign: 'center' }}>
        <Button
            color="primary"
            onClick={onExecute}
            title="Create new row"
        >
            New
        </Button>
    </div>
);

const EditButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Edit row">
        <EditIcon />
    </IconButton>
);

const DeleteButton = ({ onExecute }) => (
    <IconButton
        onClick={() => {
            // eslint-disable-next-line no-alert
            if (window.confirm('Are you sure you want to delete this row?')) {
                onExecute();
            }
        }}
        title="Delete row"
    >
        <DeleteIcon />
    </IconButton>
);

const CommitButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Save changes">
        <SaveIcon />
    </IconButton>
);

const CancelButton = ({ onExecute }) => (
    <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
        <CancelIcon />
    </IconButton>
);


const commandComponents = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
    const CommandButton = commandComponents[id];
    return (
        <CommandButton
            onExecute={onExecute}
        />
    );
};



const Cell = props => <Table.Cell {...props} />;

const EditCell = props => <TableEditRow.Cell {...props} />;

const getRowId = row => row.title;



const AdminMainTable = () => {
    const [editingRowIds, getEditingRowIds] = useState([]);
    const [addedRows, setAddedRows] = useState([], value => console.log('setAddedRows value = ', value));
    const [rowChanges, setRowChanges] = useState({}, value => console.log('setRowChanges value = ', value));
    const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE]);

    const changeAddedRows = value => setAddedRows(value);


    const deleteRows = deletedIds => {
        console.log('deleteRows deletedIds = ', deletedIds);
        const rowsForDelete = rows.slice();
        deletedIds.forEach(rowId => {
            const index = rowsForDelete.findIndex(row => row.id === rowId);
            if (index > -1) {
                rowsForDelete.splice(index, 1);
            }
        });
        return rowsForDelete;
    };

    const commitChanges = ({ added, changed, deleted }) => {
        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            changedRows = deleteRows(deleted);
        }

        console.log('commitChanges added, changed, deleted = ', added, changed, deleted);
        setRows(changedRows);
    };

    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            >
                <EditingState
                    editingRowIds={editingRowIds}
                    onEditingRowIdsChange={getEditingRowIds}
                    rowChanges={rowChanges}
                    onRowChangesChange={setRowChanges}
                    addedRows={addedRows}
                    onAddedRowsChange={changeAddedRows}
                    onCommitChanges={commitChanges}
                />

                <DragDropProvider />

                <Table
                    columnExtensions={tableColumnExtensions}
                    cellComponent={Cell}
                />
                <TableHeaderRow />

                <TableEditRow cellComponent={EditCell}/>

                <TableEditColumn
                    width={170}
                    showAddCommand={!addedRows.length}
                    showEditCommand
                    showDeleteCommand
                    commandComponent={Command}
                />

                <TableFixedColumns
                    leftColumns={leftFixedColumns}
                />
            </Grid>
        </Paper>
    );
};

export default AdminMainTable;
