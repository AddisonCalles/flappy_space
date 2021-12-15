import {
    math,
    EventListener,
    Game as GameZero,
    Directions,
} from "../../node_modules/streetzero/dist/streetzero.esm.js";
import { Sounds } from "../resources/sounds.class.js";
import { Player } from "../kinematics/player.class.js";
import { Colors } from "../ui/colors.js";
import { Wall } from "../kinematics/wall.class.js";

export class Game extends GameZero {
    #player;
    #walls = [];
    #levelText = "";
    #resetText = `Press click to reset...`;
    debug = false;
    controls = {
        up: false,
        down: false,
        left: false,
        right: false,
    };

    constructor(canvas) {
        super(canvas);
    }

    onPreload() {
        super.speed = 60;
        const gameRef = this;
        this.#player = new Player(
            canvas,
            "#4f83cc",
            /*  canvas.width / 2,
              canvas.height / 2,*/
            250, 100,
            15
        );
        this.#player.debug = true;
        this.#player.vector.setVector(0, 0);
        this.#player.gravity = 6.5;
        this.#player.enabledVectorRotation = false;
        this.#player.health.deadEvent.subscribe(() => {
            super.gameOver = true;
        });

        if (this.debug) this.#player.enableDebug();
        setInterval(() => {
            if (this.isPlay) this.makeWall();
        }, 2000);
    }

    onFire() {
        if (!this.isPlay) {
            //this.play();
        } else if (this.gameOver) {
            this.reset();
        } else {
            //this.player.fire();
        }
    }

    onTouchStart(event) {
        this.controls.up = true;
    }

    onTouchEnd(event) {
        this.controls.up = false;
    }
    onTouchCancel(event) {
        this.controls.up = false;
    }
    onKeyUp(event) {
        switch (event.key) {
            case "w":
                this.controls.up = false;
                break;
            case "s":
                this.controls.down = false;
                break;
            case "d":
                this.controls.right = false;
                break;
            case "a":
                this.controls.left = false;
                break;
            case " ":
                this.controls.up = false;
                break;
        }
    }
    onKeyDown(event) {
        switch (event.key) {
            case "w":
                this.controls.up = true;
                break;
            case "s":
                this.controls.down = true;
                break;
            case "d":
                this.controls.right = true;
                break;
            case "a":
                this.controls.left = true;
                break;
            case " ":
                this.controls.up = true;
                break;
        }
    }

    onMouseMove(event) {
        //this.player.rotateTo({ x: event.offsetX, y: event.offsetY });
    }

    onRender() {
        super.context.fillStyle = Colors.background;
        super.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (super.gameover) {
            this.#gameOverScreen();
            return;
        }

        this.#walls = this.#walls.filter((wall) => !wall.isDestroy());

        for (const wall of this.#walls) {
            wall.render();

            if (this.isPlay) {
                const colision = wall.edgeColision();
                wall.move();
                if (colision && colision.includes("left")) {
                    wall.destroy();
                }
                if (this.#player.hasColision(wall)) {
                    if (!wall.isTake()) {
                        wall.take();
                        console.log("point")
                        this.incrementPoints()
                    }
                    if (wall.isInHole(this.#player)) {
                        if (this.debug) {
                            super.context.font = "20px Arial";
                            super.context.fillStyle = "green";
                            super.context.fillText(
                                "In Hole",
                                this.canvas.width / 20,
                                this.canvas.height / 2
                            );
                        }
                    } else {
                        if (this.debug) {
                            super.context.font = "20px Arial";
                            super.context.fillStyle = "red";
                            super.context.fillText(
                                "Dead",
                                this.canvas.width / 20,
                                this.canvas.height / 15
                            );
                        }
                        super.pause();
                    }
                }

            }

        }
        this.renderInfo();
        if (this.isPlay) this.playerUpdate();
        this.#player.render();

        if (this.#levelText != "") {
            super.context.font = "20px Arial";
            super.context.fillStyle = Colors.title;
            super.context.fillText(
                this.#levelText,
                this.canvas.width / 2 - 25,
                this.canvas.height / 2
            );
            super.context.font = "10px Arial";
            super.context.fillText(
                "Created by Addison Calles",
                this.canvas.width / 2 - 50,
                this.canvas.height / 2 + 20
            );
        }

    }

    renderInfo() {
        super.context.font = "14px Arial";
        super.context.fillStyle = Colors.title;
        super.context.fillText(
            `Points: ${this.points}`,
            this.canvas.width / 2 - 25,
            this.canvas.height / 2
        );
    }

    makeWall() {
        console.log("make wall...");
        const min = this.canvas.height * 0.3;
        const max = this.canvas.height * 0.6;
        const large = math.random(max, min);
        const position = math.random(this.canvas.height - large, 0);
        const wall = new Wall(this.canvas, "gray", large, position, this.player);
        if (this.debug) wall.enableDebug();
        wall.vector.setVector(4, 180);
        this.#walls.push(wall);
    }
    playerUpdate() {
        const playerColisions = this.#player.edgeColision();
        if (this.controls.up) {
            this.player.vector.setVelXY(
                this.player.vector.vel.x,
                this.player.vector.vel.y - 2.3333
            );
            if (this.player.rotation > -45)
                this.player.rotation = this.player.rotation - 3; //340;//({x: this.canvas.width, y: this.canvas.height / 2})
        } else {
            if (this.player.rotation < 45)
                this.player.rotation = this.player.rotation + 3; //30;//({x: this.canvas.width, y: this.canvas.height})
        }
        if (
            playerColisions &&
            playerColisions.includes(Directions.bottom) &&
            this.#player.vector.vel.y >= 0
        ) {
            this.#player.enabledGravity = false;
            this.#player.vector.setVector(0, 0);
            super.pause();
        } else {
            this.#player.enabledGravity = true;
        }
        if (
            playerColisions &&
            playerColisions.includes(Directions.top)
        ){
            super.pause();
        }
        this.#player.move();
    }
    onNextLevel() {
        this.#levelText = `Level ${super.level}`;
        setTimeout(() => {
            this.#levelText = ``;
        }, 50);
    }
    #gameOverScreen() {
        super.context.font = "40px Arial";
        super.context.fillStyle = "gray";
        super.context.fillText(
            `Game Over`,
            this.canvas.width / 2 - 100,
            this.canvas.height / 2
        );
        super.context.font = "18px Arial";
        super.context.fillText(
            `Reset in ${super.secondsToReset} seconds...`,
            this.canvas.width / 2 - 100,
            this.canvas.height / 2 + 35
        );
    }
    get player() {
        return this.#player;
    }
}
