function runGame(){

	context.fillStyle = "green";
	context.fillRect(0, 0, canvas.width, canvas.height);


	var deltaTime = getDeltaTime();

	//drawMap(0,0);
	//drawhud();
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
				enemyU: enemy[5].x,
				enemyV: enemy[5].y
			});
			//console.log(shootDirection.normalY, ", ", shootDirection.normalX);
			//shootDirection.normalY -= .5;

			// only shoot if enemy is within range
			var towerRangeX = testTower.allTowers[i].x;

			var aSide = "";
			var bSide = "" ;
			var cSide = "";

			var distanceX = "";
			var distanceY = "";

			//return a positive value
			function negation (number) {
				if (number < 0) {
					return -number
				} else {
					return number
				}
			}

			//go through each tower, cycle through each enemy per tower
			//get distance of enemy. Shoot enemy that is closest
			//kill enemy that you shoot

			//console.log("enemy x,y: ", enemy[5].x, enemy[5].y, "tower x,y: ", testTower.all(Towers[i].x, testTower.allTowers[i].y, "x distance: ", -enemy[5].x - -testTower.allTowers[i].x, ", y distance: ", -enemy[5].y - -testTower.allTowers[i].y);
			/*console.log(
					negation(enemy[5].x - testTower.allTowers[i].x),
					negation(enemy[5].x - testTower.allTowers[i].x) < towerRange,
					negation(enemy[5].y - testTower.allTowers[i].y),
					negation(enemy[5].y - testTower.allTowers[i].y) < towerRange

			);*/
			/*
			console.log(
					(-enemy[5].x - -testTower.allTowers[i].x),
					(-enemy[5].x - -testTower.allTowers[i].x) < towerRange,
					(-enemy[5].y - -testTower.allTowers[i].y),
					(-enemy[5].y - -testTower.allTowers[i].y) < towerRange

			);*/

			var towerRange = 200;

			function distance (firstPoint, secondPoint){
				if (firstPoint > secondPoint) {
					return firstPoint - secondPoint;
				} else {
					return secondPoint - firstPoint;
				}
			}


			if (
					((distance(enemy[5].x, testTower.allTowers[i].x) < towerRange)) && ((distance(enemy[5].y, testTower.allTowers[i].y) < towerRange))
			) {
				//shoot the bulle
				testTower.allTowers[i].thisTowerBullets[towerShootCount].fire(testTower.allTowers[i].x + 25, testTower.allTowers[i].y + 5, shootDirection.normalX, shootDirection.normalY);
				//debugger;
			}







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
	//for (var enemyIndex = 0; enemyIndex < (wave * 40) / 2; enemyIndex++) {
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
		for (var i = 0; i < testTower.allTowers.length; i++) {
			console.log("#towers: ", testTower.allTowers.length);
			console.log("index: ", i);


			console.log("shoot count: ", towerShootCount);
			var jitter = Math.random() * 0.2 - 0.1;
			testTower.allTowers[i].thisTowerBullets[towerShootCount].fire(testTower.allTowers[i].x, testTower.allTowers[i].y, 1, jitter);
			//testTower.allTowers[i].thisTowerBullets[towerShootCount].update(deltaTime);
			//testTower.allTowers[i].thisTowerBullets[towerShootCount].draw(10, 10);

			for (var j = 0; j < 50; j++) {

			 console.log(j);
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

		
	//ENEMIES
	*/
}
	