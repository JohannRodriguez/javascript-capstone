import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import ScoreBoard from '../ScoreBoard';

export default class DeadScene extends Phaser.Scene {
  constructor () {
    super('Dead');
  }

  init (data) {
    this.score = data;
  }

  async createScore (scoreBoard, name, score) {
    await scoreBoard.submitScore(name, score);
    this.scene.start('Scores');
  }

  badName () {
    this.correct = this.add.text(310, 440, 'This name is taken', {
      font: "20px Arial",
      fill: "#ff0044",
      align: "center",
    });
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        this.correct.destroy();
      }
    });
  }

  async create () {
    this.scoreBoard = new ScoreBoard();
    this.scores = await this.scoreBoard.getScores();
    this.gameButton = new Button(this, config.width/2, 130, 'blueButton1', 'blueButton2', 'Title menu', 'Title');
    this.finalScore = this.add.text(30, 32, `Your final score is ${this.score}`, {
      font: "20px Arial",
      fill: "#ff0044",
      align: "center",
    });

    
    this.scoresArr = Object.values(this.scores.result);
    

    this.letter1 = this.add.text(280, 260, 'A', {
      font: "60px Arial",
      fill: "#ff0044",
      align: "center",
    });
    this.letter2 = this.add.text(380, 260, 'A', {
      font: "60px Arial",
      fill: "#ff0044",
      align: "center",
    });
    this.letter3 = this.add.text(480, 260, 'A', {
      font: "60px Arial",
      fill: "#ff0044",
      align: "center",
    });

    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


    this.counter1 = 0;
    this.letter1Up = this.add.image(300, 230, 'upBtn').setInteractive();
    this.letter1Up.on('pointerdown', () => {
      if (this.counter1 === 25) {
        this.counter1 = 0
      } else {
        this.counter1++
      }
      this.letter1.setText(this.alphabet[this.counter1]);
    });
    this.letter1Down = this.add.image(300, 355, 'downBtn').setInteractive();
    this.letter1Down.on('pointerdown', () => {
      if (this.counter1 === 0) {
        this.counter1 = 25
      } else {
        this.counter1--
      }
      this.letter1.setText(this.alphabet[this.counter1]);
    });
    this.counter2 = 0;
    this.letter2Up = this.add.image(400, 230, 'upBtn').setInteractive();
    this.letter2Up.on('pointerdown', () => {
      if (this.counter2 === 25) {
        this.counter2 = 0
      } else {
        this.counter2++
      }
      this.letter2.setText(this.alphabet[this.counter2]);
    });
    this.letter2Down = this.add.image(400, 355, 'downBtn').setInteractive();
    this.letter2Down.on('pointerdown', () => {
      if (this.counter2 === 0) {
        this.counter2 = 25
      } else {
        this.counter2--
      }
      this.letter2.setText(this.alphabet[this.counter2]);
    });

    this.counter3 = 0;
    this.letter3Up = this.add.image(500, 230, 'upBtn').setInteractive();
    this.letter3Up.on('pointerdown', () => {
      if (this.counter3 === 25) {
        this.counter3 = 0
      } else {
        this.counter3++
      }
      this.letter3.setText(this.alphabet[this.counter3]);
    });
    this.letter3Down = this.add.image(500, 355, 'downBtn').setInteractive();
    this.letter3Down.on('pointerdown', () => {
      if (this.counter3 === 0) {
        this.counter3 = 25
      } else {
        this.counter3--
      }
      this.letter3.setText(this.alphabet[this.counter3]);
    });
    this.submit = this.add.image(400, 530, 'blueButton1').setInteractive();
    this.submitPermit = true;
    this.submit.on('pointerdown', () => {
      const name = `${this.alphabet[this.counter1]}${this.alphabet[this.counter2]}${this.alphabet[this.counter3]}`;
      for (let i = 0; i < this.scoresArr.length; i++) {
        if (name === this.scoresArr[i].user) {
          this.badName();
          this.submitPermit = false;
          i = this.scoresArr.lenght + 1;
        }
      }
      if (this.submitPermit === true) {
        this.createScore(this.scoreBoard, name, parseInt(this.score))
      }
    });
  }
};