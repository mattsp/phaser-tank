import * as AssetUtils from '../utils/assetUtils';
import * as Assets from '../assets';

export default class Preloader extends Phaser.State {

    private _loadingLabel: Phaser.Sprite;
    private _progressBar: Phaser.Sprite;

    public preload(): void {
        this._loadingLabel = this.game.add.text(this.game.world.width / 2, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
        this._loadingLabel.anchor.setTo(0.5, 0.5);
        this._progressBar = this.game.add.sprite(this.game.world.width / 2, 200, Assets.Images.SpritesheetsProgressBar.getName());
        this._progressBar.anchor.setTo(0.5, 0.5);
        this.game.load.setPreloadSprite(this._progressBar);
        this.game.load.atlasJSONArray(Assets.Atlases.SpritesheetsTanks.getName(), Assets.Atlases.SpritesheetsTanks.getPNG(), Assets.Atlases.SpritesheetsTanks.getJSONArray());
        this.game.load.atlasJSONArray(Assets.Images.SpritesheetsEnemyTanks.getName(), Assets.Images.SpritesheetsEnemyTanks.getPNG(), Assets.Atlases.SpritesheetsTanks.getJSONArray());
        AssetUtils.Loader.loadAllAssets(this.game);
    }

    public create(): void {
        this._startGame();
    }

    private _startGame(): void {
        this.state.start('game');
    }
}
