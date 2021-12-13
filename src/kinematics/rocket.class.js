import { Kinematic, LayerPath } from '../../node_modules/streetzero/dist/streetzero.esm.js';
import { Sounds } from '../resources/sounds.class.js';

export class Rocket extends Kinematic {
    #primaryColor;
    constructor(canvas, color, x, y) {
        Sounds.shoot()
        super(canvas, x , y, 30, 10);
        this.#primaryColor = color;
        this.initLayer();
        this.gravity = 0;
    }
    initLayer() {
        const shoot = new Path2D();
        const center = 5;
        shoot.moveTo(0, center-2);
        shoot.lineTo(20, center-2);
        shoot.lineTo(25, center);
        shoot.lineTo(20, center+2);
        shoot.lineTo(0, center+2);
        shoot.lineTo(0, center-2);
        shoot.closePath();
        
            /*
        shoot.rect(0, center-2, 20, 4); // Gun
        shoot.rect(5, center-7.5, 2, 15);// Fly
        shoot.rect(0, center-7.5, 3, 15);// Fly
        */
        const flame = new Path2D();
        flame.ellipse(0, center, 10,  4, 0, 0,Math.PI*2); // llama
        
        const flame2 = new Path2D();
        flame2.ellipse(2, center, 8,  2, 0, 0,Math.PI*2); // llama

        super.setLeyers([ new LayerPath(shoot, this.#primaryColor, this), new LayerPath(flame, 'red', this), new LayerPath(flame2, 'yellow', this)]);
    }

    hasColision(element){
        if(super.hasColision(element)){
            Sounds.explosion();
            super.destroy();
            return true;
        }
        return false;
    }

}   
