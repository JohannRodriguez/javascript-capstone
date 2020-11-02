import 'phaser';
import Player from '../Entities/Player';
import Enemy1 from '../Entities/Enemy1';
import Enemy2 from '../Entities/Enemy2';
import Enemy3 from '../Entities/Enemy3';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
  }

  shield (shield, bullet) {
    shield.destroy();
    bullet.destroy();
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

    if (!this.keyA.isDown && !this.keyD.isDown && !this.keyS.isDown && !this.keyW.isDown && this.player.getData('inmune') === false) {
      this.player.anims.play('playerIdle', true);
    } else if (this.player.getData('inmune') === true) {
      this.player.play('playerDamage');
    }


    if (this.player.getData('shotRate') === true && this.player.getData('inmune') === false) {
      if (this.shootKeys.up.isDown) {
        this.player.shotAction(this, this.playerShots, 0, -this.player.getData('shotSpeed'));
        this.player.shootRate(this.time);
      } else if (this.shootKeys.down.isDown) {
        this.player.shotAction(this, this.playerShots, 0, this.player.getData('shotSpeed'));
        this.player.shootRate(this.time);
      } else if (this.shootKeys.right.isDown) {
        this.player.shotAction(this, this.playerShots, this.player.getData('shotSpeed'), 0);
        this.player.shootRate(this.time);
      } else if (this.shootKeys.left.isDown) {
        this.player.shotAction(this, this.playerShots, -this.player.getData('shotSpeed'), 0);
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

  cDamage (player, enemy) {
    if (enemy.getData('rage')) {
      enemy.setData('rage', false);
    }
    if (this.player.getData('inmune') === false && enemy.getData('ableToMove') === true) {
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

  b_limit (shot) {
    shot.destroy();
  }

  killEnemy (enemy, shot) {
    shot.destroy();
    if (this.player.getData('isDead') === false && enemy.getData('ableToMove') === true) {
      enemy.setData('ableToMove', false);
      this.player.score(enemy.getData('enemyKey'));
      this.scorePoints.setText(`Score: ${this.player.getData('score')}`);
      enemy.destroy();
    }
  }

  create () {
    this.barriers = this.physics.add.staticGroup();
    this.shields = this.physics.add.staticGroup();

    this.bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.barriers.create(400, 50, 'bar_top');
    this.barriers.create(400, 529, 'bar_bot');
    this.barriers.create(10, 295, 'bar_side');
    this.barriers.create(790, 295, 'bar_side');

    this.limits = this.physics.add.staticGroup();
    this.limits.create(-10, 300, 'bar_side').setScale(1, 1.5);
    this.limits.create(810, 300, 'bar_side').setScale(1, 1.5);
    this.limits.create(400, -10, 'bar_top');
    this.limits.create(400, 610, 'bar_top');

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'player'
    ).setScale(1, 1);
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
      delay: 9000,
      callback: () => {
        const enemy1 = new Enemy1(this, Phaser.Math.Between(40, 760), Phaser.Math.Between(40, 560));
        enemy1.setScale(1.2, 1.2);
        this.enemies1.add(enemy1);
        this.time.addEvent({
          delay: 1000,
          callback: () => {
            enemy1.setData('ableToMove', true);
            enemy1.body.setVelocity(enemy1.getData('speed'));
            enemy1.play('en1Flight');
          }
        });
      },
      loop: true,
    });
    this.time.addEvent({
      delay: 5000,
      callback: () => {
        const posX = Phaser.Math.Between(60, 740);
        const posY = Phaser.Math.Between(90, 540)
        const enemy2 = new Enemy2(this, posX, posY)
        this.enemies2.add(enemy2);
        this.shields.create(posX, posY, 'shield');
        this.shields.create(posX, posY - 2, 'shield');
        this.time.addEvent({
          delay: 500,
          callback: () => {
            enemy2.setData('ableToMove', true);
          }
        });
      },
      loop: true,
    });
    this.time.addEvent({
      delay: 7000,
      callback: () => {
        let num = Phaser.Math.Between(1, 2);
        if (num === 1) {
          num = 20
          const enemy3 = new Enemy3(this, Phaser.Math.Between(40, 760), num);
          this.enemies3.add(enemy3);
          this.time.addEvent({
            delay: 1000,
            callback: () => {
              enemy3.setData('ableToMove', true);
              enemy3.play('en3IdleFront');
            }
          });
        } else {
          num = 545;
          const enemy3 = new Enemy3(this, Phaser.Math.Between(40, 760), num);
          enemy3.setData('shotSpeed', -300);
          enemy3.setData('anim', 'en3ShotBack');
          this.enemies3.add(enemy3);
          this.time.addEvent({
            delay: 1000,
            callback: () => {
              enemy3.setData('ableToMove', true);
              enemy3.play('en3IdleBack');
            }
          });
        }
      },
      loop: true,
    });
    

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.shootKeys = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(this.player, this.enemyShots, this.damage, null, this);
    this.physics.add.overlap(this.enemyShots, this.limits, this.b_limit, null, this);
    this.physics.add.overlap(this.playerShots, this.limits, this.b_limit, null, this);
    this.physics.add.overlap(this.player, this.enemies1, this.cDamage, null, this);
    this.physics.add.overlap(this.player, this.enemies2, this.cDamage, null, this);
    this.physics.add.overlap(this.enemies1, this.playerShots, this.killEnemy, null, this);
    this.physics.add.overlap(this.enemies2, this.playerShots, this.killEnemy, null, this);
    this.physics.add.overlap(this.enemies3, this.playerShots, this.killEnemy, null, this);
    this.physics.add.overlap(this.shields, this.playerShots, this.shield, null, this);

    this.physics.add.collider(this.player, this.barriers);
    this.physics.add.collider(this.player, this.shields);
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
          enemy1.shotAction(this.enemyShots, this.time, this);
          enemy1.shotRate(this.time);
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
          enemy2.body.setVelocityX(enemy2.directionX(this.player));
          enemy2.body.setVelocityY(enemy2.directionY(this.player));
        } else {
          this.shields.create(enemy2.x, enemy2.y, 'shield');
          enemy2.idleDir(this.player);
        }
      }
    });
    this.enemies3.children.iterate(enemy3 => {
      if (enemy3.getData('ableToMove') === true) {
        if (enemy3.getData('shotRate') === true) {
          enemy3.shotRate(this.time, enemy3.body.x, enemy3.body.y);
          enemy3.shotAction();
          enemy3.newBullet(this.time, this.enemyShots, this);
        }
        if (enemy3.getData('dir') === true) {
          enemy3.setData('dir', false);
          enemy3.changeDir(this.time, enemy3.body.x, enemy3.body.y);
        }
      }
    });
  }

  
};