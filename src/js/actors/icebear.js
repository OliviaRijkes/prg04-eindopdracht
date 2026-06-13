import { Enemy } from "./enemy";
import { Resources } from "../resources";

export class Icebear extends Enemy{
    constructor(){
        super()
        this.graphics.use(Resources.Icebear.toSprite())
        this.speed = 200
        this.damage = 2
        this.points = 2
    }
}