/**
 * Created by mrcheese on 29/09/15.
 */

var BULLET_SPEED = 500;

var Bullet = function ()
{
    this.image = document.createElement("img"),
    this.image.src = "images/bullet.png";
    this.x = 0;
    this.y = 0;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.dead = true;
}

Bullet.prototype.update = function (deltaTime)
{
    if (!this.dead) {
        this.x += this.velocity_x * deltaTime * BULLET_SPEED;
        this.y += this.velocity_y * deltaTime * BULLET_SPEED;

        if(this.x < 0 || this.x > MAP.tw * TILE || this.y < 0 || this.y > MAP.th * TILE)
        {
            this.dead = true;
        }

    }
}

Bullet.prototype.fire = function(origin_x, origin_y, dir_x, dir_y){
    this.x = origin_x;
    this.y = origin_y;
    this.velocity_x = dir_x;
    this.velocity_y = dir_y;
    this.dead = false;
}

Bullet.prototype.draw = function (cam_x, cam_y)
{
    if (!this.dead) {
       context.save();
        context.translate(this.x - cam_x,
        this.y - cam_y);
        context.drawImage(this.image, -this.image.width / 2, this.image.height/2);
        context.restore();
    }
}