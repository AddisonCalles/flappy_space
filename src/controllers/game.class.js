import { math, EventListener, Game as GameZero, Directions } from '../../node_modules/streetzero/dist/streetzero.esm.js';
import { Sounds } from "../resources/sounds.class.js";
import { Player } from "../kinematics/player.class.js";
import { Colors } from "../ui/colors.js";

export class Game extends GameZero {
    #player;
    #enemies = [];
    #levelText = "";
    #queenLevel = 25;
    #resetText = `Press click to reset...`;

    controls = {
        up: false,
        down: false,
        left: false,
        right: false
    }

    constructor(canvas) {
        super(canvas);
        this.#player = new Player(canvas, '#4f83cc', canvas.width / 2, canvas.height / 2, 15);
        this.#player.vector.setVector(0,0);
        this.#player.gravity = 6.5;
        this.#player.enabledVectorRotation = false;
    }

    onPreload() {
        const gameRef = this;
        this.#player.health.deadEvent.subscribe(() => {
            super.gameOver = true;
        })
    }

    onFire() {
        //console.log("Fire..")
        if (!this.isPlay) {
            this.play();
        } else if (this.gameOver) {
            this.reset();
        } else {

            this.player.fire();
        }
    }

    onKeyUp(event){
        console.log(event);
        switch(event.key){
            case 'w': this.controls.up = false; break;
            case 's': this.controls.down = false; break;
            case 'd': this.controls.right = false; break;
            case 'a': this.controls.left = false; break;
        }
    }
    onKeyDown(event){
        console.log(event);
        switch(event.key){
            case 'w': this.controls.up = true; break;
            case 's': this.controls.down = true; break;
            case 'd': this.controls.right = true; break;
            case 'a': this.controls.left = true; break;
        }
    }

    onMouseMove(event) {
        this.player.rotateTo({ x: event.offsetX, y: event.offsetY });
    }

    onRender() {
        if (super.gameover) {
            this.#gameOverScreen()
            return;
        }
        
        super.context.fillStyle = Colors.background;
        super.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.isPlay) {
            const playerColisions = this.#player.edgeColision();
            if(this.controls.up){
                this.player.vector.setVelXY(this.player.vector.vel.x,this.player.vector.vel.y - 2.3333);
            }
            if ( playerColisions && playerColisions.includes(Directions.bottom) && this.#player.vector.vel.y >= 0){
                this.#player.enabledGravity = false;
                this.#player.vector.setVector(0,0);
            }else{
                this.#player.enabledGravity = true;
            }
                this.#player.move()
                this.#player.render();

            if (this.#levelText != '') {
                super.context.font = "20px Arial";
                super.context.fillStyle = Colors.title;
                super.context.fillText(this.#levelText, (this.canvas.width / 2) - 25, this.canvas.height / 2);
                super.context.font = "10px Arial";
                super.context.fillText('Created by Addison Calles', (this.canvas.width / 2) - 50, (this.canvas.height / 2) + 20);
            }
        }
    }
    onNextLevel() {
        this.#levelText = `Level ${super.level}`;
        setTimeout(() => {
            this.#levelText = ``;
        }, 3000);
    }
    #gameOverScreen() {
        super.context.font = "40px Arial";
        super.context.fillStyle = 'gray';
        super.context.fillText(`Game Over`, (this.canvas.width / 2) - 100, this.canvas.height / 2);
        super.context.font = "18px Arial";
        super.context.fillText(`Reset in ${super.secondsToReset} seconds...`, (this.canvas.width / 2) - 100, (this.canvas.height / 2) + 35);
    }
    get enemies() { return this.#enemies; }
    get player() { return this.#player; }
}