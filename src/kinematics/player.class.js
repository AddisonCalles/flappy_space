import { Kinematic, LayerPath, Health } from '../../node_modules/streetzero/dist/streetzero.esm.js';
import { HealthBar } from '../ui/healthBar.class.js';
import { Sounds } from '../resources/sounds.class.js';
import { Rocket } from './rocket.class.js';
import { SpaceShipV2Drawing } from '../drawings/space-ship-v2.drawing.js';


export class Player extends Kinematic {
    #rockets = [];
    #maxRockts = 6;
    #healthBar;
    #health;
    constructor(_canvas, _color, _x, _y, _health) {
        super(_canvas, _x, _y, 30, 40);
        super.centerOffset();
        this.#health = new Health(_health);
        this.#health.reduceEvent.subscribe(()=>Sounds.shoot2());
        this.#healthBar = new HealthBar(_canvas, 10, 60, (this.canvas.width * 0.2), 8, this.health);
        super.setLeyers(SpaceShipV2Drawing(_color, this));
    }
    reset() {
        this.#rockets = [];
    }
    render() {
        this.#rockets.forEach(rocket => {
            rocket.move();
            rocket.render();
        });
        this.#healthBar.render();
        this.#rockets = this.#rockets.filter(rocket => !rocket.edgeColision() && !rocket.isDestroy());
        super.render();
    }
    fire() {
        if (this.#rockets.length >= this.#maxRockts) return;
        const rocket = new Rocket(canvas, 'gray', this.x + 5, this.y + 15);
        rocket.vector.setVector(15, this.rotation);
        this.#rockets.push(rocket)
    }
    isShootedEnemy(enemy) {
        for (const rocket of this.#rockets) {
            if (rocket.hasColision(enemy)) {
                enemy.health.reduce(1);
                if (enemy.health.isDead) {
                    enemy.destroy();
                }
                return true;
            }
        }
        return false;
    }

    get health() { return this.#health;}
    get rockets() { return this.#rockets; }

}