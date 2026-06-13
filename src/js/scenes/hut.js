import { Color, Label, Scene } from "excalibur";
import { Player } from "../actors/player";

export class Hut extends Scene {
    onInitialize(engine) {
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
    }
    onActivate(engine) {
        if (this.engine.points > 0) {
            console.log('there are points')
            let pointsLabel = new Label({
                color: Color.Red,
                x: this.engine.drawWidth / 2,
                y: this.engine.drawHeight / 2 + 100,
                text: `Points: ${this.engine.points}`
            })
            this.add(pointsLabel)
        }
        let highscoreLabel = new Label({
            color: Color.Brown,
            x: this.engine.drawWidth / 2,
            y: this.engine.drawHeight / 2 + 150,
            text: `highscore:localstorage`
        })
        this.add(highscoreLabel)
        console.log('activate hut')
    }
    goOutside() {
        // console.log("You are outside");
        this.engine.goToScene("outside")
    }
}