import { Actor, Delay, Timer, Vector } from "excalibur";
import { Resources } from './resources'
import { Dobber } from './dobber.js'

export class Fish extends Actor {
    // I could go in the constructor to spawn all the types, but inheritance would be easier for this file and the game file.
    // Therefor I will do inheritance to do the fish types
    fishImage = Resources.Fish.toSprite()
    points = 100
    appearChance // this is more a game thing than a fish thing, but I need to remind myself
    biteChance = 1
    timer = 200

    dobber
    timerrunning = false

    constructor() {
        super({width:Resources.Fish.width,height:Resources.Fish.height})
        this.graphics.use(this.fishImage)
        this.pos = new Vector(1250, 200)
        this.vel = new Vector(-1000, 0)
    }
    fishLeft(e) {
        e.target.pos = new Vector(1350, 200)
    }

    onInitialize(event) {
         this.events.on("exitviewport", (e) => this.fishLeft(e))
        this.on('collisionstart', (e) => this.hit(e))
    }
    
    hit(e) {
        //if it is dobber & =!underwater
        if(e.other.owner instanceof Dobber && e.other.owner.underwater===false){
            if(Math.random()<=this.biteChance){     //does the fish bite?
                this.dobber = e.other.owner         // to remind & control the specific dobber
                this.vel = new Vector(0, 0)         // stops the fish
                this.dobber.underwaterState(true)   // puts the dobber underwater
                this.timerrunning = true            // starts timer
                
            }
        }
    }
    // the timer
    onPreUpdate(engine){
        if(this.timerrunning){
            this.timer --
            if(this.timer <=0){
                this.timerrunning= false
                this.dobber.underwaterState(false)
                this.kill()
            }
        }
    }
}