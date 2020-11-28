import React, { useState } from 'react';
import { EditingState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
    TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import EditIcon from '@material-ui/icons/EditTwoTone';
import AddIcon from '@material-ui/icons/NoteAddTwoTone';
import SaveIcon from '@material-ui/icons/SaveTwoTone';
import CancelIcon from '@material-ui/icons/CancelTwoTone';

import { entries } from 'lodash';

import LogoutButton from '../containers/LogoutButton';

const AddButton = ({ onExecute }) => (
    <IconButton color="primary" onClick={onExecute} title="Добавить"><AddIcon /></IconButton>
);

const DeleteButton = ({ onExecute }) => (
    <IconButton
        title="Удалить"
        color="secondary"
        onClick={() => {
            if (window.confirm('Вы уверены, что хотите удалить эту строку?')) {
                onExecute();
            }
        }}
    >
        <DeleteIcon />
    </IconButton>
);

const EditButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Изменить">
        <EditIcon />
    </IconButton>
);

const CommitButton = ({ onExecute }) => (
    <IconButton color="primary" onClick={onExecute} title="Сохранить">
        <SaveIcon />
    </IconButton>
);

const CancelButton = ({ onExecute }) => (
    <IconButton color="secondary" onClick={onExecute} title="Отменить">
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

const columns = [
    { name: 'title', title: 'Тема' },
    { name: 'adviser', title: 'Научрук' },
    { name: 'group', title: 'Группа' },
    { name: 'owner', title: 'Исполнитель' },
];

const Cell = props => (
    <Table.Cell
        {...props}
        style={{
            border: '1px solid #e0e0e0',
        }}
    />
);

const HeaderCell = props => (
    <Table.Cell
        {...props}
        style={{
            border: '1px solid #e0e0e0',
            fontWeight: 'bold',
        }}
    />
);

const EditCell = props => <TableEditRow.Cell {...props} />;

const getTopicId = topic => topic.id;

const AdminMainTable = props => {
    const {
        topics, updateTopics, addTopics, deleteTopics,
    } = props;

    const [addedRows, setAddedRows] = useState([]);
    const changeAddedRows = value => setAddedRows(value);
    const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE]);

    const commitChanges = ({ added, changed, deleted }) => {
        if (added) {
            addTopics(added);
        }

        if (changed) {
            const notEmptyChanged = (entries(changed).filter(([_, v]) => v));
            if (notEmptyChanged.length) {
                updateTopics(notEmptyChanged);
            }
        }

        if (deleted) {
            deleteTopics(deleted);
        }
    };

    return (
        <Paper>
            <Grid
                rows={topics}
                columns={columns}
                getRowId={getTopicId}
            >
                <EditingState
                    onAddedRowsChange={changeAddedRows}
                    onCommitChanges={commitChanges}
                />

                <Table cellComponent={Cell} />

                <TableHeaderRow cellComponent={HeaderCell} />

                <TableEditRow cellComponent={EditCell} />

                <TableEditColumn
                    width={170}
                    showAddCommand={!addedRows.length}
                    showDeleteCommand
                    showEditCommand
                    commandComponent={Command}
                />

                <TableFixedColumns
                    leftColumns={leftFixedColumns}
                />
            </Grid>
            <LogoutButton />
        </Paper>
    );
};

export default AdminMainTable;
