import { Color, Label, ScreenElement } from "excalibur";

export class UI extends ScreenElement {
    onInitialize(engine) {
        this.pointsLabel = new Label({
            color: Color.Blue,
            x: 200,
            y: 200,
            text: `Points: ${engine.points}`
        })
        this.healthLabel = new Label({
            color: Color.Red,
            x: 200,
            y: 300,
            text: `Health: ${this.scene.player.health}`
        })
        this.ammoLabel = new Label({
            color: Color.Yellow,
            x: 200,
            y: 400,
            text: `Ammo: ${this.scene.player.ammo}`
        })
        this.addChild(this.pointsLabel)
        this.addChild(this.healthLabel)
        this.addChild(this.ammoLabel)
    }
}