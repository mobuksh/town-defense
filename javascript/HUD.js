var heart = document.createElement("img");
heart.src = ("images/balloonheart.png");

var moneybag = document.createElement("img");
moneybag.src = ("images/moneybag.png")

var money = 100;
var lives = 20;

function drawhud(){
	
	context.save;
		context.drawImage(heart, 830, 20);
	context.restore;
	
	context.save;
		context.drawImage(moneybag, 650, 20);
	context.restore;
	
	context.fillStyle = "#000";
	context.font="40px Arial";
	context.fillText(lives, 890, 55);
	
	context.fillStyle = "#000";
	context.font="40px Arial";
	context.fillText(money, 700, 55);
};