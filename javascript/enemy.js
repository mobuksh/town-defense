
var Enemy = function(x, y) {
	this.sprite = new Sprite("images/enemies.png");
	
	//enemy bite
	this.sprite.buildAnimation(2, 1, 51, 58, 0.05,
							[0,1]);

	this.sprite.setAnimationOffset(0, -35, 40);

	this.position = new Vector2();
	this.position.set(x,y);
	this.velocity = new Vector2();
	this.moveRight = true;
	this.pause = 0;

	////////////////////////////////////
	var self = this;
	this.die_sfx_isPlaying = false;
	this.die_sfx = new Howl(
	{
		urls : ["audio/fireEffect.ogg"],
		buffer : true,
		volume : 1,
		onend: function() {
			self.die_sfx_isPlaying = false;
		}
	});
	////////////////////////////////////////
};

Enemy.prototype.update = function(deltaTime)
{	
	this.sprite.update(deltaTime);

	if(this.pause > 0)
	{
		this.pause -= deltaTime;
	}
	else
	{
		var ddx= 0; // acceleration speed

		var tx = pixelToTile(this.position.x);
		var ty = pixelToTile(this.position.y);
		var nx = (this.position.x)%TILE; // True if the enemy overlaps right (? wat)
		var ny = (this.position.y)%TILE; // True if the enemy overlaps below (? wat)

		var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
		var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
		var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty+1);
		var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty+1);

		if(this.moveRight)
		{
			if(celldiag && !cellright)
			{
				ddx = ddx + ENEMY_ACCEL; // enemy wants to go right: ENEMY_ACCEL declared in main.js
			}
			else
			{
				this.velocity.x = 0;
				this.moveRight = false
				this.pause = 0.5;
			}
		}

		if(!this.moveRight)
		{
			if(celldown && !cell)
			{
				ddx = ddx - ENEMY_ACCEL; // enemy wants to go left: ENEMY_ACCEL declared in main.js
			}
			else
			{
				this.velocity.x = 0;
				this.moveRight = true;
				this.pause = 0.5;
			}
		}

		this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
		this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -ENEMY_MAXDX, ENEMY_MAXDX);
	}
}

Enemy.prototype.draw = function(cam_x, cam_y)
{
	this.sprite.draw(context, this.x - cam_x, this.y - cam_y);
}