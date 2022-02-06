const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');



//Route files
const hospitals = require ('./routes/hospitals');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

const app=express();
//Body parser
app.use(express.json());

app.use('/api/v1/hospitals',hospitals);

const PORT=process.env.PORT || 3000;
const server = app.listen(PORT, console.log('Server runnig in', process.env.NODE_ENV, 'mode on port', PORT));

//Handle unhandle promise rejection
process.on('unhandleRejection' ,(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});