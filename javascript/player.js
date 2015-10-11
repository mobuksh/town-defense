var LEFT = 0;
var RIGHT = 1;

var ANIM_IDLE_LEFT = 0;
var ANIM_JUMP_LEFT = 1;
var ANIM_WALK_LEFT = 2;
var ANIM_IDLE_RIGHT = 3;
var ANIM_JUMP_RIGHT = 4;
var ANIM_WALK_RIGHT = 5;
var ANIM_SHOOT_LEFT = 6;
var ANIM_SHOOT_RIGHT = 7;
var ANIM_MAX = 8;

var Player = function() {	
	// delete me
	//this.image = document.createElement("img");
	//this.image.src = "hero.png";   

	this.sprite = new Sprite("images/ChuckNorris.png");
	
	//idle left
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 
							[0,1,2,3,4,5,6,7]);
	//jump left
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 
							[8,9,10,11,12]);
	//walk left
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 
							[13,14,15,16,17,18,19,20,21,22,23,24,25]);
							
	//idle right
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 
							[52,53,54,55,56,57,58,59]);
	//jump right
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
							[60,61,62,63,64]);
	//walk right
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 	
							[66,67,68,69,70,71,72,73,74,75,76,77,78]);

	//shoot left
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, 		
							[27,28,29,30,31,32,33,34,35,36, 37, 38]);
	//shoot right
	this.sprite.buildAnimation(12,8, 165, 126, 0.05,
							[79,80,81,82,83,84,85,86,87,88,89,90,91,92]);
							
	//offset
	for (var i =0; i < ANIM_MAX; i++)
	{
		this.sprite.setAnimationOffset(i, -55, -87);
	}
	
	this.direction = LEFT;
	this.shooting = false;
	
	this.x = 9 * TILE;
	this.y = 0 * TILE; 	
	
	this.start_x = this.x;
	this.start_y = this.y;
	
	this.width = 159;
	this.height = 163;	

	this.offset_x = -55;
	this.offset_y = -87;
	
	this.velocity_x = 0;
	this.velocity_y = 0;
	
	this.falling = true;
	this.jumping = false;

    this.die = new Howl(
        {
            urls : ["audio/die-sound.mp3"],
            buffer : true,
            volume : 1//,
            //onend: function()
            //{
            //	self.jump_sfx_isPlaying = false;
            //}
        });
	
	this.lives = 3;
	this.lives_image = document.createElement("img");
	this.lives_image.src = "images/hero.png";
	
	////////////////////////////////////
	var self = this;
	this.jump_sfx_isPlaying = false;
	this.jump_sfx = new Howl(
	{
		urls : ["audio/fireEffect.ogg"],
		buffer : true,
		volume : 1,
		onend: function() {
			self.jump_sfx_isPlaying = false;
		}
	});
	////////////////////////////////////////
};

Player.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);

	var left = false;
	var right = false;
	var jump = false;

	if (keyboard.isKeyDown(keyboard.KEY_LEFT))
	{
		left = true;
		this.direction = LEFT;
		if (this.sprite.currentAnimation != ANIM_WALK_LEFT
			&& this.sprite.currentAnimation != ANIM_SHOOT_LEFT
			&& !this.jumping)
			this.sprite.setAnimation(ANIM_WALK_LEFT);
	}
	else if (keyboard.isKeyDown(keyboard.KEY_RIGHT))
	{
		right = true;
		this.direction = RIGHT;
		if (this.sprite.currentAnimation != ANIM_WALK_RIGHT
			&& this.sprite.currentAnimation != ANIM_SHOOT_RIGHT
			&& !this.jumping)
			this.sprite.setAnimation(ANIM_WALK_RIGHT);
	}
	else
	{
		if (!this.jumping && !this.falling && !this.shooting)
		{
			if (this.direction == LEFT)
			{
				if (this.sprite.currentAnimation != ANIM_IDLE_LEFT)
					this.sprite.setAnimation(ANIM_IDLE_LEFT);
			}
			else
			{
				if (this.sprite.currentAnimation != ANIM_IDLE_RIGHT)
					this.sprite.setAnimation(ANIM_IDLE_RIGHT);
			}
		}
	}

	if (keyboard.isKeyDown(keyboard.KEY_SPACE))
	{
		if (restart == 0) {
			jump = true;
			if (left)
				this.sprite.setAnimation(ANIM_JUMP_LEFT);

			if (right)
				this.sprite.setAnimation(ANIM_JUMP_RIGHT);
		}

	}

	if (keyboard.isKeyDown(keyboard.KEY_SHIFT) && !this.jumping && bulletCount > 0)
	{
			this.shooting = true;
			if (this.direction == LEFT)
			{
				if (this.sprite.currentAnimation != ANIM_SHOOT_LEFT)
					this.sprite.setAnimation(ANIM_SHOOT_LEFT);
			}
			else
			{
				if (this.sprite.currentAnimation != ANIM_SHOOT_RIGHT)
					this.sprite.setAnimation(ANIM_SHOOT_RIGHT);
			}
				bulletCount--;
	}
	else if (this.shooting)
	{
		this.shooting = false;
	}
	
	
	var wasleft = (this.velocity_x < 0);
	var wasright = (this.velocity_x > 0);
	var falling = this.falling;
	
	var ddx = 0;
	var ddy = GRAVITY;
	
	if (left)
		ddx = ddx - ACCEL;
	else if (wasleft)
		ddx = ddx + FRICTION;
	
	if (right)
		ddx = ddx + ACCEL;
	else if (wasright)
		ddx = ddx - FRICTION;
	
	if (jump && !this.jumping && !falling)
	{
		ddy = ddy - JUMP;
		this.jumping = true;
		if (this.direction == LEFT)
			this.sprite.setAnimation(ANIM_JUMP_LEFT);
		else
			this.sprite.setAnimation(ANIM_JUMP_RIGHT);
		
		if (!this.jump_sfx_isPlaying)
		{
			if(restart == 0) {
				this.jump_sfx.play();
				this.jump_sfx_isPlaying = true;
			}
		}
		
	}
	
	this.x = Math.floor( this.x + (deltaTime * this.velocity_x));
	this.y = Math.floor( this.y + (deltaTime * this.velocity_y));
	
	this.velocity_x = bound(this.velocity_x + (deltaTime * ddx), -MAXDX, MAXDX);
	this.velocity_y = bound(this.velocity_y + (deltaTime * ddy), -MAXDY, MAXDY);
	
	if ((wasleft && (this.velocity_x > 0)) ||
		(wasright && (this.velocity_x < 0)))
	{
		this.velocity_x = 0;
	}
	
	var tx = pixelToTile(this.x);
	var ty = pixelToTile(this.y);
	var nx = (this.x) % TILE;
	var ny = (this.y) % TILE;
	
	var cell = 		cellAtTileCoord(LAYER_PLATFORMS, tx,	 ty);
	var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
	var celldown =  cellAtTileCoord(LAYER_PLATFORMS, tx,	 ty + 1);
	var celldiag =  cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);

	//downward
	if (this.velocity_y > 0)
	{
		if ((celldown && !cell) || (celldiag && !cellright && nx))
		{
			this.y = tileToPixel(ty);
			this.velocity_y = 0;
			this.falling = false;
			this.jumping = false;
			ny = 0;
		}
	}
	//upwards
	else if (this.velocity_y < 0)
	{
		if ((cell && !celldown) || (cellright && !celldiag && nx))
		{
			this.y = tileToPixel(ty + 1);
			this.velocity_y = 0;
			cell = celldown;
			cellright = celldiag;
			ny = 0;
		}
	}
	
	//right
	if (this.velocity_x > 0)
	{
		if ((cellright && !cell) || (celldiag && !celldown && ny))
		{
			this.x = tileToPixel(tx);
			this.velocity_x = 0;
		}
	}
	//left
	else if (this.velocity_x < 0)
	{
		if ((cell && !cellright) || (celldown && !celldiag && ny))
		{
			this.x = tileToPixel(tx + 1);
			this.velocity_x = 0;
		}
	}
	
	if (this.y > canvas.height	+ 300)
	{
        this.die.play();
		this.lives --;

 		this.x = this.start_x;
		this.y = this.start_y;
	}
}

Player.prototype.draw = function(cam_x, cam_y)
{
	this.sprite.draw(context, this.x - cam_x, this.y - cam_y);
		
	for (var i = 0; i < this.lives; i++)
	{
		context.save();
			context.translate(50*(i)+50, 40);
			context.drawImage(this.lives_image,
				-this.lives_image.width/4, -this.lives_image.height/4,
				this.lives_image.width/4, this.lives_image.height/4);
		context.restore();
	}
}








