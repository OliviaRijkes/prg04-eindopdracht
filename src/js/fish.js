import { Actor, Delay, Timer, Vector } from "excalibur";
import { Resources } from './resources'
import { Dobber } from './dobber.js'

export class Fish extends Actor {
    // I want these to go in the constructor to spawn all the types
    fishImage
    points = 123
    appearChance // this is more a game thing than a fish thing, but I need to remind myself
    biteChance =1
    timer = 200
    dobber

    timerrunning = false

    constructor(fishImage,points,appearChance,biteChance,timer) {
        super({width:Resources.Fish.width,height:Resources.Fish.height})
        this.graphics.use(Resources.Fish.toSprite())
        this.pos = new Vector(1250, 200)
        this.vel = new Vector(-1000, 0)
        //if overlap a change of grab()
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
            if(Math.random()<=this.biteChance){         //does the fish bite?
                this.dobber = e.other.owner
                this.vel = new Vector(0, 0)         // stops the fish
                this.dobber.underwaterState(true)   // puts the dobber underwater, which starts the timer there
                this.timerrunning = true            // starts timer
                
            }
        }
    }
    // de timer
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