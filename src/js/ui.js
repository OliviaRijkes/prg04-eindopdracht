import {Actor, Vector, Label, Font, FontUnit, Color,} from 'excalibur'

export class UI extends Actor{
    
    highscore= localStorage.getItem('highscore') //this localStorage item is added in game.js
    score = 0

    constructor(){
        super()
        this.highscoreLabel = new Label({
            text: `highscore: ${this.highscore}`,
            pos: new Vector(1000,100),
            font: new Font({
                family: 'Arial',
                size: 12,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.addChild(this.highscoreLabel)

        this.scoreLabel = new Label({
            text: `score: ${this.score}`,
            pos: new Vector(1000,150),
            font: new Font({
                family: 'Arial',
                size: 12,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.addChild(this.scoreLabel)
    }
    addScore(points, name){
        if(name=== 'score'){
            this.score+=points
            this.scoreLabel.text=`score: ${this.score}`

            if(this.score>this.highscore){
                this.addScore(this.score,'highscore')
            }
        }
        else if(name === 'highscore'){
            this.highscore = points
            this.highscoreLabel.text= `highscore: ${this.highscore}`
            localStorage.setItem('highscore',this.highscore)    // puts highscore in localstorage
        }
    }
}