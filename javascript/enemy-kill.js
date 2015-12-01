// find the bullets location and the towers location
// if they are crossing over
// set the enemy to dead

function AABB(a_min_x, a_max_x, a_min_y, a_max_y,
              b_min_x, b_max_x, b_min_y, b_max_y) {
    //console.log("checking collision");
    if (b_max_y < a_min_y ||
        b_max_x < a_min_x ||
        b_min_y > a_max_y ||
        b_min_x > a_max_x) {
        //console.log("no collision");
        return false;
    }
    //console.log("COLLISION DETECTED");

    return true;
}

function checkCollide() {
    //console.log("entering collide checker");

//check for collisions with asteroids
    for (var thisTower = 0; thisTower < testTower.allTowers.length; thisTower++) {
        //console.log("check towers");
        //console.log("how many towers: ", testTower.allTowers.length)
        //console.log("check bullets: ", testTower.allTowers[thisTower].thisTowerBullets[thisBullet].x, testTower.allTowers[thisTower].thisTowerBullets[thisBullet].y);
        for (var thisEnemy = 0; thisEnemy < enemy.length; thisEnemy++) {
            for (var thisBullet = 0; thisBullet < testTower.allTowers[thisTower].thisTowerBullets.length; thisBullet++) {
                //console.log("check enemy: ", enemy[thisEnemy].x, enemy[thisEnemy].y);
                //console.log("bullet x: ", testTower.allTowers[thisTower].thisTowerBullets[thisBullet].x)
                //console.log("bullet y: ", testTower.allTowers[thisTower].thisTowerBullets[thisBullet].y)
                //bullet is not in forbidden area
                if (AABB(
                        testTower.allTowers[thisTower].thisTowerBullets[thisBullet].x,
                        testTower.allTowers[thisTower].thisTowerBullets[thisBullet].x + testTower.allTowers[thisTower].thisTowerBullets[thisBullet].image.width,
                        testTower.allTowers[thisTower].thisTowerBullets[thisBullet].y,
                        testTower.allTowers[thisTower].thisTowerBullets[thisBullet].y + testTower.allTowers[thisTower].thisTowerBullets[thisBullet].image.height,
                        3 * (TILE),
                        3 * (TILE) + TILE,
                        0,
                        TILE
                    ) === false

                ) {
                    //console.log("true");

                    //console.log("check");
                    if (AABB(
                            testTower.allTowers[thisTower].thisTowerBullets[thisBullet].x,
                            testTower.allTowers[thisTower].thisTowerBullets[thisBullet].x + testTower.allTowers[thisTower].thisTowerBullets[thisBullet].image.width,
                            testTower.allTowers[thisTower].thisTowerBullets[thisBullet].y,
                            testTower.allTowers[thisTower].thisTowerBullets[thisBullet].y + testTower.allTowers[thisTower].thisTowerBullets[thisBullet].image.height,
                            enemy[thisEnemy].x + (TILE),
                            (enemy[thisEnemy].x + (TILE)) + enemy[thisEnemy].image.width,
                            enemy[thisEnemy].y + (TILE),
                            (enemy[thisEnemy].y + TILE) + enemy[thisEnemy].image.height
                            //testTower.allTowers[i].x,
                            //testTower.allTowers[i].x + testTower.allTowers[i].x.width,
                            //testTower.allTowers[i].y,
                            //testTower.allTowers[i].y + testTower.allTowers[i].height
                            //bullets[j].x + bullets[j].image.width / 2,
                            //bullets[j].y - bullets[j].image.height / 2,
                            //bullets[j].y + bullets[j].image.height / 2
                        )) {


                        if ((enemy[thisEnemy].health <= 0 || (enemy[thisEnemy].health - 20 <= 0)) && !enemy[thisEnemy].dead) {
                            enemy[thisEnemy].dead = true;
                            money += 10;
                        }

                        if (!enemy[thisEnemy].dead) {
                            enemy[thisEnemy].health -= 20;
                            //console.log("Enemy Health" + enemy[thisEnemy].health);
                            GhostDeath.play();

                        }
                        //console.log("enemy: ", thisEnemy, " ", enemy[thisEnemy].dead);
                        //asteroids.splice(i, 1);
                        //bullets.slice(j, 1);
                        //gameScore++;

                        testTower.allTowers[thisTower].thisTowerBullets[thisBullet].dead = true;

                    }

                } else {
                    testTower.allTowers[thisTower].thisTowerBullets[thisBullet].dead = true;
                }
            }
        }
        //console.log("leave collide checker");

    }
}
/*
 //check for collision of Asteroid with player
 for (var i = 0; i < asteroids.length; i++) {

 if (AABB(testTower.allTowers[i].x - testTower.allTowers[i].image.width / 2,
 testTower.allTowers[i].x + testTower.allTowers[i].image.width / 2,
 testTower.allTowers[i].y - testTower.allTowers[i].image.height / 2,
 testTower.allTowers[i].y + testTower.allTowers[i].image.height / 2,
 player.x - player.image.width / 2,
 player.x + player.image.width / 2,
 player.y - player.image.height / 2,
 player.y + player.image.height / 2
 )) {
 player.isDead = true;
 GAME_STATE = STATE_GAMEOVER;
 asteroids = [];
 break;

 }
 }
 */