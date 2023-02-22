import * as PIXI from 'pixi.js';
import Data from "./Data.js"

import GameObject from "./GameObject.js";


export default class Game extends PIXI.Container {

    constructor() {
        super();


        document.addEventListener('keydown', (e)=>this.CheckKeyDown(e));
        document.addEventListener('keyup', (e)=>this.CheckKeyUp(e));
        this.camera = new PIXI.Container(); 
        this.addChild(this.camera);
        this.drawGUI();


        this.Start();
    }
    drawGUI() {
        this.xAxisLine = new PIXI.Graphics();

        this.xAxisLine.lineStyle(1, 0xffffff)
            .moveTo(-Data.SCREEN_WIDTH / 2, 0).lineTo(Data.SCREEN_WIDTH, 0);
        this.camera.addChild(this.xAxisLine);

        this.xAxisLine.alpha = 0.2;

        this.yAxisLine = new PIXI.Graphics();


        this.yAxisLine.lineStyle(1, 0xffffff)
            .moveTo(0, -Data.SCREEN_HEIGHT / 2).lineTo(0, Data.SCREEN_HEIGHT);
        this.camera.addChild(this.yAxisLine);

        this.yAxisLine.alpha = 0.2;
    }

    Start() {
        this.bunny = new GameObject("../Assets/bunny.png");
        this.camera.addChild(this.bunny);

        this.bunny.anchor.set(0.5);

        this.camera.position.set(0);
        this.camera.pivot.x= this.bunny.position.x;
        this.camera.pivot.y= this.bunny.position.y;
        // this.addChild(this.platform);
        this.drawLevel();
    }
    drawLevel(){
        this.blocksX = Data.SCREEN_WIDTH/50;
        this.blocksY = Data.SCREEN_HEIGHT/50;
        this.map1 = [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,1,1,0,0,0,1,1,0,0],
            [0,1,1,0,0,0,1,1,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [0,1,0,0,0,0,0,0,1,0],
            [0,0,1,1,1,1,1,1,0,0],
        ]
        this.mapContainer = new PIXI.Container();
        this.mapBlocks = [];
        for(let i = 0; i < this.map1.length; i++) {
            for (let j = 0; j < this.map1[i].length; j++) {
                
                let a = new PIXI.Graphics();
                a.beginFill(0xfee00f);
                if(this.map1[j][i] == 0){
                    continue;
                }
                
                a.drawRect(50*i,50*j,50,50);
                a.endFill();
                this.mapBlocks.push(a);
                this.mapContainer.addChild(a);
            }
            
        }
        this.camera.addChild(this.mapContainer);
        this.mapContainer.position.x = -Data.SCREEN_WIDTH/2;
        this.mapContainer.position.y = -Data.SCREEN_HEIGHT/2;

        this.isplayerColliding = false;
    }
    Update(dT) {
        
        var targetPos = this.bunny.position;
        this.camera.pivot.x = (targetPos.x-this.camera.pivot.x)*0.1+this.camera.pivot.x;
        this.camera.pivot.y = (targetPos.y-this.camera.pivot.y)*0.1+this.camera.pivot.y;
        
        this.bunny.Update(dT);
        this.bunny.isGrounded = false;
        for(let i = 0; i < this.mapContainer.children.length; i++)
        {
            let platform = this.mapContainer.children[i];
            if (this.bunny.AABBCollision(platform)) {
                this.bunny.isGrounded = this.bunny.checkCollision(platform);
                
            }
        }
    }
    InputHandler(e, state) {
        this.bunny.CheckInput(e, state);
    }
    CheckKeyUp(e) {
        this.InputHandler(e, 0);
    }
    CheckKeyDown(e) {
        this.InputHandler(e, 1);
    }



}