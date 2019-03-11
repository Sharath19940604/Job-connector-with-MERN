const express = require('express');
const bodyParser = require('body-Parser');
const mongoose = require('mongoose');

const itemsnew = require('./routes/api/itemsnew');
const dinsi = require('./routes/api/dinsinew');

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys.js').mongoURI;

mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected:'))
    .catch(err => console.log(err));

    app.use('/api/itemsnew',itemsnew);
    app.use('/api/dinsinew',dinsi);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
