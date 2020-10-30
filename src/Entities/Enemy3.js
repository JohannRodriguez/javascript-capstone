import Entity from "./Entity";

export default class Enemy3 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy_2');
    this.setData('speed', 250);
    this.setData('shotSpeed', 300);
    this.body.collideWorldBounds = true;
    this.setData('shotRate', true);
    this.setData('dir', false);
  }

  newDir (position) {
    const ranDir = Phaser.Math.Between(1, 2);
    if (position < 100) {
      this.body.velocity.x = this.getData('speed');
    } else if (position > 700) {
      this.body.velocity.x = -this.getData('speed');
    } else if (ranDir === 1) {
      this.body.velocity.x = this.getData('speed');
    } else {
      this.body.velocity.x = -this.getData('speed');
    }
  }

  changeDir (time, position) {
    const newDelay = (Phaser.Math.Between(1, 3)) * 1000;
    this.newDir(position);
    time.addEvent({
      delay: newDelay,
      callback: () => {
        this.setData('dir', true);
      }
    });
  }

  shotRate (time, position) {
    const newDelay = (Phaser.Math.Between(3, 8)) * 1000;
    time.addEvent({
      delay: 1500,
      callback: () => {
        this.newDir(position);
      },
     });
    time.addEvent({
      delay: newDelay,
      callback: () => {
        this.setData('shotRate', true);
      },
    });
  }
}