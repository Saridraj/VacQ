const express = require('express');
const dotenv = require('dotenv');
const cookieParser=require('cookie-parser');
const connectDB = require('./config/db');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp=require('hpp');
const cors = require('cors');



//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

//Route files
const hospitals = require ('./routes/hospitals');
const appointments = require('./routes/appointments');
const auth = require('./routes/auth');

const app=express();
const mongoSanitize = require('express-mongo-sanitize');


app.use(helmet());


//Body parser
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());

//Rate limiting
const limiter = rateLimit({
    windowsMs:10*60*1000,//10mins
    max: 1
});
app.use(limiter);

//Prevent http param pollutions
app.use(hpp());

//Enable CORS
app.use(cors());

//Cookie parser
app.use(cookieParser());

app.use('/api/v1/hospitals',hospitals);
app.use('/api/v1/appointments', appointments)
app.use('/api/v1/auth',auth);




const PORT=process.env.PORT || 3000;
const server = app.listen(PORT, console.log('Server runnig in', process.env.NODE_ENV, 'mode on port', PORT));

//Handle unhandle promise rejection
process.on('unhandleRejection' ,(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});