import * as PIXI from 'pixi.js';
import Data from "./Data.js"
import Game from "./Game.js";

var app = new PIXI.Application(
    {
        width: Data.SCREEN_WIDTH,
        height: Data.SCREEN_HEIGHT,
        backgroundColor: 0x414141
    }
);
document.body.appendChild(app.view);
app.ticker.maxFPS = 60;
var game = new Game();
app.stage.addChild(game);
game.position.set(app.screen.width / 2, app.screen.height / 2);

app.ticker.add((dT) => {
    game.Update(dT);
});