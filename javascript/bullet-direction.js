/*

from: x,y
to: u,v
direction: (u-x, y-v) = (dirX, dirY)
distance: math.sqrt((dirY*dirY) + (dirX * dirX))
normalised distance: dirX/distance, dirY/distance

 */

// parameter must be object with tower XY and enemy UV
function mag (coordinatesObj){
    var x = coordinatesObj.towerX;
    var y = coordinatesObj.towerY;
    var u = coordinatesObj.enemyU;
    var v = coordinatesObj.enemyV;
    var dirX = u-x;
    var dirY = y-v;
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