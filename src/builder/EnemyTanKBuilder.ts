import { store } from './../store';
import * as Assets from '../assets';
import TankBuilder from '../builder/TankBuilder';
import EnemyBulletsBuilder from '../builder/EnemyBulletsBuilder';

export default class EnemyTanKBuilder {

    private _health = 3;
    private _x: number;
    private _y: number;
    private readonly _fireRate = 1000;
    private _nextFire = 0;
    private _alive: boolean = true;

    private _shadow: Phaser.Sprite;
    private _tank: Phaser.Sprite;
    private _turret: Phaser.Sprite;

    constructor(index: number, private _game: Phaser.Game, private _player: TankBuilder, private _bullets: EnemyBulletsBuilder) {
        this._x = this._game.world.randomX;
        this._y = this._game.world.randomY;

        this._shadow = this._game.add.sprite(this._x, this._y, Assets.Images.SpritesheetsEnemyTanks.getName(), Assets.Images.SpritesheetsShadow.getName());
        this._tank = this._game.add.sprite(this._x, this._y, Assets.Images.SpritesheetsEnemyTanks.getName(), Assets.Images.SpritesheetsTank1.getName());
        this._turret = this._game.add.sprite(this._x, this._y, Assets.Images.SpritesheetsEnemyTanks.getName(), Assets.Images.SpritesheetsTurret.getName());

        this._shadow.anchor.set(0.5);
        this._tank.anchor.set(0.5);
        this._turret.anchor.set(0.3, 0.5);

        this._tank.name = index.toString();
        this._game.physics.enable(this._tank, Phaser.Physics.ARCADE);
        this._tank.body.immovable = false;
        this._tank.body.collideWorldBounds = true;
        this._tank.body.bounce.setTo(1, 1);

        this._tank.angle = this._game.rnd.angle();

        this._game.physics.arcade.velocityFromRotation(this._tank.rotation, 100, this._tank.body.velocity);
    }

    public damage() {
        this._health -= 1;

        if (this._health <= 0) {
            this._alive = false;

            this._shadow.kill();
            this._tank.kill();
            this._turret.kill();

            return true;
        }

        return false;
    }

    public update() {
        this._shadow.x = this._tank.x;
        this._shadow.y = this._tank.y;
        this._shadow.rotation = this._tank.rotation;

        this._turret.x = this._tank.x;
        this._turret.y = this._tank.y;
        this._turret.rotation = this._game.physics.arcade.angleBetween(this._tank, this._player);

        if (this._game.physics.arcade.distanceBetween(this._tank, this._player) < 300) {
            if (this._game.time.now > this._nextFire && this._bullets.countDead() > 0) {
                this._nextFire = this._game.time.now + this._fireRate;

                const bullet = this._bullets.getFirstDead();

                bullet.reset(this._turret.x, this._turret.y);

                bullet.rotation = this._game.physics.arcade.moveToObject(bullet, this._player, 500);
            }
        }
    }

    public get alive() {
        return this._alive;
    }

    public get tank() {
        return this._tank;
    }
}