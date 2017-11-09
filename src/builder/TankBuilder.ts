import * as Assets from '../assets';

export default class TankBuilder extends Phaser.Sprite {

    private _shadow: Phaser.Sprite;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, Assets.Atlases.SpritesheetsTanks.getName(), Assets.Images.SpritesheetsTank1.getName());
        this.anchor.setTo(0.5, 0.5);
        this.animations.add('move', [
            Assets.Images.SpritesheetsTank1.getName(),
            Assets.Images.SpritesheetsTank2.getName(),
            Assets.Images.SpritesheetsTank3.getName(),
            Assets.Images.SpritesheetsTank4.getName(),
            Assets.Images.SpritesheetsTank5.getName(),
            Assets.Images.SpritesheetsTank6.getName()], 20, true);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.drag.set(0.2);
        this.body.maxVelocity.setTo(400, 400);
        this.body.collideWorldBounds = true;
        this._shadow = game.add.sprite(0, 0, Assets.Atlases.SpritesheetsTanks.getName(), Assets.Images.SpritesheetsShadow.getName());
        this._shadow.anchor.setTo(0.5, 0.5);
        game.add.existing(this);
    }

    public update() {
        this._shadow.x = this.x;
        this._shadow.y = this.y;
        this._shadow.rotation = this.rotation;
    }

    public get shadow() {
        return this._shadow;
    }
}