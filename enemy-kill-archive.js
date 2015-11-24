// find the bullets location and the towers location
// if they are crossing over
// set the enemy to dead

function AABB(a_min_x, a_max_x, a_min_y, a_max_y,
              b_min_x, b_max_x, b_min_y, b_max_y) {

    if (b_max_y < a_min_y ||
        b_max_x < a_min_x ||
        b_min_y > a_max_y ||
        b_min_x > a_max_x) {
        return false;
    }

    return true;
}

//check for collisions with asteroids
for (var i = 0; i < asteroids.length; i++) {
    for (var j = 0; j < bullets.length; j++) {
        if (AABB(asteroids[i].x - asteroids[i].image.width / 2,
                asteroids[i].x + asteroids[i].image.width / 2,
                asteroids[i].y - asteroids[i].image.height / 2,
                asteroids[i].y + asteroids[i].image.height / 2,
                bullets[j].x - bullets[j].image.width / 2,
                bullets[j].x + bullets[j].image.width / 2,
                bullets[j].y - bullets[j].image.height / 2,
                bullets[j].y + bullets[j].image.height / 2
            )) {
            asteroids.splice(i, 1);
            bullets.slice(j, 1);
            gameScore++;
            break;
        }
    }
}

//check for collision of Asteroid with player
for (var i = 0; i < asteroids.length; i++) {

    if (AABB(asteroids[i].x - asteroids[i].image.width / 2,
            asteroids[i].x + asteroids[i].image.width / 2,
            asteroids[i].y - asteroids[i].image.height / 2,
            asteroids[i].y + asteroids[i].image.height / 2,
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