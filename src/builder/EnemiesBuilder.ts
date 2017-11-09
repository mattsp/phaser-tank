import { store } from './../store';
import * as Assets from '../assets';
import TankBuilder from '../builder/TankBuilder';
import EnemyTanKBuilder from '../builder/EnemyTanKBuilder';
import EnemyBulletsBuilder from '../builder/EnemyBulletsBuilder';
import BulletsBuilder from '../builder/BulletsBuilder';
import ExplosionBuilder from '../builder/ExplosionBuilder';

export default class EnemiesBuilder {

    private _enemeies: Array<EnemyTanKBuilder>;
    private readonly _enemiesTotal = 20;
    private _enemiesAlive = 20;

    constructor(private _game: Phaser.Game, private _tank: TankBuilder, private _ennemiesBullets: EnemyBulletsBuilder, private _bullets: BulletsBuilder, private _explossion: ExplosionBuilder) {
        this._enemeies = new Array<EnemyTanKBuilder>();
    }

    public create() {
        for (let i = 0; i < this._enemiesTotal; i++) {
            this._enemeies.push(new EnemyTanKBuilder(i, this._game, this._tank, this._ennemiesBullets));
        }
    }

    public update() {
        this._game.physics.arcade.overlap(this._ennemiesBullets, this._tank, this._bulletHitPlayer, null, this);

        this._enemiesAlive = 0;

        for (let ennemy of this._enemeies) {
            if (ennemy.alive === true) {
                this._enemiesAlive++;
                this._game.physics.arcade.collide(this._tank, ennemy.tank);
                this._game.physics.arcade.overlap(this._bullets, ennemy.tank, this._bulletHitEnemy, null, this);
                ennemy.update();
            }
        }
    }

    public redner() {
        this._game.debug.text('Enemies: ' + this._enemiesAlive + ' / ' + this._enemiesTotal, 32, 32);
    }


    private _bulletHitPlayer(tank: TankBuilder, bullet: Phaser.Sprite): void {
        bullet.kill();
    }

    private _bulletHitEnemy(tank: TankBuilder, bullet: Phaser.Sprite): void {
        bullet.kill();
        const destroyed = this._enemeies[tank.name].damage();
        if (destroyed === true) {
            this._explossion.fire(tank);
        }
    }
}