/**
 * Created by mrcheese on 20/10/15.
 */

var Tower = function() {
//create tower positions
    this.firstTower = new Image();
    this.firstTower.src = "images/tower/optimised-temporary-tower.jpg";
    this.firstTower.click = false;
    this.firstTower.height = 70;
    this.firstTower.width = 35;
    this.firstTower.left = 0;
    this.firstTower.top = canvas.height - this.firstTower.height;
    this.drawTower = false;
    this.allTowers = [];
    this.testShooterTower = [];


}

Tower.prototype.update = function() {
    var self = this;
    this.towerCounter = 0;
    if (mouselistener.mouseDown === true) {
        if ((mouselistener.page_x > this.firstTower.left) && (mouselistener.page_x < (this.firstTower.left + this.firstTower.width)) ) {
            if ((mouselistener.page_y > this.firstTower.top) && (mouselistener.page_y < (this.firstTower.top + this.firstTower.height)) ) {
                this.firstTower.click = true;
            }
        }
    } else {
        this.firstTower.click = false;
        this.firstTower.left = 0;
        this.firstTower.top = canvas.height - this.firstTower.height;
    }

    if (this.firstTower.click === true) {
        this.firstTower.left = mouselistener.page_x - (this.firstTower.width / 2 );
        this.firstTower.top = mouselistener.page_y - (this.firstTower.height / 2 );
        this.addNewTowerOnRelease = getTileAtPixel(mouselistener.page_x, mouselistener.page_y);

        console.log(this.addNewTowerOnRelease.across, this.addNewTowerOnRelease.high);

        //console.log(cellAtPixelCoord(1, mouselistener.page_x, mouselistener.page_y))

    }
    function getTileAtPixel (x,y) {
        //this.tilesAcross = canvas.width / TILE;
        //this.tilesHigh = canvas.height / TILE;
        return {
            across : Math.floor(x / TILE),
            high: Math.floor(y / TILE)
        }
    }

    //this.allTowers[0][1] = {
    //    x: 10,
    //    y: 11
    //};
    //console.log("cheese" + this.allTowers[0][1].x);
    self.addANewTower = function () {
        if (mouselistener.mouseOverCanvas === true ) {
         drawNewTower(self.addNewTowerOnRelease.across, self.addNewTowerOnRelease.high);
            console.log("adding new tower", self.addNewTowerOnRelease.across, self.addNewTowerOnRelease.high);
        }
    }

    function drawNewTower(x,y){
        //draw a new tower
        self.allTowers.push({x: (x * 35), y: ((y - 1) * 35)});
        console.log("tower added", x, y)
    }
}

//if (mouselistener.mouseDown === true && mouselistener.mouseOverCanvas === true && firstTowerClick === true){
    // move tower to mouse position
//}

Tower.prototype.draw = function() {
    context.save();
    context.drawImage(this.firstTower, this.firstTower.left, this.firstTower.top , this.firstTower.width, this.firstTower.height);
    for (var i = 0; i < this.allTowers.length; i++) {
        context.drawImage(this.firstTower, this.allTowers[i].x, this.allTowers[i].y, this.firstTower.width, this.firstTower.height);
    }
    if (this.firstTower.click === true) {

        context.beginPath();
        context.rect(this.addNewTowerOnRelease.across * 35, this.addNewTowerOnRelease.high * 35, TILE,TILE);
        context.fillStyle="green";
        context.globalAlpha = 0.25;
        context.strokeStyle = "white";
        context.lineWidth = 50;

        context.fill();
        context.stroke();



    }

        context.restore();
}