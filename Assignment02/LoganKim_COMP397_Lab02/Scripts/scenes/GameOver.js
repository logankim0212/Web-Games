"use strict";
var scenes;
(function (scenes) {
    class GameOver extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super();
            this._gameOverLabel = new objects.Label("Game Over", "40px", "Consolas", "red", 300, 80, true);
            this._btnRestart = new objects.Button(config.Game.ASSETS.getResult("btnRestart"), 300, 460, true);
            this._btnMain = new objects.Button(config.Game.ASSETS.getResult("btnMain"), 300, 520, true);
            this._background = new createjs.Bitmap(config.Game.ASSETS.getResult("bgGameOver"));
            this._scoreBoard = new managers.ScoreBoard();
            this.Start();
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        // Initializing and Instantiating
        Start() {
            this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
            this.Main();
        }
        Update() {
        }
        Main() {
            this.addChild(this._background);
            this.addChild(this._gameOverLabel);
            this.addChild(this._btnRestart);
            this.addChild(this._btnMain);
            this._btnRestart.on("click", () => {
                config.Game.SCENE_STATE = scenes.State.PLAY;
            });
            this._btnMain.on("click", () => {
                config.Game.SCENE_STATE = scenes.State.START;
            });
            this.addChild(this._scoreBoard.highScoreLabel);
        }
        Clean() {
            this.removeAllChildren();
        }
    }
    scenes.GameOver = GameOver;
})(scenes || (scenes = {}));
//# sourceMappingURL=GameOver.js.map