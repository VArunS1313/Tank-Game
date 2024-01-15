const express=require('express');
const { createServer } = require("http");
const { resolve } = require('path');
const { Server, Socket } = require("socket.io");

const app=express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const loadmap=require('./mapLoader')
const Tick_rate=30;
let map=null;
const speed=5;
let players=[];
let inputbyuser={};
 let map2d;
 function tick(){
  for(const player of players)
  {
    const input=inputbyuser[player.id];
    if(input.value===-1)
    {
      player.y-=speed;
    }else if(input.value===1)
    {
      player.y+=speed;
    }
    if(input.value===-2)
    {
      player.x-=speed;
    }
    if(input.value===2)
    {
      player.x+=speed;
    }

  }
  io.emit("players",players);
 }
async function main(){
     map2d=await loadmap();
   //console.log(map2d)
    io.on("connect",(socket)=>{
    console.log("user connected "+socket.id);
    inputbyuser[socket.id]={
     value:0
    }
    players.push({
      id:socket.id,
      x:0,
      y:0
    })
     socket.emit('map',map2d);

     socket.on('input',(input)=>{
      inputbyuser[socket.id]=input;
     console.log(input)
     })
     socket.on("disconnect",()=>{
      players=players.filter((player)=>player.id!==socket.id)
     })

    });
    app.use(express.static("public"));



httpServer.listen(5000);
setInterval(tick,1000/Tick_rate)
    
}
main();



///////npm run dev