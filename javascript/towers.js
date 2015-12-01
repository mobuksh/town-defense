var Tower = function () {

    // create an empty tower array
    this.inventoryTowers = [];

    // fill tower array - create 3 types of towers and fill each tower with relevant values
    this.inventoryTowers[0] = {
        towerType: 0,
        imageIcon: document.createElement("img"),
        left: 0,
        top: 0,
        click: false,
        width: 70,
        height: 70,
        maxBullets:  1,
        bulletCounter: 0,
        jitter: false
    };
    this.inventoryTowers[0].imageIcon.src = "images/tower/white-castle.png";
    this.inventoryTowers[1] = {
        towerType: 1,
        imageIcon: document.createElement("img"),
        left: 105,
        top: 0,
        click: false,
        width: 70,
        height: 70,
        maxBullets:  10,
        bulletCounter: 0,
        jitter: false
    };
    this.inventoryTowers[1].imageIcon.src = "images/tower/green-castle.png";
    this.inventoryTowers[2] = {
        towerType: 2,
        imageIcon: document.createElement("img"),
        left: 200,
        top: 0,
        click: false,
        width: 70,
        height: 70,
        maxBullets:  25,
        bulletCounter: 0,
        jitter: true
    };
    this.inventoryTowers[2].imageIcon.src = "images/tower/red-castle.png";

    // make all of the inventory items display at the same horizontal position
    this.topOfTowers = canvas.height - this.inventoryTowers[0].height;
    this.inventoryTowers[0].top = this.topOfTowers;
    this.inventoryTowers[1].top = this.topOfTowers;
    this.inventoryTowers[2].top = this.topOfTowers;

    // array to store all towers that are dragged onto the map
    this.allTowers = [];
    this.cur_bullet_index = 0;
    this.maxTowerBullets = 10;
    this.aTowerisClicked = false;


}
