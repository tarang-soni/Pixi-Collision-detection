import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";


export default class GameObject extends PIXI.Sprite {

    constructor(assetPath) {
        super(PIXI.Texture.from(assetPath));
        this.accel = new PIXI.Point(0);
        this.velocity = new PIXI.Point(0);
        this.speed = 0.3;
        this.jumpHeight = 1;
        this.gravity = 5;
        this.maxYSpeed = 3;
 
        this.IsMovePressed = {
            KeyW: false,
            KeyS: false,
            KeyA: false,
            KeyD: false,
            Space: false,
        };

        this.isGrounded = false;
    }
    CheckInput(e, state) {
        switch (e.code) {
            case 'KeyW':
            case 'KeyS':
            case 'KeyA':
            case 'KeyD':
            case 'Space':
                this.IsMovePressed[e.code] = state;

                break;
        }
    }
    Update(dT) {
        this.Move(dT);
        this.position.y += 1;
        if (!this.isGrounded) {
            this.velocity.y = this.gravity * dT / 10;
            this.accel.y += this.velocity.y * dT / 10;
            if (this.accel.y >= this.maxYSpeed) {
                this.accel.y = this.maxYSpeed;
            }
            this.position.y += this.accel.y;
        }
        else {
            this.velocity.y = 0.1;
            this.accel.y = 0;
        }

        this.accel.x += this.velocity.x * dT;
        this.position.x += this.accel.x * dT;
        this.position.y += this.accel.y * dT;

        this.accel.x = this.accel.x - 0.1 * this.accel.x;
    }
    AABBCollision(other) {
        let bounds1 = this.getBounds();
        let bounds2 = other.getBounds();

        let top = bounds2.y - (bounds1.y + bounds1.height);
        let bottom = bounds1.y - (bounds2.y + bounds2.height);
        let left = bounds2.x - (bounds1.x + bounds1.width);
        let right = bounds1.x - (bounds2.x + bounds2.width);

        return (top < 0 && bottom < 0 && left < 0 && right < 0);
    }
    checkCollision(other) {

        let bounds1 = this.getBounds();
        let bounds2 = other.getBounds();

        if (bounds1.x + bounds1.width > bounds2.x) {
            if (bounds1.x+bounds1.width-5 < bounds2.x && bounds1.y + bounds1.height -5 > bounds2.y && bounds1.y < bounds2.y + bounds2.height){
                this.x -= (bounds1.x + bounds1.width) - bounds2.x;
                this.accel.x = 0;
                return false;
                
            }
            
        }
        if (bounds1.x < bounds2.x+bounds2.width) {
            if (bounds1.x > bounds2.x +bounds2.width-5&& bounds1.y +bounds1.height-5 > bounds2.y && bounds1.y < bounds2.y + bounds2.height) {
                this.x += (bounds2.x + bounds2.width) - (bounds1.x);
                this.accel.x = 0;
                return false;
            }
        }
        if (bounds1.y + bounds1.height > bounds2.y) {
            if(bounds1.y<bounds2.y && bounds1.x+bounds1.width>bounds2.x && bounds1.x<bounds2.x+bounds2.width){

                this.y -= (bounds1.y + bounds1.height) - (bounds2.y);
                return true;
            }
        }
        if (bounds1.y < bounds2.y + bounds2.height) {
            if(bounds1.y>bounds2.y && bounds1.x+bounds1.width>bounds2.x&&bounds1.x<bounds2.x+bounds2.width-1){
                this.y +=  (bounds2.y + bounds2.height) - (bounds1.y);
                this.accel.y = 0;
                return false;
            }
        }
        //fix collision from below
    }
    Move(dT) {
        this.velocity.set(0);

        if (this.IsMovePressed['KeyA']) {
            this.velocity.x = -this.speed;
        }
        if (this.IsMovePressed['KeyD']) {
            this.velocity.x = this.speed;
        }
        if (this.IsMovePressed['Space']) {
            

            if (this.isGrounded ) {
                this.velocity.y -= Math.sqrt(this.jumpHeight * this.gravity) * dT;
                this.accel.y = this.velocity.y / dT;
                this.position.y += this.accel.y;
                this.isGrounded = false;
            }
            
        }
    }
}