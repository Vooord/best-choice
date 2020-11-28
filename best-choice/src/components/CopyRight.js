import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            <Link color="inherit" href="http://www.fa.ru/">
                ФИНАНСОВЫЙ УНИВЕРСИТЕТ
            </Link>
            {` © ® 1998-${new Date().getFullYear()}`}
        </Typography>
    );
}

export default Copyright;
