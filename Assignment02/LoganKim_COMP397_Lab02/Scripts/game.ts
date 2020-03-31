//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function () {
    // variable declarations
    let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage: createjs.Stage;

    let currentSceneState: scenes.State;
    let currentScene: objects.Scene;

    let assets: createjs.LoadQueue;

    let zombieAtlas: createjs.SpriteSheet;

    let assetManifest =
        [
            { id: "road", src: "./Assets/images/road.png" }, // from https://opengameart.org/content/golgotha-textures-tunnelroadjpg
            { id: "avatar", src: "./Assets/images/avatar.png" }, // from https://webstockreview.net/pict/getfirst
            { id: "bullet", src: "./Assets/images/bullet.png" }, // from https://www.clipart.email/download/7844222.html
            { id: "pothole", src: "./Assets/images/pothole.png" }, // from http://www.pngall.com/hole-png/download/36973
            { id: "zombie", src: "./Assets/images/zombieSprite.png" }, // from https://opengameart.org/content/animated-top-down-zombie
            { id: "splash", src: "./Assets/images/splash.png" }, // own creation of COSMOS Games
            { id: "button", src: "./Assets/images/button.png" }, // from Tom Tsiliopoulos
            { id: "placeholder", src: "./Assets/images/placeholder.png" }, // from Tom Tsiliopoulos
            { id: "btnStart", src: "./Assets/images/btnStart.png" }, // from https://www.pngguru.com/free-transparent-background-png-clipart-bwqrj
            { id: "btnInstruction", src: "./Assets/images/btnInstruction.png" }, // from https://www.pngguru.com/free-transparent-background-png-clipart-bwqrj
            { id: "btnExit", src: "./Assets/images/btnExit.png" }, // from https://www.pngguru.com/free-transparent-background-png-clipart-bwqrj
            { id: "bgInstruction", src: "./Assets/images/bgInstruction.png" } // from https://www.pngguru.com/free-transparent-background-png-clipart-bwqrj
        ];

    let zombieData =
    {
        "images": {},
        "frames": [
            [1, 1, 100, 93],
            [103, 1, 100, 93],
            [205, 1, 100, 93],
            [1, 96, 100, 93],
            [103, 96, 100, 93],
            [205, 96, 100, 93],
            [1, 191, 100, 93],
            [103, 191, 100, 93],
            [205, 191, 100, 93],
            [1, 286, 100, 93],
            [103, 286, 100, 93],
            [205, 286, 100, 93],
            [307, 1, 100, 93],
            [307, 96, 100, 93],
            [307, 191, 100, 93],
            [307, 286, 100, 93],
            [1, 381, 100, 93]
        ],
        "animations": {
            "zombie": {
                "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                "speed": 0.5
            },
        }
    }
    /**
     * This method preloads assets
     */
    function Preload(): void {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start(): void {
        console.log(`%c Game Started!`, "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);

        zombieData.images = [assets.getResult("zombie")];
        zombieAtlas = new createjs.SpriteSheet(zombieData);
        config.Game.ZOMBIE_ATLAS = zombieAtlas;

        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE_STATE = scenes.State.START;
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn 
     */
    function Update(): void {
        if (currentSceneState != config.Game.SCENE_STATE) {
            Main();
        }

        currentScene.Update();
        stage.update();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main(): void {
        console.log(`%c Scene Switched...`, "color: green; font-size: 16px;");
        // clean up
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.Clean();
            stage.removeAllChildren();
        }

        // switch to the new scene
        switch (config.Game.SCENE_STATE) {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start();
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play();
                break;
            case scenes.State.INSTRUCTION:
                console.log("switch to Instruction Scene");
                currentScene = new scenes.Instruction();
                break;
            case scenes.State.EXIT:
                console.log("switch to Exit Scene");
                currentScene = new scenes.Splash();
                break;
        }

        currentSceneState = config.Game.SCENE_STATE;
        stage.addChild(currentScene);
    }

    window.addEventListener('load', Preload);
})();