const express = require('express');
const bodyParser = require('body-parser');

const ApiRoutes = require('./routes/index');

require('dotenv').config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', ApiRoutes);

const server = app.listen(PORT, async () => {
    try {
        console.log(`Server running on PORT: ${PORT}`);
    } catch (err) {
        console.log(err);
    }
})