var Enemy = function(level) {
	this.type = level;
	this.health = 100 * level;
	
	this.speed = 1;
	this.x = 1;
	this.y = -5;
	
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
	
	
}

function tileToPixel(tile)
{
	return tile * TILE;
}

function pixelToTile(pixel)
{
	return Math.floor(pixel/TILE);
}

Enemy.prototype.update = function() {
	
	if (this.x != this.waypoints_x[this.waypointIndex]) {
		switch(this.waypointIndex) {
			case 0:
			
			// Nothing, because it is not advancing an x position.
			break;
			case 4:
			case 2:
			this.x += 1;
			break;

		}
	}
	
	if (this.y != this.waypoints_y[this.waypointIndex]) {
		switch (this.waypointIndex) {
		
	
		case 2:
		// Nothing, because it is not advancing an y position.
		break;
		
		case 3:
		this.y-=1;
		break;
		
		case 1:
		case 5:
		this.y+=1;
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