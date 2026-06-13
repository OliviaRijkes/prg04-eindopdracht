import { Enemy } from "./enemy";
import { Resources } from "../resources";

export class Penguin extends Enemy{
    constructor(){
        super()
        this.graphics.use(Resources.Penguin.toSprite())
        this.speed = 100
        this.damage = 1
        this.points = 1
    }
}