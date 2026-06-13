import { Actor, Vector, Keys, Engine } from "excalibur";
import { Resources } from '../resources.js'
import { Bullet } from "./bullet.js";
import { Enemy } from "./enemy.js";
import { Pickup } from "./pickup.js";


export class Player extends Actor {
    constructor() {
        super({ width: 32, height: 32 })
        console.log('player added');
        this.health = 10
        this.ammo = 10
        this.direction = { x: 1, y: 0 }
    }
    onInitialize(engine) {
        this.graphics.use(Resources.Player.toSprite())
        this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2)
    }
    onPreUpdate(engine) {
        let speed = 300
        let xspeed = 0
        let yspeed = 0
        const kb = engine.input.keyboard

        if (kb.isHeld(Keys.Up) || kb.isHeld(Keys.Down) || kb.isHeld(Keys.Left) || kb.isHeld(Keys.Right)) {
            if (kb.isHeld(Keys.Up)) {
                yspeed = -speed
            }
            if (kb.isHeld(Keys.Down)) {
                yspeed = speed
            }
            if (kb.isHeld(Keys.Left)) {
                xspeed = -speed
                this.graphics.flipHorizontal = false
            }
            if (kb.isHeld(Keys.Right)) {
                xspeed = speed
                this.graphics.flipHorizontal = true
            }
            this.direction = { x: xspeed, y: yspeed }
        }
        this.vel = new Vector(xspeed, yspeed)

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.shoot()
        }
    }
    shoot() {
        if (this.ammo > 0) {
            this.updateAmmo(-1)
            this.scene.add(new Bullet(this.pos.x, this.pos.y, this.direction))
        }
    }
    updateAmmo(amount) {
        if(amount===0){
            this.ammo =10
        }
        this.ammo += amount
        this.scene.ui.ammoLabel.text = `Ammo: ${this.ammo}`
    }
    updateHealth(amount) {
        if(amount===0){
            this.health=10
        }
        this.health += amount
        this.scene.ui.healthLabel.text = `Health: ${this.health}`
        if (this.health <= 0) {
            this.die()
        }
    }
    die() {
        //go to hut
        this.pos = new Vector(this.scene.engine.drawWidth / 2, this.scene.engine.drawHeight / 2)
        this.scene.goInside()

        //reset player
        this.updateHealth(0)
        this.updateAmmo(0)
        this.pos = new Vector(this.scene.engine.drawWidth / 2, this.scene.engine.drawHeight / 2)

    }
    onCollisionStart(engine, other) {
        if (other.owner instanceof Enemy) {
            this.updateHealth(-other.owner.damage)
        }
        if (other.owner instanceof Pickup){
            this.updateAmmo(other.owner.amount)
            other.owner.kill()
        }
    }
}