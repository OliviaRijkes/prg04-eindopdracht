import { Actor, Vector, Keys } from "excalibur";
import {Resources} from './resources'
import { Dobber } from "./dobber";

export class Rod extends Actor{
    casted = false
    power = 0
    dobber

    constructor(){
        super({width:Resources.Rod.width,height:Resources.Rod.height})
        this.graphics.use(Resources.Rod.toSprite())
        this.pos = new Vector(100, 100)
        this.casted= false
    }
    onInitialize(engine){
        engine.input.keyboard.on("release", (e)=> this.goBobber(e))
    }

    onPreUpdate(engine){
        let kb = engine.input.keyboard
        if(!this.casted){
            if(kb.isHeld(Keys.Space)){                  // adds power until the release
                this.graphics.use(Resources.RodCharging.toSprite())
                this.power+= 10
                if(this.power>= 1280){
                    console.log('You overtrew')
                }
            }
        } 
    }
    goBobber(e){
        if(e.key=== Keys.Space){                        //releasing the space button
            if(!this.casted){                           // casting the dobber out
                this.castedState(true)
                this.dobber = new Dobber(this.power)    // the dobberpos from the power
                this.addChild(this.dobber)
                this.power =0
            }
            else if(this.casted){                       //reeling the dobber or fish in
                if(this.dobber.underwater){
                    this.scene.engine.ui.addScore(this.dobber.fish.points, 'score')//adds points to score
                    this.dobber.fish.kill()             //remove the fish
                    this.dobber.underwaterState(false)  //reset the underwaterstate
                } else if(!this.dobber.underwater){
                    console.log('to fast')
                }
                this.castedState(false)                 //undo the casting of the rod
                this.dobber.kill()
            }
        }
    }
    castedState(state){                                 //to reset the castedState with all its attributes
        this.casted=state
        if(state){
            this.graphics.use(Resources.RodOut.toSprite())
        } else if(!state){
            this.graphics.use(Resources.Rod.toSprite())
        }
    }
}