const bodyParser = require('body-parser');
const express = require('express');
const apiRouter = require('./routes/api')
const app = express();
const port = 3000;
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))//set the body parser as  middleware
app.get('/',(req,res)=>{
    res.status(200).send("Welcome to mini Ecommerce App");
})
app.use('/api',apiRouter);

app.listen(port,()=>{
    console.log("server started successfully...!")
})
