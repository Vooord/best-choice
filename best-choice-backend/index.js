const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const jwt = require('./app/helpers/jwt');
const errorHandler = require('./app/helpers/errorHandler');

const userRouter = require('./app/routes/user');
const topicRouter = require('./app/routes/topic');
const adviserRouter = require('./app/routes/adviser');

const connectionConfig = require('./app/config/connection');
const dbConfig = require('./app/config/db');
const serverConfig = require('./app/config/server');


const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors());

app.use(jwt());
app.use(errorHandler);

app.use('/users', userRouter);
app.use('/topics', topicRouter);
app.use('/advisers', adviserRouter);


// подключаемся к монге
const mongoUrl = process.env.MONGODB_URL || dbConfig.path;
mongoose.connect(mongoUrl, connectionConfig.options)
    .catch(err => console.log(`Error while connecting to ${mongoUrl}: ${err}`));

const {port, host} = serverConfig;
app.listen(port, host, () => console.log(`Server started at http://${host}:${port}`));
