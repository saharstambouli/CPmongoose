const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json())
const PORT = 5000



app.use('/user',require('./routes/user.routes'))





mongoose.connect('mongodb+srv://sahar:sahar@cluster0.lsgwn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>  console.log('DataBase connected !!'))
.catch((err)=> console.log('err', err))

app.listen(PORT,(err)=>{
    err ? console.log('err', err) : console.log(`server is running on port : ${PORT}`)
})