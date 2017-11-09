import * as Assets from '../assets';

export default class EnemyBulletsBuilder extends Phaser.Group {

    constructor(game: Phaser.Game) {
        super(game);
        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
        this.createMultiple(100, Assets.Images.SpritesheetsBullet.getName());

        this.setAll('anchor.x', 0.5);
        this.setAll('anchor.y', 0.5);
        this.setAll('outOfBoundsKill', true);
        this.setAll('checkWorldBounds', true);
        game.add.existing(this);
    }
}