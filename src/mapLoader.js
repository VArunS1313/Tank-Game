const tmx = require('tmx-parser');
async function loadmap(){
map=await new Promise((resolve,rejects)=>{
  tmx.parseFile('./src/map.tmx', function(err, Loadmap) {
      if (err) return rejects(err);
      resolve(Loadmap)
    //  console.log(map);
    });
})
const layers=map.layers[0];
const tiles=layers.tiles
//console.log(tiles);
const map2d=[]

for(let row=0;row<map.height;row++)
{
let tilerow=[]
for(let col=0;col<map.width;col++)
{const tile=tiles[row*map.height+col];
  //console.log(tile.gid+"opppp");
  tilerow.push({id:tile.id,gid:tile.gid});
}
//console.log(tilerow[0].id+"\n");
map2d.push(tilerow);
}
//console.log(map2d)
return map2d;}
module.exports=loadmap;