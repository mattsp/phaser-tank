import * as Assets from '../assets';
import TankBuilder from '../builder/TankBuilder';

export default class TurretBuilder extends Phaser.Sprite {


    constructor(game: Phaser.Game, x: number, y: number, private _tank?: TankBuilder) {
        super(game, x, y, Assets.Atlases.SpritesheetsTanks.getName(), Assets.Images.SpritesheetsTurret.getName());
        this.anchor.setTo(0.3, 0.5);
        game.add.existing(this);
    }

    public update() {
        if (this._tank) {
            this.x = this._tank.x;
            this.y = this._tank.y;
        }

        this.rotation = this.game.physics.arcade.angleToPointer(this);
    }
}