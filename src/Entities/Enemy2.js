import Entity from "./Entity";

export default class Enemy2 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy_2');
    this.setData('speed', 150);
    this.body.collideWorldBounds = true;
    this.setData('rageCheck', true);
    this.setData('rage', true);
    this.setData('enemyKey', 1);
    this.setData('ableToMove', false);
    this.anims.play('en2IdleRight', true);
  }

  directionX (player) {
    if (this.x - player.x < -10) {
      this.anims.play('en2right', true);
      return this.getData('speed');
    } else if (this.x - player.x > 10) {
      this.anims.play('en2left', true);
      return -this.getData('speed');
    } else {
      this.anims.play('en2right', true);
      return 0
    }
  }

  directionY (player) {
    if (this.y - player.y < -15) {
      return this.getData('speed');
    } else if (this.y - player.y > 15) {
      return -this.getData('speed');
    } else {
     return 0
    }
  }

  idleDir (player) {
    this.body.setVelocity(0);
    if (this.x - player.x < -5) {
      this.anims.play('en2IdleRight', true);
    } else if (this.x - player.x > 5) {
      this.anims.play('en2IdleLeft', true);
    } else {
      this.anims.play('en2IdleRight', true);
    }
  }

  rageCheckSwitch (time) {
    const newDelay = (Phaser.Math.Between(2, 6)) * 1000;
    time.addEvent({
      delay: newDelay,
      callback: () => {
        this.setData('rageCheck', true);
        const rageSwitch = this.getData('rage');
        this.setData('rage', !rageSwitch);
      },
    });
  }
}