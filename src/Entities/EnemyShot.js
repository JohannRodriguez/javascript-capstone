import Entity from "./Entity";

export default class EnemyShot extends Entity {
  constructor(scene, x, y, img, dirX, dirY) {
    super(scene, x, y, img);
    this.body.setVelocity(dirX, dirY);
  }
};