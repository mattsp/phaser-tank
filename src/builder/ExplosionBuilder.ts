import * as Assets from '../assets';
import TankBuilder from '../builder/TankBuilder';

export default class ExplosionBuilder extends Phaser.Group {

    constructor(game: Phaser.Game) {
        super(game);
        this._create();
        game.add.existing(this);
    }

    private _create() {
        for (let i = 0; i < 10; i++) {
            const explosionAnimation = this.create(0, 0, Assets.Spritesheets.SpritesheetsExplosion646423.getName(), 0, false);
            explosionAnimation.anchor.setTo(0.5, 0.5);
            explosionAnimation.animations.add(Assets.Spritesheets.SpritesheetsExplosion646423.getName());
        }
    }

    public fire(tank: TankBuilder) {
        const explosionAnimation = this.getFirstExists(false);
        explosionAnimation.reset(tank.x, tank.y);
        explosionAnimation.play(Assets.Spritesheets.SpritesheetsExplosion646423.getName(), 30, false, true);
    }
}