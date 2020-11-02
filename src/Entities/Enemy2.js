import Entity from "./Entity";

export default class Enemy2 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy_2');
    this.setData('speed', 150);
    this.body.collideWorldBounds = true;
    this.setData('rageCheck', true);
    this.setData('rage', true);
    this.setData('enemyKey', 1);
    this.setData('ableToMove', true);
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