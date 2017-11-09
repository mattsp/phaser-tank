import * as Assets from '../assets';

export default class LandBuilder extends Phaser.TileSprite {

    constructor(game: Phaser.Game, x: number, y: number, width: number, height: number) {
        super(game, x, y, width, height, Assets.Images.SpritesheetsEarth.getName(), 0);
        this.fixedToCamera = true;
        game.add.existing(this);
    }

    public update(): void {
        this.tilePosition.x = -this.game.camera.x;
        this.tilePosition.y = -this.game.camera.y;
    }
}