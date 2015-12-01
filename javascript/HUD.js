var heart = document.createElement("img");
heart.src = ("images/balloonheart.png");

var moneybag = document.createElement("img");
moneybag.src = ("images/money-bag-resize-2.png");

var money = 10;
var lives = 10;

function drawhud() {

    context.save;
    context.drawImage(heart, 830, 20);
    context.restore;

    context.save;
    context.drawImage(moneybag, 650, 20, 40, 50);
    context.restore;

    context.fillStyle = "maroon";
    context.font = "40px Arial";
    context.fillText(lives, 890, 55);

    context.fillStyle = "maroon";
    context.font = "40px Arial";
    context.fillText("$"+money, 700, 55);


};


function subtractLife() {
    lives -= 1;
}


