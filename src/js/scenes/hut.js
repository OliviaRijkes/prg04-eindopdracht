import { Color, Label, Scene } from "excalibur";
import { Player } from "../actors/player";

export class Hut extends Scene {
    onInitialize(engine) {
        if(!localStorage.getItem('highscore')){
            localStorage.setItem('highscore','0')
        }
        const flavorLabel = new Label({
            color: Color.Brown,
            x: engine.drawWidth / 2,
            y: engine.drawHeight / 2 - 50,
            text: "Survive pls OwO"
        })
        const startLabel = new Label({
            color: Color.Brown,
            x: engine.drawWidth / 2,
            y: engine.drawHeight / 2,
            text: "Go outside: Click ME!"
        })
        this.add(flavorLabel)
        this.add(startLabel)
        startLabel.on("pointerdown", () => this.goOutside())

        this.pointsLabel = new Label({
            color: Color.Red,
            x: this.engine.drawWidth / 2,
            y: this.engine.drawHeight / 2 + 100,
            text: `Points: ${this.engine.points}`
        })
        this.add(this.pointsLabel)
        this.highscoreLabel = new Label({
            color: Color.Brown,
            x: engine.drawWidth / 2,
            y: engine.drawHeight / 2 + 150,
            text: `highscore:${localStorage.getItem('highscore')}`
        })
        this.add(this.highscoreLabel)
    }
    onActivate(engine) {
        const highscore = JSON.parse(localStorage.getItem('highscore'))

        if (this.engine.points > 0) {
            this.pointsLabel.text = `Points: ${this.engine.points}`
            if (this.engine.points>highscore){
                localStorage.setItem('highscore',`${this.engine.points}`)
            }
            this.highscoreLabel.text = `Highscore: ${localStorage.getItem('highscore')}`
        }
    }
    goOutside() {
        this.engine.goToScene("outside")
    }
}