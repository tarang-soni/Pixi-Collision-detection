import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";

var app = new PIXI.Application                                                          //Create our application instance
({
    width: 512, //width: window.innerWidth - 20,
    height: 512, //height: window.innerHeight - 20,
    backgroundColor: 0x22330f   
});
document.body.appendChild(app.view);

var bunny = PIXI.Sprite.from("../Assets/bunny.png");
bunny.anchor.set(0.5);
bunny.position.set(app.screen.width/2,app.screen.height/2);
app.stage.addChild(bunny);
 