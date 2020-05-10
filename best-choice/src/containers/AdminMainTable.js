import React from 'react';
import {connect} from 'react-redux';

import AdminMainTableComponent from '../components/AdminMainTable';

const AdminMainTable = () => (
    <AdminMainTableComponent/>
);

export default connect()(AdminMainTable);
