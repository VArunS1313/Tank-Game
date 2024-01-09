const express=require('express');
const { createServer } = require("http");
const { resolve } = require('path');
const { Server, Socket } = require("socket.io");

const app=express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const loadmap=require('./mapLoader')

let map=null;
 let map2d;
async function main(){
     map2d=await loadmap();
   console.log(map2d)
    io.on("connect",(socket)=>{
    console.log("user connected "+socket.id);
     socket.emit('map',map2d);
    });
    app.use(express.static("public"));



httpServer.listen(5000);
    
}
main();



///////npm run dev