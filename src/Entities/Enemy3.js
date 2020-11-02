import Entity from "./Entity";
import EnemyShot from '../Entities/EnemyShot';

export default class Enemy3 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy_3');
    this.setData('speed', 250);
    this.setData('shotSpeed', 300);
    this.body.collideWorldBounds = true;
    this.setData('shotRate', true);
    this.setData('dir', false);
    this.setData('ableToMove', false);
    this.setData('enemyKey', 2);
    this.setData('anim', 'en3ShotFront');
    this.anims.play('en3Spawn');
  }

  shotAction () {
    this.setData('shotRate', false);
    this.setData('dir', false);
    this.body.setVelocity(0, 0);
    this.anims.play(this.getData('anim'), true);
  }

  newBullet (time, shotGroup, scene) {
    const array = [200, 500, 800]
    for (let index = 0; index < array.length; index++) {
      time.addEvent({
        delay: array[index],
        callback: () => {
          const newShot = new EnemyShot(scene, this.x, this.y, 'en3_shot', 0, this.getData('shotSpeed'));
          shotGroup.add(newShot.setScale(2, 2));
        }
      });
    }
    time.addEvent({
      delay: 1800,
      callback: () => {
        this.setData('dir', true);
      }
    });
  }

  newDir (position, dir) {
    if (this.getData('ableToMove') === true) {
      if (this.body.y < 400) {
        this.play('en3IdleFront');
      } else {
        this.play('en3IdleBack');
      }
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
  }

  changeDir (time, x, y) {
    const newDelay = (Phaser.Math.Between(1, 3)) * 1000;
    this.newDir(x, y);
    time.addEvent({
      delay: newDelay,
      callback: () => {
        this.setData('dir', true);
      }
    });
  }

  shotRate (time, x, y) {
    const newDelay = (Phaser.Math.Between(3, 8)) * 1000;
    time.addEvent({
      delay: 1500,
      callback: () => {
        this.newDir(x, y);
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