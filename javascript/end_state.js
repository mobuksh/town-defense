function runEnd(){
		//console.log(lives);
	context.fillStyle = "#ff0000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = "#000";
	context.font="14px Arial";
	context.fillText("GAME OVER!", 20, 20);
	
	context.fillStyle = "#000";
	context.font="14px Arial";
	context.fillText("YOU LOSE!", 20, 40);
	
	context.fillStyle = "#000";
	context.font="14px Arial";
	context.fillText("Press ENTER to go to MainMenu", 20, 60);
	console.log("about to esc");

	if(keyboard.isKeyDown(keyboard.KEY_ENTER)){
		//state = MAINMENU_STATE;
		document.location.reload(true);
	}


    //
	//if (keyboard.onKeyDown(keyboard.KEY_ESCAPE) === true){
	//	state = MAINMENU_STATE;
	//	console.log("ESCAPED!!!!");
	//	//runMenu();
	//	//lives = 20;
	//	//console.log(state);
	//	//	console.log("lives", lives);
	//}
	//if(keyboard.isKeyDown(keyboard.KEY_SPACE)){
	//	state = GAME_STATE;
	//}


	//if (mouselistener.mouseDown === true) {
	//	state = MAINMENU_STATE;
	//}


}