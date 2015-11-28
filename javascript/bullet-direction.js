/*

from: x,y
to: u,v
direction: (u-x, y-v) = (dirX, dirY)
distance: math.sqrt((dirY*dirY) + (dirX * dirX))
normalised distance: dirX/distance, dirY/distance

 */

// parameter must be object with tower XY and enemy UV
function towerRadiusMag (coordinatesObj){
    var x = coordinatesObj.towerX;// - TILE;// - 40;
    var y = coordinatesObj.towerY;// - TILE;// - 55;
    var u = coordinatesObj.enemyU;
    var v = coordinatesObj.enemyV;
    var dirX = u-x;//u-x;
    var dirY = v-y;
    var distance = Math.sqrt((dirX*dirX)+(dirY*dirY));
    var normalisedDistanceX = dirX/distance;
    var normalisedDistanceY = dirY/distance;
    return {
        dirX: dirX,
        dirY: dirY,
        distance: distance,
        normalX: normalisedDistanceX,
        normalY: normalisedDistanceY
    }
}

function shootDirectionMag (coordinatesObj){
    var x = coordinatesObj.towerX;// - TILE;// - 40;
    var y = coordinatesObj.towerY;// - TILE;// - 55;
    var u = coordinatesObj.enemyU + (TILE * 1.5);
    var v = coordinatesObj.enemyV + (TILE * 1.5);
    var dirX = u-x;//u-x;
    var dirY = v-y;
    var distance = Math.sqrt((dirX*dirX)+(dirY*dirY));
    var normalisedDistanceX = dirX/distance;
    var normalisedDistanceY = dirY/distance;
    return {
        dirX: dirX,
        dirY: dirY,
        distance: distance,
        normalX: normalisedDistanceX,
        normalY: normalisedDistanceY
    }
}