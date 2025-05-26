import { Actor, Vector, Keys, Delay } from "excalibur";
import {Resources} from './resources'
import { Fish } from "./fish";

export class Dobber extends Actor{
    underwater= false
    fish

    constructor(x){
        super({width:Resources.Dobber.width,height:Resources.Dobber.height})
        this.graphics.use(Resources.Dobber.toSprite())
        this.underwater=false
        this.pos = new Vector(x, 100)
        this.underwater = false
    }
    // to remind & control the fish
    onInitialize(event) {
        this.on('collisionstart', (e) => {
        if(e.other.owner instanceof Fish){
            this.fish= e.other.owner
        }
    })
    }
    onPreUpdate(engine){
        //runt elk frame
        let xspeed=0
        let yspeed=0
        let kb = engine.input.keyboard
        if(!this.underwater){
            if(kb.isHeld(Keys.Left)){
                xspeed= -100
            }
            if(kb.isHeld(Keys.Right)){
                xspeed= 100
            }
            this.vel = new Vector(xspeed,yspeed)
        }
    }
    // to detect a change in underwater
    underwaterState(state){
        this.underwater=state
        if(state){
            console.log('I am underwater')
            //change graphics to underwater
        } else{
            console.log('I am above water')
            // change graphics to dobber
        }

    }
}