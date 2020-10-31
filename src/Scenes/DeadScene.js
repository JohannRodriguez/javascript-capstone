import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class DeadScene extends Phaser.Scene {
  constructor () {
    super('Dead');
  }

  init (data) {
    this.score = data;
  }

  create () {
    this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Tile menu', 'Title');
    this.add.image(400, 500, 'phaserLogo');
    this.lifePoints = this.add.text(30, 32, `Your final score is ${this.score}`, {
        font: "20px Arial",
        fill: "#ff0044",
        align: "center",
      });
  }
};