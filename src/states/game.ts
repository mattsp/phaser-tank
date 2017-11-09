import { store } from './../store';
import * as Assets from '../assets';

import TankBuilder from '../builder/TankBuilder';
import LandBuilder from '../builder/LandBuilder';
import TurretBuilder from '../builder/TurretBuilder';
import BulletsBuilder from '../builder/BulletsBuilder';
import EnemyBulletsBuilder from '../builder/EnemyBulletsBuilder';
import EnemiesBuilder from '../builder/EnemiesBuilder';
import EnemyTanKBuilder from '../builder/EnemyTanKBuilder';
import ExplosionBuilder from '../builder/ExplosionBuilder';

export default class Game extends Phaser.State {

    private _tank: TankBuilder;
    private _land: LandBuilder;
    private _turret: TurretBuilder;
    private _bullets: BulletsBuilder;
    private _enemyBullets: EnemyBulletsBuilder;
    private _enemies: EnemiesBuilder;
    private _explosions: ExplosionBuilder;
    private _cursors;
    private _logo: Phaser.Sprite;
    private _currentSpeed: number = 0;
    private _nextFire: number = 0;
    private _fireRate: number = 100;
    public create(): void {
        this.game.world.setBounds(-1000, -1000, 2000, 2000);
        this._land = new LandBuilder(this.game, 0, 0, 800, 600);
        this._tank = new TankBuilder(this.game, 0, 0);
        this._turret = new TurretBuilder(this.game, 0, 0, this._tank);
        this._bullets = new BulletsBuilder(this.game);
        this._enemyBullets = new EnemyBulletsBuilder(this.game);
        this._explosions = new ExplosionBuilder(this.game);
        this._enemies = new EnemiesBuilder(this.game, this._tank, this._enemyBullets, this._bullets, this._explosions);

        this._tank.bringToTop();
        this._turret.bringToTop();

        this._logo = this.game.add.sprite(0, 200, 'logo');
        this._logo.fixedToCamera = true;

        this.game.input.onDown.add(this._removeLogo, this);

        this.game.camera.follow(this._tank);
        this.game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
        this.game.camera.focusOnXY(0, 0);

        this._cursors = this.game.input.keyboard.createCursorKeys();

        this._enemies.create();
    }

    private _removeLogo() {
        this.game.input.onDown.remove(this._removeLogo, this);
        this._logo.kill();
    }

    public update(): void {

        this._enemies.update();

        if (this._cursors.left.isDown) {
            this._tank.angle -= 4;
        }
        else if (this._cursors.right.isDown) {
            this._tank.angle += 4;
        }

        if (this._cursors.up.isDown) {
            //  The speed we'll travel at
            this._currentSpeed = 300;
        }
        else {
            if (this._currentSpeed > 0) {
                this._currentSpeed -= 4;
            }
        }

        if (this._currentSpeed > 0) {
            this.game.physics.arcade.velocityFromRotation(this._tank.rotation, this._currentSpeed, this._tank.body.velocity);
        }

        this._land.update();

        //  Position all the parts and align rotations
        this._tank.update();

        this._turret.update();

        if (this.game.input.activePointer.isDown) {
            //  Boom!
            this._fire();
        }
    }

    private _fire() {
        if (this.game.time.now > this._nextFire && this._bullets.countDead() > 0) {
            this._nextFire = this.game.time.now + this._fireRate;

            const bullet = this._bullets.getFirstExists(false);

            bullet.reset(this._turret.x, this._turret.y);

            bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 1000, this.game.input.activePointer, 500);
        }
    }

    public render() {
        this._enemies.redner();
    }
}