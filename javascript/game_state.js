// Wave stuff.
var enemy = [];

var waveFinished = false;
var waveStarted = false;

var wave = 1;
var wavePopulation = 20;
var wave_timer = 0.0;
var enemy_index = 0;
var enemyToShoot;
//var enemyX;
//var enemyY;
var objBullets;
var shootDirection;
var shootX;
var shootY;
var towerRange = 200; // how far away an object is before it is shot

function startWave() {

    waveStarted = true;
    waveFinished = false;
    wave_timer = 0.0;
	enemy = [];
    for (var i = 0; i < wavePopulation; i++) {
        enemy[i] = new Enemy(wave, i);
    }

    //var clock = 2;
    //var second;
    //var index = 0;
    //
    //setInterval(function () {
    //
    //    second = parseInt(clock % 60, 10);
    //
    //
    //	{
    //
    //		index += 1;
    //	}
    //
    //	if (clock-- < 0)
    //	{
    //		clock = 2;
    //	}
    //}, 1000);
    //debugger;

}

function SpawnEnemy(wavePop) {
	console.log("" + enemy.length);
    if (enemy_index < enemy.length)
        enemy[enemy_index].init_waypoints();

    if (enemy_index < enemy.length)
        enemy_index += 1;
}

function pixelToTile(pixel) {
    return Math.floor(pixel / TILE);
}


function runGame() {
    if (lives < 1) {
        state = END_STATE;
    }

    //console.log("nearest: ", nearest);
    var deltaTime = getDeltaTime();
    context.fillStyle = "green";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMap(0, 0);
    drawhud();

    // DEBUGGER
    if (keyboard.isKeyDown(keyboard.KEY_ESCAPE)) {
        debugger;
    }

    /*
     if (mouselistener.mouseDown == true) {
     context.fillStyle = "#f00";
     context.font = "14px Arial";

     context.fillText("MOUSE DOWN - POSITION: " + mouselistener.page_x + " / " + mouselistener.page_y, 5, 40);
     context.fillText("TILE POSITION: " + pixelToTile(mouselistener.page_x) + " / " + pixelToTile(mouselistener.page_y), 5, 60);

     var mouse_x = pixelToTile(mouselistener.page_x);
     var mouse_y = pixelToTile(mouselistener.page_y);

     context.fillText("TILE POSITION IN PIXELS: " + tileToPixel(mouse_x) + " / " + tileToPixel(mouse_y), 5, 80);
     }




     if (mouselistener.mouseDown == true) {
     debugger;
     context.fillStyle = "#f00";
     context.font = "14px Arial";

     context.fillText("MOUSE DOWN - POSITION: " + mouselistener.page_x + " / " + mouselistener.page_y, 5, 40);
     context.fillText("TILE POSITION: " + pixelToTile(mouselistener.page_x) + " / " + pixelToTile(mouselistener.page_y), 5, 60);

     var mouse_x = pixelToTile(mouselistener.page_x);
     var mouse_y = pixelToTile(mouselistener.page_y);

     context.fillText("TILE POSITION IN PIXELS: " + tileToPixel(mouse_x) + " / " + tileToPixel(mouse_y), 5, 80);
     }


     context.fillStyle = "#f00";
     context.font = "14px Arial";

     context.fillText("MOUSE DOWN - POSITION: " + mouselistener.page_x + " / " + mouselistener.page_y, 5, 40);
     context.fillText("TILE POSITION: " + pixelToTile(mouselistener.page_x) + " / " + pixelToTile(mouselistener.page_y), 5, 60);

     var mouse_x = pixelToTile(mouselistener.page_x);
     var mouse_y = pixelToTile(mouselistener.page_y);

     // cellAtPixelCoord(layer, x, y)
     var testLayer = "road";
     context.fillText("TILE POSITION IN PIXELS: " + tileToPixel(mouse_x) + " / " + tileToPixel(mouse_y), 5, 80);
     //context.fillText("LAYER "+ testLayer + ": " + cellAtPixelCoord(testLayer, mouselistener.page_x, mouselistener.page_y), 5, 100);
     */
    //UPDATE/DRAW INVENTORY TOWERS AT BOTTOM OF PAGE
    testTower.update();
    testTower.draw(mouselistener.page_x, mouselistener.page_y);

    // Check if any towers have been placed on the map
    if (testTower.allTowers.length > 0) {

        // if there are enemies and I have shot bullets, check for collisions
        //if ((enemy.length > 0) && towerShootCount > 0) {
        checkCollide();
        //if (typeof enemyDead != 'undefined') {
        //    console.log("enemydead: ", enemyDead);
        //}
        //}
        //var neareststart = 100000; // make the default value impossibly large to ensure it is overwritten by a smaller value


        //LOOP THROUGH EACH TOWER
        for (var thisTower = 0; thisTower < testTower.allTowers.length; thisTower++) {
            //console.log("thisTower: ", thisTower);
            //Cycle through each tower and get the distance from each enemy
            //shoot the enemy that is closest

            var nearest = 100000;
            // LOOP THROUGH EACH ENEMY AND MEASURE THE DISTANCE TO THE TOWER
            for (var k = 0; k < enemy.length; k++) {
                // if the enemy is not dead, how far away is it?
                //console.log("enemy: ", k);

                if (enemy[k].dead === false) {
                    var towerRadius = towerRadiusMag({
                        towerX: testTower.allTowers[thisTower].x,
                        towerY: testTower.allTowers[thisTower].y,
                        enemyU: enemy[k].x,
                        enemyV: enemy[k].y
                    });
                }
                // this enemy is nearer, make this the new nearest target
                if (typeof towerRadius != 'undefined') {
                    //console.log("tower radius has a value");

                    //debugger;
                    if (towerRadius.distance < nearest) {
                        nearest = towerRadius.distance;
                        enemyToShoot = k;
                        //debugger;

                        //console.log("tower: ", thisTower, "enemy to shoot: ", enemyToShoot, "distance: ", nearest);
                    }


                    //if (
                    //		((distance(enemy[enemyToShoot].x, testTower.allTowers[thisTower].x) < towerRange)) &&
                    //		((distance(enemy[enemyToShoot].y, testTower.allTowers[thisTower].y) < towerRange))
                    //) {
                    //&& typeof enemyToShoot != 'undefined'

                }
            }
            // Shoot the enemy that is within range and is closest to this tower
            if (nearest < towerRange) {
                //console.log("in range!");
                // check if this bullet needs jitter and add it if necessary
                if (testTower.allTowers[thisTower].towerType === 2) {

                    var jitter = (Math.random() * 20);
                    //console.log("Jitter: ", jitter);
                    var enemyX = enemy[enemyToShoot].x + jitter;
                    var enemyY = enemy[enemyToShoot].y + jitter;
                } else {
                    var enemyX = enemy[enemyToShoot].x-(TILE/2);
                    var enemyY = enemy[enemyToShoot].y+(TILE/4);
                }

                //get the mag for this bullet
                var shootDirection = shootDirectionMag({
                    towerX: testTower.allTowers[thisTower].x,
                    towerY: testTower.allTowers[thisTower].y,
                    enemyU: enemyX,
                    enemyV: enemyY
                });

                //get this towers bullet count
                objBullets = testTower.allTowers[thisTower].objBulletCount;
                //console.log("bulletCount: ", objBullets)

                //shootX = shootDirection.normalX;
                //shootY = shootDirection.normalY;
                //shoot the bullet
                testTower.allTowers[thisTower].thisTowerBullets[testTower.allTowers[thisTower].objBulletCount].fire(testTower.allTowers[thisTower].x + 25, testTower.allTowers[thisTower].y + 5, shootDirection.normalX, shootDirection.normalY);
                //console.log("shot shot a bullet!");
                //update the bullet count
                //objBullets++;
                //var bulletMax = testTower.allTowers[thisTower].objMaxTowerBullets;
                //console.log("maxBullets: ", bulletMax);
                if (testTower.allTowers[thisTower].objBulletCount < testTower.allTowers[thisTower].objMaxTowerBullets - 1) {
                    testTower.allTowers[thisTower].objBulletCount++;
                } else {
                    testTower.allTowers[thisTower].objBulletCount = 0;
                }
                //debugger;
            }
            // update and draw each bullet
            for (var j = 0; j < testTower.allTowers[thisTower].thisTowerBullets.length; j++) {
                testTower.allTowers[thisTower].thisTowerBullets[j].update(deltaTime);
                testTower.allTowers[thisTower].thisTowerBullets[j].draw(10, 10);

            }


        }

        //towerShootCount++;
        //if (towerShootCount > 9) {
        //    towerShootCount = 0;
        //}
    }

    var deathCount = 0;

    for (var deadEnemy = 0; deadEnemy < enemy.length; deadEnemy++) {
        if (enemy[deadEnemy].dead == true)
            deathCount += 1;
    }

    if (deathCount == wavePopulation) {
        waveFinished = true;
        waveStarted = false;
        wave += 1
    }

    if (!waveStarted || waveFinished) {
        startWave();

    }


    //ENEMIES
    //for (var enemyIndex = 0; enemyIndex < (wave * 40) / 2; enemyIndex++) {
    for (var enemyIndex = 0; enemyIndex < enemy.length; enemyIndex++) {
        enemy[enemyIndex].update(deltaTime);
        enemy[enemyIndex].draw();
    }

    var wavePop = (wave * 40) / 2;

    if (!waveStarted || waveFinished) {
        startWave();
    }
    else {
        wave_timer += deltaTime;
        if (wave_timer > 1.5) {
            SpawnEnemy(wavePop);
            wave_timer = 0.0;
        }
    }

    var deathCount = 0;

    //for (var dead = 0; dead < enemy.length; dead++) {
    //    if (enemy[dead].dead)
    //        deathCount += 1;
    //}

    if (deathCount >= wavePop) {
        wave += 1;
        waveStarted = false;
        waveFinished = true;
        enemy = [];
        //startWave();
    }

    //ENEMIES
    for (var enemyIndex = 0; enemyIndex < enemy.length; enemyIndex++) {
        enemy[enemyIndex].update(deltaTime);
        enemy[enemyIndex].draw();
    }
    /*
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


     //TOWERS
     testTower.update();
     testTower.draw(mouselistener.page_x, mouselistener.page_y);

     //FIRE BULLETS FROM EACH TOWER
     if (testTower.allTowers.length > 0) {
     //console.log("tower length:", testTower.allTowers.lengthj
     for (var thisTower = 0; thisTower < testTower.allTowers.length; thisTower++) {
     console.log("#towers: ", testTower.allTowers.length);
     console.log("index: ", thisTower);


     console.log("shoot count: ", towerShootCount);
     var jitter = Math.random() * 0.2 - 0.1;
     testTower.allTowers[thisTower].thisTowerBullets[towerShootCount].fire(testTower.allTowers[thisTower].x, testTower.allTowers[thisTower].y, 1, jitter);
     //testTower.allTowers[thisTower].thisTowerBullets[towerShootCount].update(deltaTime);
     //testTower.allTowers[thisTower].thisTowerBullets[towerShootCount].draw(10, 10);

     for (var j = 0; j < 50; j++) {

     console.log(j);
     var jitter = Math.random() * 0.2 - 0.1;
     //testTower.allTowers[thisTower].thisTowerBullets[j].fire(testTower.allTowers[thisTower].x, testTower.allTowers[thisTower].y, 1, jitter);
     testTower.allTowers[thisTower].thisTowerBullets[j].update(deltaTime);
     testTower.allTowers[thisTower].thisTowerBullets[j].draw(10, 10);
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


     //ENEMIES
     */
}
	