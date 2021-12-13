import { LayerPath } from '../../node_modules/streetzero/dist/streetzero.esm.js';



const wall = (hole, holePosition, large)=>{
    const wall = new Path2D();
    wall.rect(0,0,30,holePosition);
    wall.rect(0,holePosition+hole,30,large - hole - holePosition );
    return wall;
}



export const WallDrag = (color, hole, holePosition, large, element)=>([
    new LayerPath(wall(hole, holePosition, large), color, element),
])
