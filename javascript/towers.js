/**
 * Created by mrcheese on 20/10/15.
 */

var Tower = function() {
//create tower positions
}

var firstTowerClick = false;
var firstTower = new Image()
firstTower.src = "images/tower/optimised-temporary-tower.jpg";

//if (mouselistener.mouseDown === true && mouselistener.mouseOverCanvas === true && firstTowerClick === true){
    // move tower to mouse position
//}

function drawTowerInventory() {
    context.save();

    context.drawImage(firstTower, 0, 0);
    context.restore();
}