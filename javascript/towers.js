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

}

Tower.prototype.update = function() {
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
    }
}

//if (mouselistener.mouseDown === true && mouselistener.mouseOverCanvas === true && firstTowerClick === true){
    // move tower to mouse position
//}

Tower.prototype.draw = function() {
    context.save();

    context.drawImage(this.firstTower, this.firstTower.left, this.firstTower.top , this.firstTower.width, this.firstTower.height);
    context.restore();
}