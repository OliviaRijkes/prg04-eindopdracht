import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Color } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './actors/player.js'
import { Enemy } from './actors/enemy.js'
import { Hut } from './scenes/hut.js'
import { Outside } from './scenes/outside.js'

export class Game extends Engine {
    points

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            backgroundColor: Color.White

        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        this.points = 0

        this.addScene("hut", new Hut)
        this.addScene("outside", new Outside)

        this.goToScene("hut")
        console.log('start the mayhem')
        if(!localStorage.getItem('highscore')){
            console.log('there is localstorage')
        }
    }
}

new Game()
