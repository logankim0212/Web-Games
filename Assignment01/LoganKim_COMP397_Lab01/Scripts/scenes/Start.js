"use strict";
/**
 * Logan J. Kim
 * 300973239
 * February 6, 2020
 *
 * Description:
 * Wingardium Luckiosa is a single players single-screen slot machine game designed with Harry Potter theme.
 * This game will contain three screens: start, game and end. Player will lose once they lost all of their credits;
 * however, they can continue to play as long as they want if they have enough credit.
 *
 * Version:
 * v1.0 Alpha Release
 */
var scenes;
(function (scenes) {
    class Start extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super();
            // initialization
            this.background = new objects.Image();
            this.startLabelCasino = new objects.Label();
            this.startLabelGame = new objects.Label();
            this.startButton = new objects.Image();
            this.Start();
        }
        // PUBLIC METHODS
        Start() {
            this.background = new objects.Image(util.START_SCREEN_PATH, 0, 0, util.STAGE_W, util.STAGE_H, false);
            this.startLabelCasino = new objects.Label("Casino Royale", "40px", "Arial", "#ffff00", 420, 50, true);
            this.startLabelGame = new objects.Label("Wingardium Luckiosa Slot Machine", "30px", "Arial", "#00ffff", 420, 100, true);
            this.startButton = new objects.Image(util.BTN_PLAY_PATH, 420, 400, 200, 100, true);
            this.startButton.HoverOn();
            this.Main();
        }
        Update() {
        }
        Main() {
            this.addChild(this.background);
            this.addChild(this.startLabelCasino);
            this.addChild(this.startLabelGame);
            this.addChild(this.startButton);
            this.startButton.on("click", function () {
                config.Game.SCENE_STATE = scenes.State.PLAY;
            });
        }
    }
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map