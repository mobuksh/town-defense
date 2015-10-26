/**
 * Created by mrcheese on 20/10/15.
 */

var Tower = function() {
    //create 3 types of towers
    this.firstTower = { imageIcon : document.createElement("img"), left: 0, top: 0, click: false, width: 70, height: 70 };
    this.firstTower.imageIcon.src = "images/tower/green-castle.png";
    this.secondTower = { imageIcon : document.createElement("img"), left: 0, top: 0, click: false, width: 70, height: 70 };
    this.secondTower.imageIcon.src = "images/tower/red-castle.png";
    this.thirdTower = { imageIcon : document.createElement("img"), left: 0, top: 0, click: false, width: 70, height: 70 };
    this.thirdTower.imageIcon.src = "images/tower/white-castle.png";
    this.firstTower.top,this.secondTower.top,this.thirdTower.top  = canvas.height - this.firstTower.height;
    this.allTowers = [];


}

Tower.prototype.update = function() {
    var self = this;

    // if the user is clicking on the first tower, set firstTower click to 'true'
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
         drawNewTower(1, self.addNewTowerOnRelease.across, self.addNewTowerOnRelease.high);
            console.log("adding new tower", self.addNewTowerOnRelease.across, self.addNewTowerOnRelease.high);
        }
    }

    function drawNewTower(towertype, x, y){
        //draw a new tower
        self.allTowers.push({towerType: towertype, x: (x * 35), y: ((y) * 35)});
        console.log("tower added", x, y)
    }
}

//if (mouselistener.mouseDown === true && mouselistener.mouseOverCanvas === true && firstTowerClick === true){
    // move tower to mouse position
//}

Tower.prototype.draw = function() {
    context.save();

    // draw all towers that have been dragged out onto the map
    for (var i = 0; i < this.allTowers.length; i++) {
        context.drawImage(this.firstTower.imageIcon, this.allTowers[i].x, this.allTowers[i].y, 35, 35);
        console.log("drawn");
    }

    // when user clicks on an inventory tower, draw it as it is dragged over the map for placement
    if (this.firstTower.click === true) {
        context.drawImage(this.firstTower.imageIcon, this.firstTower.left+TILE*1.5, this.firstTower.top , this.firstTower.width, this.firstTower.height);
        console.log("drawn extra towers");

        context.beginPath();
        context.rect(this.addNewTowerOnRelease.across * 35, this.addNewTowerOnRelease.high * 35, TILE,TILE);
        context.fillStyle="green";
        context.globalAlpha = 0.5;
        //context.strokeStyle = "white";
        //context.lineWidth = 50;

        context.fill();
        context.stroke();



    } else {
        // else if the user is not dragging items onto the map, draw the inventory tower in its original position
        context.drawImage(this.firstTower.imageIcon, this.firstTower.left, this.firstTower.top , this.firstTower.width, this.firstTower.height);
        context.drawImage(this.secondTower.imageIcon, this.firstTower.left + this.firstTower.width, this.firstTower.top , this.secondTower.width, this.secondTower.height);
        context.drawImage(this.thirdTower.imageIcon, this.firstTower.left + this.firstTower.width + this.secondTower.width, this.firstTower.top , this.thirdTower.width, this.thirdTower.height);

        //console.log("drawn");

    }

        context.restore();
}