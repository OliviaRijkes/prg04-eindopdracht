import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import {Dobber} from './dobber.js'
import { Fish } from './fish.js'
import { Rod } from './rod.js'

export class Game extends Engine {
    dobber
    fish

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.showDebug(true)
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game eens joh!")
       this.rod= new Rod('red')
       this.add(this.rod)
       this.fish = new Fish()
       this.add(this.fish)
    }
}

new Game()
