import { Scene, Timer } from "excalibur";
import { Player } from "../actors/player";
import { Enemy } from "../actors/enemy";
import { UI } from "../ui";
import { Penguin } from "../actors/penguin";
import { Icebear } from "../actors/icebear";

export class Outside extends Scene {
    onInitialize(engine) {
        this.player = new Player
        this.ui = new UI
        this.add(this.player)
        this.add(this.ui)
        this.camera.strategy.lockToActor(this.player)

        
    }
    onActivate(engine){
        //reset the enemies
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i] instanceof Enemy) {
                this.entities[i].kill()
            }
        }
        //reset the points
        this.updatePoints(0)
        //init enemies
        this.add(new Penguin)
        this.add(new Icebear)
    }
    updatePoints(amount) {
        if(amount === 0){
            this.engine.points =0
        }
        this.engine.points += amount
        this.ui.pointsLabel.text = `Points: ${this.engine.points}`
    }
    goInside(){
        this.engine.goToScene("hut")

    }
    // enemyTimer = new Timer()
}