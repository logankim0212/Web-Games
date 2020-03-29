//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function () {
    // variable declarations
    let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage: createjs.Stage;

    let currentSceneState: scenes.State;
    let currentScene: objects.Scene;

    let assets: createjs.LoadQueue;

    let assetManifest =
        [
            { id: "road", src: "./Assets/images/road.png" }, // own creation
            { id: "button", src: "./Assets/images/button.png" }, // from Tom Tsiliopoulos
            { id: "placeholder", src: "./Assets/images/placeholder.png" }, // from Tom Tsiliopoulos
            { id: "btnStart", src: "./Assets/images/btnStart.png" }, // from https://www.pngguru.com/free-transparent-background-png-clipart-bwqrj
            { id: "btnInstruction", src: "./Assets/images/btnInstruction.png" }, // from https://www.pngguru.com/free-transparent-background-png-clipart-bwqrj
            { id: "btnExit", src: "./Assets/images/btnExit.png" } // from https://www.pngguru.com/free-transparent-background-png-clipart-bwqrj
        ];

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

        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn 
     */
    function Update(): void {
        if (currentSceneState != config.Game.SCENE) {
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
        switch (config.Game.SCENE) {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start();
                break;
        }

        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);
    }

    window.addEventListener('load', Preload);
})();