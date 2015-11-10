var Enemy = function(level) {
	this.type = level;
	this.health = 100 * level;
	
	this.speed = 15;
	this.x = 1;
	this.y = -5;
	this.velocity_x = 0;
	this.velocity_y = 0;
	
	this.image = document.createElement("img");
	
	this.image.src = "images/enemy/final/GhostTemp.png";

	this.waypoints_x = [];
	this.waypoints_y = [];
	
	this.init_waypoints();

	this.waypointIndex = 0;
}

Enemy.prototype.init_waypoints = function()
{
	this.waypoints_x = [1, 1, 8, 8, 20, 20];
	this.waypoints_y = [-5, 12, 12, 3, 3, 17];
	this.velocity_x = 2 * 0.1;
	this.velocity_y = 2 * 0.1;
	
}

function tileToPixel(tile)
{
	return tile * TILE;
}

function pixelToTile(pixel)
{
	return Math.floor(pixel/TILE);
}

Enemy.prototype.update = function(deltatime) {
	
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
	
	
	if (this.x == this.waypoints_x[this.waypointIndex] && this.y == this.waypoints_y[this.waypointIndex]) {	
		this.waypointIndex++;
	}
}

Enemy.prototype.draw = function() {
	context.save();
	context.translate(tileToPixel(this.x), tileToPixel(this.y));
	context.drawImage(this.image, this.image.width, this.image.height); 
			
	context.restore();
}