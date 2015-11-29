Tower.prototype.draw = function () {
    context.save();

    // draw all towers that have been dragged out onto the map
    for (var i = 0; i < this.allTowers.length; i++) {
        //console.log("tower click: ", this.towerClicked)
        if (this.allTowers[i].towerType === 0) {
            context.drawImage(this.inventoryTowers[0].imageIcon, this.allTowers[i].x, this.allTowers[i].y, 35, 35);
        } else if (this.allTowers[i].towerType === 1) {
            context.drawImage(this.inventoryTowers[1].imageIcon, this.allTowers[i].x, this.allTowers[i].y, 35, 35);
        } else if (this.allTowers[i].towerType === 2) {
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

            context.fill();
            context.stroke();


        } else {
            // else if the user is not dragging items onto the map, draw the inventory tower in its original position
            context.globalAlpha = 1;
            context.drawImage(this.inventoryTowers[i].imageIcon, this.inventoryTowers[i].left, this.inventoryTowers[i].top, this.inventoryTowers[i].width, this.inventoryTowers[i].height);

            //console.log("drawn");

        }
    }

    context.restore();
}