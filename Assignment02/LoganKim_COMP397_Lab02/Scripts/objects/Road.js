"use strict";
var objects;
(function (objects) {
    class Road extends objects.GameObject {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super(config.Game.ASSETS.getResult("road"));
            this.Start();
        }
        // PRIVATE METHODS
        _checkBounds() {
            if (this.y >= 0) {
                this.Reset();
            }
        }
        _move() {
            this.position = objects.Vector2.add(this.position, this.velocity);
        }
        // PUBLIC METHODS
        Start() {
            this._verticalSpeed = 5; // 5 px per frame
            this.velocity = new objects.Vector2(0, this._verticalSpeed);
            this.Reset();
        }
        Update() {
            this._move();
            this._checkBounds();
        }
        Reset() {
            this.position = new objects.Vector2(0, -245);
        }
    }
    objects.Road = Road;
})(objects || (objects = {}));
//# sourceMappingURL=Road.js.map