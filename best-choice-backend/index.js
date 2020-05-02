const express = require('express');
const cors = require('cors');

const authRouter = require('./app/routes/auth.routes');

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors());

const port = 5000;
const host = 'localhost';


app.get('/', (req, res) => res.send('Hello World!'));

authRouter(app);
app.listen(port, host, () => console.log(`Server started at http://${host}:${port}`));
