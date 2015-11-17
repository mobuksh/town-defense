function runEnd(){
	
	context.fillStyle = "ff0000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = "#000";
	context.font="14px Arial";
	context.fillText("GAME OVER!", 20, 20);
	
	context.fillStyle = "#000";
	context.font="14px Arial";
	context.fillText("YOU LOSE!", 20, 40);
	
	context.fillStyle = "#000";
	context.font="14px Arial";
	context.fillText("Press SPACE BAR to go to MainMenu", 20, 60);
	
	if (keyboard.isKeyDown(keyboard.KEY_SPACE)){
		state = MAINMENU_STATE;
	}
}