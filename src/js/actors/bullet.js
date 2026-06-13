import { Actor, vec } from "excalibur";
import { Resources } from "../resources";
import { Enemy } from "./enemy";

export class Bullet extends Actor {
    //gets the direction from the shark
    constructor(x, y, direction) {
        super({ height: 16, width: 16 })
        this.pos = vec(x, y)
        this.direction = direction
       

        this.graphics.use(Resources.Bullet.toSprite())
    }
    onInitialize(engine) {
        let speed = 500

        let xspeed = 0
        let yspeed = 0
        if (this.direction.x < 0) {
            xspeed = -speed
        } else if (this.direction.x > 0) {
            xspeed = speed
            this.rotation = 3.14
        }
        if (this.direction.y < 0) {
            yspeed = -speed
            this.rotation = 1.57
        } else if (this.direction.y > 0) {
            yspeed = speed
            this.rotation = -1.57
        }
        this.vel = vec(xspeed, yspeed)
        this.events.on("exitviewport", (e) => {this.kill()})

    }
    //on hit enemy delete both and add points
    onCollisionStart(engine, other) {
        if (other.owner instanceof Enemy) {
            this.scene.updatePoints(other.owner.points)
            other.owner.kill()
            this.kill()
        }
    }
}