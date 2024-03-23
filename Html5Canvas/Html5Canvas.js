//create canvas 
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
var spriteDim = 50;
document.body.appendChild(canvas);

//Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "./images/background.png";

//hero 
var hReady = false;
var hImage = new Image();
hImage.onload = function () {
    hReady = true;
}
hImage.width = 50;
hImage.height = 50;
hImage.src = "./images/astronaut.jpg";
hImage.style.width = 50;
hImage.style.height = 50;

//monster 
var mReady = false;
var mImage = new Image();
mImage.onload = function () {
    mReady = true;
}
mImage.width = 50;
mImage.heigth = 50;
mImage.src = "./images/dino.jpg" 
mImage.style.width = 50;
mImage.style.heigth = 50;

//game objects
var hero = {
    speed: 256,
    x: 0,
    y:0
};

var monster = {
    x: 0,
    y: 0
}

var monstersCaught = 0;

//Handle keyboard controls for player input
var keysDown = {};

addEventListener("keydown", function (e){
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup",function (e){
    delete keysDown[e.keyCode];
}, false);

//reset the game when player catches a monster
//begin new game or level
var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    //throw the monster somewhere on screen
    monster.x = 32 + (Math.random()*(canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//update game objects
var update = function (modifier) {
    if (38 in keysDown) {
        //player is holding up key
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) {
        //down key
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) {
        //left key 
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) {
        //right key
        hero.x += hero.speed * modifier;
    }
    //check if touching
    if (hero.x <= (monster.x + 45) && monster.x <= (hero.x + 45)
    && hero.y <= (monster.y + 45) && monster.y <= (hero.y + 45)) {
        ++monstersCaught;
        reset();
    }
    while(hero.x>=canvas.width-50)
        hero.x -= 5;
    while(hero.x<=0)
        hero.x += 5;
    while(hero.y>=canvas.height-50)
        hero.y -= 5;
    while(hero.y<=0)
        hero.y += 5;
};

//Draw and render everything
var render = function () {
    if(bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if(hReady) {
        ctx.drawImage(hImage, hero.x, hero.y, spriteDim, spriteDim);
    }
    if(mReady) {
        ctx.drawImage(mImage, monster.x, monster.y, spriteDim, spriteDim);
    }

    //Score 
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Monsters caught: "+monstersCaught, 32, 32);
};

//take background image and draw to canvas, then hero and monster
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    //request to do again asap 
    requestAnimationFrame(main);
};

//Cross browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();
