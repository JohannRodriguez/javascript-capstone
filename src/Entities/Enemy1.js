import Entity from "./Entity"

export default class Enemy1 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy_1');
    this.setData('speed', 300);
    this.setData('shotSpeed', 600);
    this.body.setBounce(1);
    this.body.collideWorldBounds = true;
    this.setData('shotRate', true);
    this.setData('enemyKey', 3);
    this.setData('ableToMove', false);
    this.anims.play('en1Spawn', true);
  }

  shotRate (time) {
    const newDelay = (Phaser.Math.Between(3, 8)) * 1000;
    time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.getData('ableToMove') === true) {
          this.body.setVelocity(this.getData('speed'));
          this.play('en1Flight');
        }
      },
    });
    time.addEvent({
      delay: newDelay,
      callback: () => {
        this.setData('shotRate', true);
      },
    });
  }
};