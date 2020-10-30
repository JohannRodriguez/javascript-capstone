import Entity from "./Entity";

export default class Enemy2 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy_2');
    this.setData('speed1', 150);
    this.setData('speed2', 260);
    this.body.collideWorldBounds = true;
    this.setData('rageCheck', true);
    this.setData('rage', true);
  }

  rageCheckSwitch (time) {
    time.addEvent({
      delay: 4000,
      callback: () => {
        this.setData('rageCheck', true);
        this.rageControll();
        const rageSwitch = !this.getData('rage');
        this.setData('rage', rageSwitch);
        console.log(this.getData('rage'));
      },
    });
  }
}