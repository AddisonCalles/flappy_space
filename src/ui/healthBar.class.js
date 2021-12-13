import { Drawable } from "../../node_modules/streetzero/dist/streetzero.esm.js";
import { Health } from "../../node_modules/streetzero/dist/streetzero.esm.js";

export class HealthBar extends Drawable {
    #health = new Health();

    constructor(canvas, x, y, width, height, health) {
        super(canvas, x, y, width, height)
        this.#health = health;
    }
    render(background = 'grey', color = 'green'){
        const unitWidth = this.width / this.#health.total;
        const widthLife = this.#health.current * unitWidth;
        const border = parseInt(0.2 * this.height);
        const font = this.height < 8? 8 : this.height
        this.context.strokeStyle = background;
        this.context.fillStyle = color;

        const height = this.height + (border * 2);
        const width =this.width + (border * 2);
        this.context.strokeRect(this.x, this.y,width, height );
        this.context.fillRect(this.x + border, this.y + border, widthLife, this.height);
        this.context.fillStyle = 'orange';
        this.context.font = `${font}px Arial`;
        this.context.fillText(`${parseInt((this.health.current/this.health.total) *100)}%`, this.x, this.y + height+10);
    }
    get health() { return this.#health; }
}