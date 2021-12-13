import { Kinematic } from '../../node_modules/streetzero/dist/streetzero.esm.js';
import { WallDrag } from '../drawings/wall.drag.js';


export class Wall extends Kinematic {
    
    constructor(_canvas, _color, hole, holePosition) {
        super(_canvas, _canvas.width,0, 30, _canvas.height);
        super.enableVectorRotation = false;
        super.enableGravity = false;
        super.gravity = 0;
        super.debug = true;
        super.setLeyers(WallDrag(_color, hole, holePosition, _canvas.height, this));
    }
    reset() {
    }
}