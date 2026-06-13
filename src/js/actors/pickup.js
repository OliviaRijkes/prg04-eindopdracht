import { Actor } from "excalibur";
import { Resources } from "../resources";

export class Pickup extends Actor{
    constructor(){
        super({width:32,height:32})
        this.amount = 10
        this.graphics.use(Resources.Pickup.toSprite())

    }

}