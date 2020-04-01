module scenes {
    export class GameOver extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _gameOverLabel: objects.Label;
        private _btnRestart: objects.Button;
        private _btnMain: objects.Button;
        private _background: createjs.Bitmap;

        private _scoreBoard: managers.ScoreBoard;

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
        public Start(): void {
            this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
            this._scoreBoard.Score = config.Game.SCORE;

            this.Main();
        }

        public Update(): void {

        }

        public Main(): void {
            this.addChild(this._background);
            this.addChild(this._gameOverLabel);
            this.addChild(this._btnRestart);
            this.addChild(this._btnMain);

            this._btnRestart.on("click", () => {
                this.ResetValues();
                let buttonSound = createjs.Sound.play("buttonSound");
                buttonSound.volume = 0.2; // 20% volume
                config.Game.SCENE_STATE = scenes.State.PLAY;
            });

            this._btnMain.on("click", () => {
                this.ResetValues();
                let buttonSound = createjs.Sound.play("buttonSound");
                buttonSound.volume = 0.2; // 20% volume
                config.Game.SCENE_STATE = scenes.State.MAIN;
            });

            this.addChild(this._scoreBoard.HighScoreLabel);
            this.addChild(this._scoreBoard.CurrentScoreLabel);
        }

        public ResetValues(): void {
            config.Game.LIVES = 3;
            config.Game.SCORE = 0;
            config.Game.BULLET_NUMBER = 20;
        }

        public Clean(): void {
            this.removeAllChildren();
        }


    }
}