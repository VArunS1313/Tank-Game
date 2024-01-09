

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

function draw() {
    const tilerow = 8;

    canvas.clearRect(0, 0, canvasElem.width, canvasElem.height);

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            const { id } = map[i][j];
            const simr = parseInt(id / tilerow);
            const simc = id % tilerow;

            canvas.drawImage(mapImg, simc * tile_size, simr * tile_size, tile_size, tile_size, j * tile_size*scalingFactor, i * tile_size*scalingFactor, tile_size*scalingFactor, tile_size*scalingFactor);
        }
    }

    // Uncomment the next line if you want to continue the animation
    window.requestAnimationFrame(draw);
}

// Start the animation loop
window.requestAnimationFrame(draw);
