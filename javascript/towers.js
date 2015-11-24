/**
 * Created by mrcheese on 20/10/15.
 */

var Tower = function () {
    //create 3 types of towers
    this.inventoryTowers = [];
    this.inventoryTowers[0] = {
        towerType: 0,
        imageIcon: document.createElement("img"),
        left: 0,
        top: 0,
        click: false,
        width: 70,
        height: 70
    };
    this.inventoryTowers[0].imageIcon.src = "images/tower/green-castle.png";
    this.inventoryTowers[1] = {
        towerType: 1,
        imageIcon: document.createElement("img"),
        left: 105,
        top: 0,
        click: false,
        width: 70,
        height: 70
    };
    this.inventoryTowers[1].imageIcon.src = "images/tower/red-castle.png";
    this.inventoryTowers[2] = {
        towerType: 2,
        imageIcon: document.createElement("img"),
        left: 200,
        top: 0,
        click: false,
        width: 70,
        height: 70
    };
    this.inventoryTowers[2].imageIcon.src = "images/tower/white-castle.png";

    // make all of the inventory items display at the same horizontal position
    this.topOfTowers = canvas.height - this.inventoryTowers[0].height;
    this.inventoryTowers[0].top = this.topOfTowers;
    this.inventoryTowers[1].top = this.topOfTowers;
    this.inventoryTowers[2].top = this.topOfTowers;

    // array to store all towers that are dragged onto the map
    this.allTowers = [];
    this.towerBullets = [];
    this.cur_bullet_index = 0;
    this.maxTowerBullets = 50;

}

Tower.prototype.update = function () {
    var self = this;
    this.aTowerisClicked = false;
    this.towerClicked = "";

    if (mouselistener.mouseDown === true && this.aTowerisClicked === false) {
        //console.log("how many towers ", this.inventoryTowers.length)
        // if the user is clicking a tower, set inventoryTowers[i] click to 'true'
        for (var i = 0; i < this.inventoryTowers.length; i++) {
            //console.log("i: ", i)
            // if mouse is inside width of tower image
            if ((mouselistener.page_x > this.inventoryTowers[i].left) && this.aTowerisClicked === false && (mouselistener.page_x < (this.inventoryTowers[i].left + this.inventoryTowers[i].width))) {
                //console.log("click detected, inside width");
                // if mouse is within height of tower image
                if ((mouselistener.page_y > this.inventoryTowers[i].top) && this.aTowerisClicked === false && (mouselistener.page_y < (this.inventoryTowers[i].top + this.inventoryTowers[i].height))) {
                    //console.log("click detected, inside height");
                    this.aTowerisClicked = true;
                    this.inventoryTowers[i].click = true;
                    this.towerClicked = i;

                    //console.log("click = true");
                }
            }
        }
    } else {

        // if the user is clicking a tower, set inventoryTowers[i] click to 'true'
        for (var i = 0; i < this.inventoryTowers.length; i++) {
            this.inventoryTowers[i].click = false;
            this.inventoryTowers[i].top = this.topOfTowers;

        }

        this.inventoryTowers[0].left = 0;
        this.inventoryTowers[1].left = 105;
        this.inventoryTowers[2].left = 200;
    }
    for (var i = 0; i < this.inventoryTowers.length; i++) {

        if (this.inventoryTowers[i].click === true) {
            this.inventoryTowers[i].left = mouselistener.page_x - (this.inventoryTowers[i].width / 2 );
            this.inventoryTowers[i].top = mouselistener.page_y - (this.inventoryTowers[i].height / 2 );
            this.addNewTowerOnRelease = getTileAtPixel(mouselistener.page_x, mouselistener.page_y);


        }
    }

    function getTileAtPixel(x, y) {

        return {
            across: Math.floor(x / TILE),
            high: Math.floor(y / TILE)
        }
    }

    // check if conditions are right to create a new tower, if yes, send off to 'createNewTower' function for array push
    self.addANewTower = function () {
        if (mouselistener.mouseOverCanvas === true) {
            if (money > 0) {
				var check_tower = this.towerClicked;
				var can_afford = true;

			    if (check_tower == 0)
				{
                    if (money - 1 < 0)
						can_afford = false;
                }
				else if (check_tower == 1)
				{
					if (money - 2 < 0)
						can_afford = false;
                }
                else if (check_tower == 2)
				{
                    if (money - 3 < 0)
						can_afford = false;
				}

				if (can_afford) {
                    if (check_tower == 0) {
                        if (money -= 1)
                            can_afford = true;
                    }
                    else if (check_tower == 1) {
                        if (money -= 2)
                            can_afford = true;
                    }
                    else if (check_tower == 2) {
                        if (money -= 3)
                            can_afford = true;
                    }
                }

					//create towers
                createNewTower(this.towerClicked, self.addNewTowerOnRelease.across, self.addNewTowerOnRelease.high);

                // find the last tower that was added just now (at the end of the array)
               /* var new_tower = self.allTowers[self.allTowers.length - 1];

                // decrease money based on the 'tower-type' of the last tower added
                if (new_tower.towerType == 0) {
                    money -= 1;
                } else if (new_tower.towerType == 1) {
                    money -= 2;
                }
                else if (new_tower.towerType == 2) {
                    money -= 3;
                }*/
            }
        }
    }

    // add a new tower to the array of towers
    function createNewTower(towertype, x, y) {

        var new_bullet_pool = [];
        for (var i = 0; i < 50; i++) {
            new_bullet_pool[i] = new Bullet();
        }



        //push a new tower into the allTowers array
        self.allTowers.push({
                towerType: towertype,
                x: (x * 35),
                y: ((y) * 35),
                // give each new tower 50 bullets
                objMaxTowerBullets: this.maxTowerBullets,
                thisTowerBullets: new_bullet_pool
            }
        );

    }
    //this.jitter = Math.random() * 0.2 - 0.1;
    //this.allTowers[this.cur_bullet_index].fire(this.x, this.y, 1, this.jitter);
    ////this.shoot_cooldown = this.shoot_timer;
    //
    //this.cur_bullet_index++;
    //
    //
    //if(this.cur_bullet_index >= this.maxTowerBullets) {
    //    this.cur_bullet_index = 0;
    //}
}


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