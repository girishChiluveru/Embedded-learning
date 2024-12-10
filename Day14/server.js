//get all lib needed=>http,//fs,
//make listening at a port//when a req,res
let http = require("http");
const server = http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'application/json'});
    res.end(JSON.stringify({//web server
        data:"Hello world!!",
    }))
}) 
