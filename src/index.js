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
const speed=6;
const bulletspeed=7;
let players=[];
let bullets=[];
let inputbyuser={};
 let map2d;
 function tick(delta){
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
 
  for(const bullet of bullets)
  { 
    bullet.x +=Math.cos(bullet.theta)*bulletspeed;
    bullet.y +=Math.sin(bullet.theta)*bulletspeed;
    bullet.timetolive-=delta;

   // console.log(Math.sin(bullet.theta)*bulletspeed);
  }
  bullets=bullets.filter((bullet)=>bullet.timetolive>0);
//console.log(delta);
  io.emit("bullets",bullets);
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
     //console.log(input)
     })
     socket.on('fire',(theta)=>{
      const player=players.find((player)=>player.id==socket.id);
      bullets.push({
        theta,
        x:player.x,
        y:player.y,
        timetolive:1500
      });
     // console.log(theta+" "+player.x)
     })
     socket.on("disconnect",()=>{
      players=players.filter((player)=>player.id!==socket.id)
     })

    });
    app.use(express.static("public"));


let lastUpdate=Date.now();
httpServer.listen(5000);
setInterval(()=>{
  const now=Date.now();
  const delta=now-lastUpdate;
  tick(delta);
  lastUpdate=Date.now();
},1000/Tick_rate)
    
}
main();



///////npm run dev