var enemyDead = [];
var onRoad = false;
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime() {
    endFrameMillis = startFrameMillis;
    startFrameMillis = Date.now();

    // Find the delta time (dt) - the change in time since the last drawFrame
    // We need to modify the delta time to something we can use.
    // We want 1 to represent 1 second, so if the delta is in milliseconds
    // we divide it by 1000 (or multiply by 0.001). This will make our
    // animations appear at the right speed, though we may need to use
    // some large values to get objects movement and rotation correct
    var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;

    // validate that the delta is within range
    if (deltaTime > 1)
        deltaTime = 1;

    return deltaTime;
}

//-------------------- Don't modify anything above here

// some variables to calculate the Frames Per Second (FPS - this tells use
// how fast our game is running, and allows us to make the game run at a 
// constant speed)


var METER = TILE;

var GRAVITY = METER * 6.3 * 3;

var MAXDX = METER * 10;
var MAXDY = METER * 15;

var ACCEL = MAXDX * 2;
var FRICTION = MAXDX * 6;

var JUMP = METER * 1500;

var ENEMY_MAXDX = METER * 5;
var ENEMY_ACCEL = ENEMY_MAXDX * 2;
var LAYER_BACKGROUND = 0;
var LAYER_LADDERS = 2;
var LAYER_OBJECT_TRIGGERS = 4;
var restart = 0;
var SCREEN_WIDTH = canvas.width;

var SCREEN_HEIGHT = canvas.height;

var MAINMENU_STATE = 0;
var GAME_STATE = 1;
var END_STATE = 2;

var state = MAINMENU_STATE;


var cur_bullet_index = 0;
//collision array
var cells = [];
function initialise() {
    for (var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) {
        // create environment tiles
        cells[layerIdx] = [];
        var idx = 0;
        for (var y = 0; y < level.layers[layerIdx].height; y++) {
            cells[layerIdx][y] = [];
            for (var x = 0; x < level.layers[layerIdx].width; x++) {
                if (level.layers[layerIdx].data[idx] != 0) {
                    cells[layerIdx][y][x] = 1;
                    cells[layerIdx][y][x + 1] = 1;
                    cells[layerIdx][y - 1][x] = 1;
                    cells[layerIdx][y - 1][x + 1] = 1;
                }
                else if (cells[layerIdx][y][x] != 1) {
                    cells[layerIdx][y][x] = 0;
                }
                idx++;
            }
        }

    }
}

initialise();

var keyboard = new Keyboard();
var mouselistener = new Mouse();
var testTower = new Tower();
var bullet = new Bullet();

var music = new Howl(
    {
        urls: [""],
        loop: true,
        buffer: true,
        volume: 0.5
    });

//UNCOMMENT FOR MUSIC, add new music first 
//music.play();
var jitter = Math.random() * 0.2 - 0.1;
//console.log(jitter);
//bullet.fire(100, 100, 1, jitter);

var towerShootCount = 0;


function pixelToTile(pixel) {
    return Math.floor(pixel / TILE);
}


var menu_music = new Howl({
    urls: ["audio/kevin-macleod-the-lift.mp3"],
    loop: true,
    buffer: true,
    volume: 0.5
});

var game_music = new Howl({
    urls: ["audio/kevin-macleod-mystic-force.mp3"],
    loop: true,
    buffer: true,
    volume: 0.5
});

var ned_music = new Howl({
    urls: ["audio/kevin-macleod-the-lift.mp3"],
    loop: true,
    buffer: true,
    volume: 0.5
});
var is_menu_music_playing = false;
var is_game_music_playing = false;
var is_ned_music_playing = false;

//var music = new Howl(
//{
//	(menu_state){
//
//	};
//	if (game_state){
//		urls: ["audio/TheLift.mp3"],
//		loop: true,
//		buffer: true,
//		volume: 0.5
//	};
//	else if (end_state){
//		urls: ["audio/Rest.mp3"],
//		loop: true,
//		buffer: true,
//		volume: 0.5
//	}
//
//});
//uncomment for music
//music.play();


//RUN
function run() {
    switch (state) {
        case(MAINMENU_STATE):
            if (!is_menu_music_playing) {
                menu_music.play();
                is_menu_music_playing = true;
            }
            if (is_game_music_playing) {
                game_music.stop();
                is_game_music_playing = false;
            }
            if (is_ned_music_playing) {
                ned_music.stop();
                is_ned_music_playing = false;
            }

            //if (window.onload === true ) {
            //    townHideShow();
            //}            //townImage.style.visibility = 'hidden';
            runMenu();
            break;
        case(GAME_STATE):
            if (is_menu_music_playing) {
                menu_music.stop();
                is_menu_music_playing = false;
            }
            if (!is_game_music_playing) {
                game_music.play();
                is_game_music_playing = true;
            }
            if (is_ned_music_playing) {
                ned_music.stop();
                is_ned_music_playing = false;
            }
            //townImage.style.visibility == 'visible';
            //if (window.onload === true ) {
                townHideShow();
            //} else {

            //townImage.style.visibility = 'visible';

            //}
            runGame();
            break;
        case(END_STATE):
            if (is_menu_music_playing) {
                menu_music.stop();
                is_menu_music_playing = false;
            }
            if (is_game_music_playing) {
                game_music.stop();
                is_game_music_playing = false;
            }
            if (!is_ned_music_playing) {
                ned_music.play();
                is_ned_music_playing = true;
            }
            //townImage.style.visibility = 'hidden';
            //if (window.onload === true ) {
                townHideShow();
            //}
            runEnd();
            break;
    }
    //lives = 0;
}
/*
 function run() {
 context.fillStyle = "green";
 context.fillRect(0, 0, canvas.width, canvas.height);


 var deltaTime = getDeltaTime();

 drawMap(0,0);
 drawhud();
 //drawTowerInventory();




 if (mouselistener.mouseDown == true) {
 context.fillStyle = "#f00";
 context.font="14px Arial";

 context.fillText("MOUSE DOWN - POSITION: " + mouselistener.page_x + " / " + mouselistener.page_y, 5, 40);
 context.fillText("TILE POSITION: " +  pixelToTile(mouselistener.page_x) + " / " + pixelToTile(mouselistener.page_y), 5, 60);

 var mouse_x = pixelToTile(mouselistener.page_x);
 var mouse_y = pixelToTile(mouselistener.page_y);

 context.fillText("TILE POSITION IN PIXELS: " + tileToPixel(mouse_x) + " / " + tileToPixel(mouse_y), 5, 80);
 }
 drawMap(0, 0);
 drawhud();
 //drawTowerInventory();

 if (mouselistener.mouseDown == true) {
 context.fillStyle = "#f00";
 context.font = "14px Arial";

 context.fillText("MOUSE DOWN - POSITION: " + mouselistener.page_x + " / " + mouselistener.page_y, 5, 40);
 context.fillText("TILE POSITION: " + pixelToTile(mouselistener.page_x) + " / " + pixelToTile(mouselistener.page_y), 5, 60);

 var mouse_x = pixelToTile(mouselistener.page_x);
 var mouse_y = pixelToTile(mouselistener.page_y);

 context.fillText("TILE POSITION IN PIXELS: " + tileToPixel(mouse_x) + " / " + tileToPixel(mouse_y), 5, 80);
 }


 //TOWERS
 testTower.update();
 testTower.draw(mouselistener.page_x, mouselistener.page_y);

 //FIRE BULLETS FROM EACH TOWER
 if (testTower.allTowers.length > 0) {
 //console.log("tower length:", testTower.allTowers.lengthj
 for (var i = 0; i < testTower.allTowers.length; i++) {
 //console.log("#towers: ", testTower.allTowers.length);
 //console.log("index: ", i);


 //console.log("shoot count: ", towerShootCount);
 var jitter = Math.random() * 0.2 - 0.1;

 //get the mag for this bullet
 var shootDirection = mag({
 towerX: testTower.allTowers[i].x,
 towerY: testTower.allTowers[i].y,
 enemyU: enemy.x,
 enemyV: enemy.y
 });
 console.log(shootDirection.normalY, ", ", shootDirection.normalX);
 //shootDirection.normalY -= .5;

 // only shoot if enemy is within range
 var towerRangeX = testTower.allTowers[i].x;

 var aSide = "";
 var bSide = "" ;
 var cSide = "";

 //shoot the bullet
 testTower.allTowers[i].thisTowerBullets[towerShootCount].fire(testTower.allTowers[i].x+25, testTower.allTowers[i].y+5, shootDirection.normalX, shootDirection.normalY);
 //debugger;

 //testTower.allTowers[i].thisTowerBullets[towerShootCount].update(deltaTime);
 //testTower.allTowers[i].thisTowerBullets[towerShootCount].draw(10, 10);

 for (var j = 0; j < 50; j++) {

 //console.log(j);
 var jitter = Math.random() * 0.2 - 0.1;
 //testTower.allTowers[i].thisTowerBullets[j].fire(testTower.allTowers[i].x, testTower.allTowers[i].y, 1, jitter);
 testTower.allTowers[i].thisTowerBullets[j].update(deltaTime);
 testTower.allTowers[i].thisTowerBullets[j].draw(10, 10);
 }


 }
 towerShootCount++;
 if (towerShootCount > 49) {
 towerShootCount = 0;
 }
 }

 // BULLETS
 //bullet.update(deltaTime);

 //bullet.fire(mouselistener.page_x, mouselistener.page_y, 5, 5 );

 //bullet.draw(10,10);

 var deathCount = 0;

 for (var deadEnemy = 0; deadEnemy < enemy.length; deadEnemy++) {
 if (enemy[deadEnemy].dead == true)
 deathCount+=1;
 }

 if (deathCount == wavePopulation) {
 waveFinished = true;
 waveStarted = false;
 wave+=1
 }

 if (!waveStarted || waveFinished) {
 startWave();

 }


 //ENEMIES
 for (var enemyIndex = 0; enemyIndex < (wave * 40) / 2; enemyIndex++) {
 enemy[enemyIndex].update(deltaTime);
 enemy[enemyIndex].draw();
 }

 }
 */

//-------------------- Don't modify anything below here


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function () {
    var onEachFrame;
    if (window.requestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () {
                cb();
                window.requestAnimationFrame(_cb);
            }
            _cb();
        };
    } else if (window.mozRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () {
                cb();
                window.mozRequestAnimationFrame(_cb);
            }
            _cb();
        };
    } else {
        onEachFrame = function (cb) {
            setInterval(cb, 1000 / 60);
        }
    }

    window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
