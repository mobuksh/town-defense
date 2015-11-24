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
    for (var i = 0; i < testTower.allTowers.length; i++) {
        //console.log("check towers");
        //console.log("how many towers: ", testTower.allTowers.length)
        for (var j = 0; j < testTower.allTowers[i].thisTowerBullets.length; j++) {
            //console.log("check bullets");
            for (var k = 0; k < enemy.length; k++) {
                //console.log("check enemy");
                if (AABB(
                        testTower.allTowers[i].thisTowerBullets[j].x,
                        testTower.allTowers[i].thisTowerBullets[j].x + testTower.allTowers[i].thisTowerBullets[j].image.height,
                        testTower.allTowers[i].thisTowerBullets[j].y,
                        testTower.allTowers[i].thisTowerBullets[j].y + testTower.allTowers[i].thisTowerBullets[j].image.height,
                        enemy[k].x,
                        enemy[k].x + enemy[k].image.height,
                        enemy[k].y,
                        enemy[k].y + enemy[k].image.width
                        //testTower.allTowers[i].x,
                        //testTower.allTowers[i].x + testTower.allTowers[i].x.width,
                        //testTower.allTowers[i].y,
                        //testTower.allTowers[i].y + testTower.allTowers[i].height
                        //bullets[j].x + bullets[j].image.width / 2,
                        //bullets[j].y - bullets[j].image.height / 2,
                        //bullets[j].y + bullets[j].image.height / 2
                    )) {
                    enemy[k].dead = true;
                    console.log("enemy ", k, " dead")
                    //asteroids.splice(i, 1);
                    //bullets.slice(j, 1);
                    //gameScore++;
                    break;
                }
            }
        }
    }
    //console.log("leave collide checker");

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