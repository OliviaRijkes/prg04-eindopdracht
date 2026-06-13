import { Scene, Timer } from "excalibur";
import { Player } from "../actors/player";
import { Enemy } from "../actors/enemy";
import { UI } from "../ui";
import { Penguin } from "../actors/penguin";
import { Icebear } from "../actors/icebear";
import { Pickup } from "../actors/pickup";

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
        //init pickup
        this.add(new Pickup)

        this.spawnTimer = new Timer({
            fcn:()=> this.spawn(),
            interval:600,
            repeats:true
        })
        this.add(this.spawnTimer)
        this.spawnTimer.start()

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
    spawn(){
        let enemyType = Math.random()
        if(enemyType<0.35){
            this.add(new Icebear)
        } else{
            this.add(new Penguin)
        }
        if(this.player.ammo<5 && enemyType<0.25){
            this.add(new Pickup)
        }

    }
}