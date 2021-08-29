//const winston = require("winston");
const config = require("config");
const express = require('express');
const fs=require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
// import routes
const clinicsRoute = require('./routes/clinics');

// app
const app = express();

// middlewares

app.use(bodyParser.json());
app.use(cors());

// routes middleware


app.use('/api', clinicsRoute);




const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
 console.log(`Listening on port ${port}...`)
);
module.exports = server;