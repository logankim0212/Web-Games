"use strict";
var objects;
(function (objects) {
    class Bullet extends objects.GameObject {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super(config.Game.ASSETS.getResult("bullet"), 0, 0, true);
            this.Start();
        }
        // PRIVATE METHODS
        _checkBounds() {
            // upper bounds
            if (this.position.y <= -this.height) {
                this.Reset();
            }
            // lower bounds
            if (this.position.y >= config.Game.SCREEN_HEIGHT + this.height) {
                this.Reset();
            }
        }
        _move() {
            this.position = objects.Vector2.add(this.position, this.velocity);
        }
        // PUBLIC METHODS
        Start() {
            this.type = enums.GameObjectType.BULLET;
            this._verticalSpeed = 5; // 5 px per frame
            this.velocity = new objects.Vector2(0, -this._verticalSpeed);
            this.position = new objects.Vector2(-1000, -1000);
        }
        Update() {
            if (this.isActive) {
                this._move();
                this._checkBounds();
            }
        }
        Reset() {
            this.position = new objects.Vector2(-1000, -1000);
            this.isActive = false;
            config.Game.BULLET_MANAGER.ReturnBullet(this);
        }
    }
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=Bullet.js.map