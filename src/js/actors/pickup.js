import { Actor, vec } from "excalibur";
import { Resources } from "../resources";

export class Pickup extends Actor{
    constructor(){
        super({width:32,height:32})
        this.amount = 10
        this.graphics.use(Resources.Pickup.toSprite())

    }
    onInitialize(engine){
        //appear on the border of the screen
                let randomBorder = Math.random()
                let borderOffset = 16
                let posX = -borderOffset
                let posY = -borderOffset
        
                //appear from the player position
                let playerOffsetX = this.scene.player.pos.x - engine.drawWidth / 2
                let playerOffsetY = this.scene.player.pos.y - engine.drawHeight / 2
        
                if (randomBorder < 0.25) {     //up
                    posX = Math.random() * engine.drawWidth
                } else if (randomBorder < .5) { //left 
                    posY = Math.random() * engine.drawHeight
                } else if (randomBorder < .75) { //down
                    posX = Math.random() * engine.drawWidth
                    posY = engine.drawHeight + borderOffset
                } else {                     //right
                    posX = engine.drawWidth + borderOffset
                    posY = Math.random() * engine.drawHeight
                }
                this.pos = vec(posX + playerOffsetX, posY + playerOffsetY)
    }

}