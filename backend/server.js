const express = require('express');
const cors = require('cors');  
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const dbConnect = require('./config/db');
const router = require('./routes/routes');

dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  credentials: true  
}));

let PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});


app.use(cookieParser());


dbConnect();


app.use(express.json());


app.use('/base', router);
