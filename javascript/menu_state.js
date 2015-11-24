
function runMenu(){
	
	context.fillStyle = "#32CD32";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = "#000";
	context.font="14px Arial";
	context.fillText("Press SPACE BAR to start game", 20, 20);
	
	context.fillStyle = "#000";
	context.font="40px Arial";
	context.fillText("Welcome To Town Defence!!", 230, 200);

	if(keyboard.isKeyDown(keyboard.KEY_SPACE)){
		state = GAME_STATE;
	}
	
}

