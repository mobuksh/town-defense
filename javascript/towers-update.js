Tower.prototype.update = function () {
    var self = this;
    //this.aTowerisClicked = false;
    //this.towerClicked = "";

    if (mouselistener.mouseDown === true && this.aTowerisClicked === false) {
        //console.log("how many towers ", this.inventoryTowers.length)
        //console.log("");
        //console.log("mousedown, atowerisclicked = false");
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
    } else if (mouselistener.mouseDown === true && this.aTowerisClicked === true) {
        // Do nothing
    } else {
        this.aTowerisClicked = false;
        this.towerClicked = "";


        // if the user is clicking a tower, set inventoryTowers[i] click to 'true'
        for (var i = 0; i < this.inventoryTowers.length; i++) {
            this.inventoryTowers[i].click = false;
            this.inventoryTowers[i].top = this.topOfTowers;

        }

        this.inventoryTowers[0].left = 0;
        this.inventoryTowers[1].left = 105;
        this.inventoryTowers[2].left = 200;
    }

    // if the there is a tower clicked, move it so it will draw next to the mouse/cell position
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

                if (check_tower == 0) {
                    if (money - 1 < 0)
                        can_afford = false;
                }
                else if (check_tower == 1) {
                    if (money - 2 < 0)
                        can_afford = false;
                }
                else if (check_tower == 2) {
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
                console.log(this.towerClicked)
                //create towers
                createNewTower(this.inventoryTowers[this.towerClicked].towerType, self.addNewTowerOnRelease.across, self.addNewTowerOnRelease.high);

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
    function createNewTower(towerType, x, y) {

        var new_bullet_pool = [];
        for (var i = 0; i < self.inventoryTowers[towerType].maxBullets; i++) {
            new_bullet_pool[i] = new Bullet();
        }

        //console.log("ADDING TOWER: ", "type ", towerType, ", x/y ", (x * 35), "/", (y * 35), ", max bullets ", self.inventoryTowers[towerType].maxBullets, ", towerBulletPool ", new_bullet_pool.length  )
        //push a new tower into the allTowers array
        self.allTowers.push({
                towerType: towerType,
                x: (x * 35),
                y: (y * 35),
                // give each new tower x bullets
                objMaxTowerBullets: self.inventoryTowers[towerType].maxBullets,
                objBulletCount: 0,
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