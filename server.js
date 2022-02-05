const express = require('express');
const dotenv = require('dotenv');

//Route files
const hospitals = require ('./routes/hospitals');

//Load env vars
dotenv.config({path:'./config/config.env'});

const app=express();

app.use('/api/v1/hospitals',hospitals);

const PORT=process.env.PORT || 3000;
app.listen(PORT, console.log('Server runnig in', process.env.NODE_ENV, 'mode on port', PORT));