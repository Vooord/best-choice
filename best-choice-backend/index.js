const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const port = 5000;
const host = 'localhost';


app.get('/', (req, res) => res.send('Hello World!'));

app.post('/auth', (req, res) => {
    console.log('req = ', req);
    console.log('res = ', res);
    res.send(JSON.stringify({id: 123}));
});

app.listen(port, host, () => console.log(`Server started at http://${host}:${port}`));
