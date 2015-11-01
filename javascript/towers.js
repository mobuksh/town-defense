/**
 * Created by mrcheese on 20/10/15.
 */

var Tower = function() {
    //create 3 types of towers
    this.inventoryTowers = [];
    this.inventoryTowers[0] = { towerType: 0, imageIcon : document.createElement("img"), left: 0, top: 0, click: false, width: 70, height: 70 };
    this.inventoryTowers[0].imageIcon.src = "images/tower/green-castle.png";
    this.inventoryTowers[1] = { towerType: 1, imageIcon : document.createElement("img"), left: 105 , top: 0, click: false, width: 70, height: 70 };
    this.inventoryTowers[1].imageIcon.src = "images/tower/red-castle.png";
    this.inventoryTowers[2] = { towerType: 2, imageIcon : document.createElement("img"), left: 200, top: 0, click: false, width: 70, height: 70 };
    this.inventoryTowers[2].imageIcon.src = "images/tower/white-castle.png";

    // make all of the inventory items display at the same horizon
    this.topOfTowers = canvas.height - this.inventoryTowers[0].height;
    this.inventoryTowers[0].top = this.topOfTowers;
    this.inventoryTowers[1].top = this.topOfTowers;
    this.inventoryTowers[2].top = this.topOfTowers;

    // array to handle all towers when they are dragged onto the map
    this.allTowers = [];

    //this.inventoryTowers[0] = { imageIcon : document.createElement("img"), left: 0, top: 0, click: false, width: 70, height: 70 };
    //this.inventoryTowers[0].imageIcon.src = "images/tower/green-castle.png";
    //this.secondTower = { imageIcon : document.createElement("img"), left: 0, top: 0, click: false, width: 70, height: 70 };
    //this.secondTower.imageIcon.src = "images/tower/red-castle.png";
    //this.thirdTower = { imageIcon : document.createElement("img"), left: 0, top: 0, click: false, width: 70, height: 70 };
    //this.thirdTower.imageIcon.src = "images/tower/white-castle.png";





}

Tower.prototype.update = function() {
    var self = this;
    this.towerClicked = "";

        if (mouselistener.mouseDown === true) {
            //console.log("how many towers ", this.inventoryTowers.length)
            // if the user is clicking a tower, set inventoryTowers[i] click to 'true'
            for (var i = 0; i < this.inventoryTowers.length ; i++) {
            //console.log("i: ", i)
                // if mouse is inside width of tower image
                if ((mouselistener.page_x > this.inventoryTowers[i].left) && (mouselistener.page_x < (this.inventoryTowers[i].left + this.inventoryTowers[i].width))) {
                    //console.log("click detected, inside width");
                    // if mouse is within height of tower image
                    if ((mouselistener.page_y > this.inventoryTowers[i].top) && (mouselistener.page_y < (this.inventoryTowers[i].top + this.inventoryTowers[i].height))) {
                        //console.log("click detected, inside height");
                        this.inventoryTowers[i].click = true;
                        this.towerClicked = i;
                        //console.log("click = true");
                    }
                }
            }
        } else {
            // if the user is clicking a tower, set inventoryTowers[i] click to 'true'
            for (var i = 0; i < this.inventoryTowers.length ; i++) {
                this.inventoryTowers[i].click = false;
                this.inventoryTowers[i].top = this.topOfTowers;

            }
            this.inventoryTowers[0].left = 0;
            this.inventoryTowers[1].left = 105;
            this.inventoryTowers[2].left = 200;
        }
    for (var i = 0; i < this.inventoryTowers.length ; i++) {

    if (this.inventoryTowers[i].click === true) {
        this.inventoryTowers[i].left = mouselistener.page_x - (this.inventoryTowers[i].width / 2 );
        this.inventoryTowers[i].top = mouselistener.page_y - (this.inventoryTowers[i].height / 2 );
        this.addNewTowerOnRelease = getTileAtPixel(mouselistener.page_x, mouselistener.page_y);

        //console.log("across: ", this.addNewTowerOnRelease.across, "high: ", this.addNewTowerOnRelease.high);

        ////console.log(cellAtPixelCoord(1, mouselistener.page_x, mouselistener.page_y))
    }
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
    ////console.log("cheese" + this.allTowers[0][1].x);
    self.addANewTower = function () {
        if (mouselistener.mouseOverCanvas === true ) {
         drawNewTower(this.towerClicked, self.addNewTowerOnRelease.across, self.addNewTowerOnRelease.high);
            //console.log("adding new tower", self.addNewTowerOnRelease.across, self.addNewTowerOnRelease.high);
        }
    }

    function drawNewTower(towertype, x, y){
        //draw a new tower
        self.allTowers.push({towerType: towertype, x: (x * 35), y: ((y) * 35)});
        //console.log("tower added", x, y)
    }
}

//if (mouselistener.mouseDown === true && mouselistener.mouseOverCanvas === true && inventoryTowers[0]Click === true){
    // move tower to mouse position
//}

Tower.prototype.draw = function() {
    context.save();

    // draw all towers that have been dragged out onto the map
    for (var i = 0; i < this.allTowers.length; i++) {
        //console.log("tower click: ", this.towerClicked)
        if (this.allTowers[i].towerType === 0) {
            context.drawImage(this.inventoryTowers[0].imageIcon, this.allTowers[i].x, this.allTowers[i].y, 35, 35);
        } else if (this.allTowers[i].towerType === 1) {
            context.drawImage(this.inventoryTowers[1].imageIcon, this.allTowers[i].x, this.allTowers[i].y, 35, 35);
        }  else if (this.allTowers[i].towerType === 2) {
            context.drawImage(this.inventoryTowers[2].imageIcon, this.allTowers[i].x, this.allTowers[i].y, 35, 35);
        }
        //console.log("drawn");
    }

    // when user clicks on an inventory tower, draw it as it is dragged over the map for placement
    for (var i = 0; i < this.inventoryTowers.length; i++) {
        if (this.inventoryTowers[i].click === true) {
            context.drawImage(this.inventoryTowers[i].imageIcon, this.inventoryTowers[i].left + (TILE * 1.75), this.inventoryTowers[i].top, this.inventoryTowers[i].width, this.inventoryTowers[i].height);
            //console.log("drawn extra towers");

            context.beginPath();
            context.rect(this.addNewTowerOnRelease.across * 35, this.addNewTowerOnRelease.high * 35, TILE, TILE);
            context.fillStyle = "green";
            context.globalAlpha = 0.5;
            //context.strokeStyle = "white";
            //context.lineWidth = 50;

            context.fill();
            context.stroke();


        } else {
            // else if the user is not dragging items onto the map, draw the inventory tower in its original position
            context.globalAlpha = 1;
            context.drawImage(this.inventoryTowers[i].imageIcon, this.inventoryTowers[i].left, this.inventoryTowers[i].top, this.inventoryTowers[i].width, this.inventoryTowers[i].height);
            //context.drawImage(this.inventoryTowers[1].imageIcon, this.inventoryTowers[1].left + this.inventoryTowers[1].width, this.inventoryTowers[1].top, this.inventoryTowers[1].width, this.inventoryTowers[1].height);
            //context.drawImage(this.inventoryTowers[2].imageIcon, this.inventoryTowers[2].left + this.inventoryTowers[2].width + this.inventoryTowers[2].width, this.inventoryTowers[2].top, this.inventoryTowers[2].width, this.inventoryTowers[2].height);

            ////console.log("drawn");

        }
    }

        context.restore();
}