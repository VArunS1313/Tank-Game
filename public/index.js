

// const socket=io('ws://localhost:5000');
// const mapImg=new Image()
//  mapImg.src='./snowy.png';
//  const canvashtmp=document.getElementById("canvas")
//  canvashtmp.width=window.innerWidth;
//  canvashtmp.height=window.innerHeight;
//  const canvas=canvashtmp.getContext("2d")
// // mapImg.src
// socket.on("connect",()=>{
//     console.log("connected");
// });

// const tile_size=32
// let map=[[]];
// socket.on('map',(loadmap)=>{
//   console.log(loadmap);
//    map=loadmap
 
// })
// function draw(){
//     const tilerow=8;
    
//  canvas.clearRect(0,0,canvas.width,canvas.height)
//    for(let i=0;i<map.length;i++)
//    {
//     for(let j=0;j<map[0].length;j++)
//     {  
//           console.log("opp"+map[0].length)
//         const {id}=map[i][j];
//         const simr=parseInt(id/tilerow)
//         const simc=id%tilerow;
//         console.log("opp😊"+"ppp"+map[0].length)
      
//         // // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
//         canvas.drawImage(mapImg,simc*tile_size,simr*tile_size,tile_size,tile_size,j*tile_size,i*tile_size,tile_size,tile_size)
      
//     }
//    }
   
//    window.requestAnimationFrame(draw);
//    // console.log("123")
// }
// window.requestAnimationFrame(draw)
const socket = io('ws://localhost:5000');
const mapImg = new Image();
mapImg.src = './snowy.png';
const duck=new Image();
duck.src='./duck.png';

const canvasElem = document.getElementById("canvas");
canvasElem.width = window.innerWidth;
canvasElem.height = window.innerHeight;

const canvas = canvasElem.getContext("2d");

let map = [[]];
const scalingFactor = 0.3;
const tile_size=32
socket.on('connect', () => {
    console.log("connected");

});


socket.on('map', (loadmap) => {
    map = loadmap;
});
// canvasElem.width = map[0].length * tile_size * scalingFactor;
// canvasElem.height = map.length * tile_size * scalingFactor;
let players=[];
let bullets=[];
socket.on('players',(serverplayer)=>{
    players=serverplayer;
})
socket.on('bullets',(serverbullets)=>{
    bullets=serverbullets;
})
const input={
    value:0
}
window.addEventListener("click", (event)=> {
    // Get the mouse coordinates relative to the canvas
    var mouseX = event.clientX - canvasElem.width  /2;
    var mouseY = event.clientY - canvasElem.height /2;

    
    var theta = Math.atan2(mouseY, mouseX);
// console.log("Mouse Clicked at: X = " + theta);
    socket.emit("fire",theta)
});
window.addEventListener('keydown',(e)=>{
    if(e.key=='w')
    {
        input.value=-1;
    }
    else if(e.key=='a')
    {
        input.value=-2;
    }
    else if(e.key=='s')
    {
        input.value=1;
    }
    else if(e.key=='d')
    {
        input.value=2;
    }
 //   console.log(input);
    socket.emit("input",input)
})
window.addEventListener('keyup',(e)=>{
    if(e.key=='w')
    {
        input.value=0;
    }
    else if(e.key=='a')
    {
        input.value=0;
    }
    else if(e.key=='s')
    {
        input.value=0;
    }
    else if(e.key=='d')
    {
        input.value=0;
    }
   // console.log(e.key);
    socket.emit("input",input)
})
function draw() {
    const tilerow = 8;

    canvas.clearRect(0, 0, canvasElem.width, canvasElem.height);
    const myplayer=players.find((player)=>player.id===socket.id)
    let camx=0;
    let camy=0;
    if(myplayer)
    {
        camx=myplayer.x-canvasElem.width/2;
        camy=myplayer.y-canvasElem.height/2;

    }

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            const { id } = map[i][j];
            const simr = parseInt(id / tilerow);
            const simc = id % tilerow;

            canvas.drawImage(mapImg, simc * tile_size, simr * tile_size, tile_size, tile_size, j * tile_size*scalingFactor-camx, i * tile_size*scalingFactor-camy, tile_size*scalingFactor, tile_size*scalingFactor);
        }
    }
    for(const player of players)
    { //console.log(player.x+" op "+player.y)
        canvas.drawImage(duck,player.x-camx,player.y-camy);
    }
    for(const bullet of bullets)
    { //console.log(bullet.x+" op "+bullet.y)
        canvas.fillStyle="#FFFFF"
        canvas.beginPath();
       // console.log(bullet.x+" byll "+bullet.y);
        canvas.arc(bullet.x-camx, bullet.y-camy, 5, 0, 2 * Math.PI);
        canvas.stroke();
        
        
    }


    // Uncomment the next line if you want to continue the animation
    window.requestAnimationFrame(draw);
}

// Start the animation loop
window.requestAnimationFrame(draw);
