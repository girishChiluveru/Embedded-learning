//rest api
//soop anpi
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded())
app.get('/',(req,res)=>{
    res.send("Hi");
})
app.use('/public',express.static)
app.post('/register',(req,res)=>{
    console.log(req.body);
    res.send("received");
})

app.listen(4000,()=>{
    console.log("listening in 4000 port");
})