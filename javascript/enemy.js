var Enemy = function(level, index) {
	this.type = level;
	this.health = 100 * level;
	
	this.speed = 100;
	
	this.tile_x = 1;
	this.tile_y = -5;
	this.index = index;
	this.dead = false;

	this.x = 35;
	this.y = -35;
	this.velocity_x = 2 * 0.1;
	this.velocity_y = 2 * 0.1;
	
	this.image = document.createElement("img");
	
	this.image.src = "images/ghost-01.png";

	this.waypoints_x = [];
	this.waypoints_y = [];


	this.waypointIndex = 0;
}

Enemy.prototype.init_waypoints = function()
{	
	// Tile Coordinates
	//this.waypoints_x = [1, 2, 8, 8, 20, 20];
	//this.waypoints_y = [-5, 13, 12, 3, 3, 17];
		
	// Tile Coordinates in Pixels
	this.dead = false;
	this.waypoints_x = [35, 35, 280, 280, 700, 700];
	this.waypoints_y = [-35, 420, 420, 105, 105, 595];
}

function tileToPixel(tile)
{
	return tile * TILE;
}

function pixelToTile(pixel)
{
	return Math.floor(pixel/TILE);
}

Enemy.prototype.die = function() {
	this.dead = true;

}

Enemy.prototype.update = function(deltatime) {
	if (this.dead) {
		return;
	}
	if (Math.floor(this.x) == 700 && Math.floor(this.y) == 595) {
			subtractLife();
			this.dead = true;



			this.tile_x = 1;
			this.tile_y = -5;

			this.x = 35;
			this.y = -35;
			return;
	}

	if (this.x != this.waypoints_x[this.waypointIndex]) {
		switch(this.waypointIndex) {
			case 0:
			
			// Nothing, because it is not advancing an x position.
			break;
			case 4:
			case 2:
			this.x += this.velocity_x * deltatime * this.speed;

			break;

		}
	}
	
	if (this.y != this.waypoints_y[this.waypointIndex]) {
		switch (this.waypointIndex) {
		
	
		case 2:
		// Nothing, because it is not advancing an y position.
		break;
		
		case 3:
		this.y-= this.velocity_y * deltatime * this.speed;
		break;
		
		case 1:
		case 5:
		this.y+= this.velocity_y * deltatime * this.speed;
		break;
		
		
		}
	}
	
	this.tile_y = pixelToTile(this.y);
	this.tile_x = pixelToTile(this.x);
	
	
	if (Math.floor(this.x) == this.waypoints_x[this.waypointIndex] && Math.floor(this.y) == this.waypoints_y[this.waypointIndex]) {	
		this.waypointIndex++;
	}
	
	//context.fillStyle = "#f00";
	//	context.font="14px Arial";
		
		//context.fillText("ENEMY POSITION: " + Math.floor(this.x) + " / " + Math.floor(this.y), 5, 20);
	
}

Enemy.prototype.draw = function() {
	if (this.dead) {
		return;
	}
	context.save();
	context.translate(this.x, this.y);
	/*
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("x:" + Math.floor(this.x) + ", y:" + Math.floor(this.y), this.x, this.y);
	*/
	context.drawImage(this.image, this.image.width, this.image.height);
			
	context.restore();
}