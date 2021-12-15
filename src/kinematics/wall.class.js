import { Kinematic, math } from '../../node_modules/streetzero/dist/streetzero.esm.js';
import { WallDrag } from '../drawings/wall.drag.js';
import { Colors } from '../ui/colors.js';


export class Wall extends Kinematic {
    
    #pointsTaken = false;
    holePosition;
    hole;
    player;
    constructor(_canvas, _color, hole, holePosition, player) {
        super(_canvas, _canvas.width,0, 30, _canvas.height);
        super.enableVectorRotation = false;
        super.enableGravity = false;
        super.gravity = 0;
        this.player = player;
        super.debug = true;
        this.holePosition = math.toFixed(holePosition);
        this.hole =  math.toFixed(hole);
        super.setLeyers(WallDrag(_color, this.hole, this.holePosition, _canvas.height, this));
    }

    render()
    {
        super.render();
        
        if(super.isDebug){
            const hole = this.holeRange()
            super.context.fillStyle = 'red';
            const rectP1 = new Path2D();
            rectP1.rect(this.x, hole.p1, 40, 1);
            super.context.fill(rectP1);
            const rectP2 = new Path2D();
            rectP2.rect(this.x, hole.p2, 40, 1);
            super.context.fill(rectP2);
    
    
            
            super.context.fillStyle = Colors.title;
            super.context.font = "8px Arial";
            super.context.fillText(
                `Hole: ${this.hole}   Pos: ${this.holePosition}`,
                this.x + 20,
                this.canvas.height / 2 + 50,
            );
        }

    }
    reset() {
    }

    isInHole(){   
        return math.intersectionRanges( {p1: math.toFixed(this.player.y), p2: math.toFixed(this.player.y2)}, this.holeRange(this.player));
    }

    holeRange(){
        return {p1: math.toFixed(this.holePosition + this.player.height + 2), p2: math.toFixed(this.holePosition + this.hole - ( this.player.height) )}
    }

    isTake(){
        return this.#pointsTaken;
    }

    take(){
        this.#pointsTaken = true;
    }
}