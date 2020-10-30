import Entity from "./Entity";

export default class Enemy2 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy_2');
    this.setData('speed1', 150);
    this.setData('speed2', 260);
    this.body.collideWorldBounds = true;
    this.setData('rageCheck', true);
    this.setData('rage', true);
    this.setData('enemyKey', 1);
  }

  rageCheckSwitch (time) {
    const newDelay = (Phaser.Math.Between(4, 10)) * 1000;
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