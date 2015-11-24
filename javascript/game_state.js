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

	// Check if any towers have been placed on the map
	if (testTower.allTowers.length > 0) {

		//LOOP THROUGH EACH TOWER
		for (var i = 0; i < testTower.allTowers.length; i++) {

			//Cycle through each tower and get the distance from each enemy
			//shoot the enemy that is closest
			var nearest = canvas.width * 10; // make the default value impossibly large to ensure it is overwritten by a smaller value
			var towerRange = 200; // how far away an object is before it is shot
			var thisEnemyDistanceX;
			var thisEnemyDistanceY;
			var enemyToShoot;
			var nearestX = canvas.width * 10;
			var nearestY = canvas.width * 10;

			function distance (firstPoint, secondPoint){
				if (firstPoint > secondPoint) {
					return firstPoint - secondPoint;
				} else {
					return secondPoint - firstPoint;
				}
			}


			/*
				for every tower tower:
					loop through every enemy:
						mag: get its distance from tower,
						if it's less than the lowest distance,
						make this the new lowest distance,
						make this enemy the new target.
					end loop
				end for
			 */


			// LOOP THROUGH EACH ENEMY AND MEASURE THE DISTANCE TO THE TOWER
			for(var k = 0; k < enemy.length; k++){
				var towerRadius = mag({
					towerX: testTower.allTowers[i].x,
					towerY: testTower.allTowers[i].y,
					enemyU: enemy[k].x,
					enemyV: enemy[k].y
				});
				if(towerRadius.distance < nearest ){
					nearest = towerRadius.distance;
					enemyToShoot = k;
					console.log("tower: ", i, "enemy to shoot: ", enemyToShoot, "distance: ", nearest);
				}

				//if (((thisEnemyDistanceX = distance(enemy[k].x, testTower.allTowers[i].x)) < nearestX) && (thisEnemyDistanceY = distance(enemy[k].y, testTower.allTowers[i].y) < nearestY)) {
				//	nearestX = thisEnemyDistanceX;
				//	nearestY = thisEnemyDistanceY;
				//	nearest = thisEnemyDistanceX + thisEnemyDistanceY;
				//	enemyToShoot = k;
				//	console.log("tower: ", i, "enemy to shoot: ", enemyToShoot, "distance: ", nearest);
				//}
			}

			//get the mag for this bullet
			var shootDirection = mag({
				towerX: testTower.allTowers[i].x,
				towerY: testTower.allTowers[i].y,
				enemyU: enemy[enemyToShoot].x,
				enemyV: enemy[enemyToShoot].y
			});


			if (
					((distance(enemy[enemyToShoot].x, testTower.allTowers[i].x) < towerRange)) && ((distance(enemy[enemyToShoot].y, testTower.allTowers[i].y) < towerRange))
			) {
				//shoot the bullet
				testTower.allTowers[i].thisTowerBullets[towerShootCount].fire(testTower.allTowers[i].x + 25, testTower.allTowers[i].y + 5, shootDirection.normalX, shootDirection.normalY);
				//debugger;
			}

			for (var j = 0; j < 50; j++) {

				testTower.allTowers[i].thisTowerBullets[j].update(deltaTime);
				testTower.allTowers[i].thisTowerBullets[j].draw(10, 10);
			}


		}
		towerShootCount++;
		if (towerShootCount > 49) {
			towerShootCount = 0;
		}
	}


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
	