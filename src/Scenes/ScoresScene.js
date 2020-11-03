import 'phaser';
import config from '../Config/config';
import ScoreBoard from '../ScoreBoard';
import Button from '../Objects/Button';

export default class ScoresScene extends Phaser.Scene {
  constructor () {
    super('Scores');
  }

  async create () {
    this.scoreBoard = new ScoreBoard();
    this.scorePoints = this.add.text(350, 30, 'Latest scores:', {
      font: "20px Arial",
      fill: "#ff0044",
      align: "center",
    });
    this.gameButton = new Button(this, config.width/2, 550, 'blueButton1', 'blueButton2', 'Title menu', 'Title');
    this.scores = await this.scoreBoard.getScores();
    this.scoresArr = Object.values(this.scores.result);
    this.array = [30, 70, 110, 150, 190, 230, 270, 310, 350];
    for (let i = 0; i < 10; i++) {
      if (this.scoresArr[i]) {
        this.scorePoints = this.add.text(300, (this.array[i] + 40), `${this.scoresArr[i].user}`, {
          font: "20px Arial",
          fill: "#ff0044",
          align: "center",
        });
        this.scorePoints = this.add.text(500, (this.array[i] + 40), `${this.scoresArr[i].score}`, {
          font: "20px Arial",
          fill: "#ff0044",
          align: "center",
        });
      }
    }
  }

  update () {
   
  }
};
