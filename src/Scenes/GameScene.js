import 'phaser';
import Player from '../Entities/Player';
import PlayerShot from '../Entities/PlayerShot';
import Enemy1 from '../Entities/Enemy1';
import EnemyShot from '../Entities/EnemyShot';
import Enemy2 from '../Entities/Enemy2';
import Enemy3 from '../Entities/Enemy3';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
  }

  playerAcctions () {
    if (this.keyW.isDown) {
      this.player.moveUp();
    }
    else if (this.keyS.isDown) {
      this.player.moveDown();
    }

    if (this.keyA.isDown) {
      this.player.moveLeft();
    }
    else if (this.keyD.isDown) {
      this.player.moveRight();
    }

    if (this.player.getData('shotRate') === true) {
      if (this.shootKeys.up.isDown) {
        this.playerShots.add(new PlayerShot(
          this,
          this.player.x,
          this.player.y,
          0,
          -this.player.getData('shotSpeed')
        ));
        this.player.setData('shotRate', false);
        this.player.shootRate(this.time);
      } else if (this.shootKeys.down.isDown) {
        this.playerShots.add(new PlayerShot(
          this,
          this.player.x,
          this.player.y,
          0,
          this.player.getData('shotSpeed')
        ));
        this.player.setData('shotRate', false);
        this.player.shootRate(this.time);
      } else if (this.shootKeys.right.isDown) {
        this.playerShots.add(new PlayerShot(
          this,
          this.player.x,
          this.player.y,
          this.player.getData('shotSpeed'),
          0
        ));
        this.player.setData('shotRate', false);
        this.player.shootRate(this.time);
      } else if (this.shootKeys.left.isDown) {
        this.playerShots.add(new PlayerShot(
          this,
          this.player.x,
          this.player.y,
          -this.player.getData('shotSpeed'),
          0
        ));
        this.player.setData('shotRate', false);
        this.player.shootRate(this.time);
      }
    }
  }

  damage (player, bullet) {
    bullet.destroy();
    if (this.player.getData('inmune') === false) {
      const playerHealth = player.getData('health');
      if (player.getData('isDead') === false) {
        player.setData('health', (playerHealth - 1));
      }
      this.lifePoints.setText(`Lifes: ${this.player.getData('health')}`);
      if (player.getData('health') === 0) {
        player.setData('isDead', true);
        player.visible = false;
      }
      player.setData('inmune', true);
      player.inmunityRst(this.time);
    }
  }

  cDamage (player) {
    if (this.player.getData('inmune') === false) {
      const playerHealth = player.getData('health');
      if (player.getData('isDead') === false) {
        player.setData('health', (playerHealth - 1));
      }
      this.lifePoints.setText(`Lifes: ${this.player.getData('health')}`);
      if (player.getData('health') === 0) {
        player.setData('isDead', true);
        player.visible = false;
      }
      player.setData('inmune', true);
      player.inmunityRst(this.time);
    }
  }

  killEnemy (enemy, shot) {
    if (this.player.getData('isDead') === false) {
      enemy.setData('ableToMove', false);
      this.player.score(enemy.getData('enemyKey'));
      this.scorePoints.setText(`Score: ${this.player.getData('score')}`);
      enemy.destroy();
      shot.destroy();
    }
  }

  create () {
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'ship'
    );
    this.playerShots = this.add.group();

    this.enemies1 = this.add.group();
    this.enemies2 = this.add.group();
    this.enemies3 = this.add.group();
    this.enemyShots = this.add.group();

    this.scorePoints = this.add.text(32, 32, 'score: 0', {
      font: "20px Arial",
      fill: "#ff0044",
      align: "center",
    });

    this.lifePoints = this.add.text(680, 32, 'Lifes: 3', {
      font: "20px Arial",
      fill: "#ff0044",
      align: "center",
    });

    
    this.time.addEvent({
      delay: 5000,
      callback: () => {
        let num = Phaser.Math.Between(1, 2);
        if (num === 1) {
          num = 20
        } else {
          num = 580;
        }
        this.enemies3.add(new Enemy3(this, Phaser.Math.Between(40, 760), num));
      },
      loop: true,
    });

    this.time.addEvent({
      delay: 10000,
      callback: () => {
        this.enemies1.add(new Enemy1(this, Phaser.Math.Between(40, 760), Phaser.Math.Between(40, 560)));
      },
      loop: true,
    });

    this.time.addEvent({
      delay: 10500,
      callback: () => {
        this.enemies1.add(new Enemy1(this, Phaser.Math.Between(40, 760), Phaser.Math.Between(40, 560)));
      },
      loop: true,
    });

    this.time.addEvent({
      delay: 18000,
      callback: () => {
        this.enemies2.add(new Enemy2(this, Phaser.Math.Between(40, 760), Phaser.Math.Between(40, 560)));
        this.enemies2.add(new Enemy2(this, Phaser.Math.Between(40, 760), Phaser.Math.Between(40, 560)));
      },
      loop: true,
    });

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.shootKeys = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(this.player, this.enemyShots, this.damage, null, this);
    this.physics.add.overlap(this.player, this.enemies1, this.cDamage, null, this);
    this.physics.add.overlap(this.player, this.enemies2, this.cDamage, null, this);
    this.physics.add.overlap(this.enemies1, this.playerShots, this.killEnemy, null, this);
    this.physics.add.overlap(this.enemies2, this.playerShots, this.killEnemy, null, this);
    this.physics.add.overlap(this.enemies3, this.playerShots, this.killEnemy, null, this);
  }

  update () {
    this.player.update();
    if (this.player.getData('isDead') === false) {
      this.playerAcctions();
    } else {
      const finalScore = this.player.getData('score');
      this.time.addEvent({
        delay: 3000,
        callback: () => {
          if (finalScore === 0) {
            this.scene.start('Dead', '0');
          } else {
            const data = finalScore;
            this.scene.start('Dead', data);
          }
        },
      });
    }

    this.enemies1.children.iterate(enemy1 => {
      if (enemy1.getData('ableToMove') === true) {
        if (enemy1.getData('shotRate')) {
          const shotSpeed = enemy1.getData('shotSpeed');
          enemy1.body.setVelocity(0, 0);
          enemy1.shotRate(this.time);
          this.time.addEvent({
            delay: 500,
            callback: () => {
              this.enemyShots.add(new EnemyShot(this, enemy1.x, enemy1.y, 'e_shot', 0, shotSpeed));
              this.enemyShots.add(new EnemyShot(this, enemy1.x, enemy1.y, 'e_shot', 0, -shotSpeed));
              this.enemyShots.add(new EnemyShot(this, enemy1.x, enemy1.y, 'e_shot', shotSpeed, 0));
              this.enemyShots.add(new EnemyShot(this, enemy1.x, enemy1.y, 'e_shot', -shotSpeed, 0));
            }
          });
          enemy1.setData('shotRate', false);
        }
      }
    })
    this.enemies2.children.iterate(enemy2 => {
      if (enemy2.getData('ableToMove') === true) {
        if (enemy2.getData('rageCheck') === true) {
          enemy2.setData('rageCheck', false);
          enemy2.rageCheckSwitch(this.time);
        }
  
        if (enemy2.getData('rage') === true) {
          if (enemy2.x - this.player.x < -10) {
            enemy2.body.velocity.x = enemy2.getData('speed');
          } else if (enemy2.x - this.player.x > 10) {
            enemy2.body.velocity.x = -enemy2.getData('speed');
          } else {
            enemy2.body.velocity.x = 0;
          }
          if (enemy2.y - this.player.y < -15) {
            enemy2.body.velocity.y = enemy2.getData('speed');
          } else if (enemy2.y - this.player.y > 15) {
            enemy2.body.velocity.y = -enemy2.getData('speed');
          } else {
            enemy2.body.velocity.y = 0;
          }
        } else {
          enemy2.body.setVelocity(0);
        }
      }
    });
    this.enemies3.children.iterate(enemy3 => {
      if (enemy3.getData('ableToMove') === true) {
        if (enemy3.getData('shotRate') === true) {
          enemy3.setData('shotRate', false);
          enemy3.setData('dir', false);
          const shotSpeed = enemy3.getData('shotSpeed');
          enemy3.body.setVelocity(0, 0);
          enemy3.shotRate(this.time, enemy3.body.x);
          let direction = shotSpeed;
          if ((enemy3.body.y - this.player.body.y) > 0) {
            direction = -shotSpeed;
          }
          this.time.addEvent({
            delay: 200,
            callback: () => {
              this.enemyShots.add(new EnemyShot(this, enemy3.x, enemy3.y, 'e_shot', 0, direction));
            }
          });
          this.time.addEvent({
            delay: 500,
            callback: () => {
              this.enemyShots.add(new EnemyShot(this, enemy3.x, enemy3.y, 'e_shot', 0, direction));
            }
          });
          this.time.addEvent({
            delay: 800,
            callback: () => {
              this.enemyShots.add(new EnemyShot(this, enemy3.x, enemy3.y, 'e_shot', 0, direction));
            }
          });
          this.time.addEvent({
            delay: 1700,
            callback: () => {
              enemy3.setData('dir', true);
            }
          });
        }
        if (enemy3.getData('dir') === true) {
          enemy3.setData('dir', false);
          enemy3.changeDir(this.time, enemy3.body.x);
        }
      }
    });
  }

  
};