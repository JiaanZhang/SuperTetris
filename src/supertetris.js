/**
* @ignore  =====================================================================================
* @fileoverview Game main file 
* @author  Bowen Yuan, Tim Zhang, Micho Wang
* @version 1.0.0
* @ignore  created in 2017-11-09
* @ignore  =====================================================================================
*/
const canvas = document.getElementById('tetris'); //Unique tetris canvas
const context = canvas.getContext('2d'); //Canvas's context

const nexttetris = document.getElementById('nexttetris'); //Unique tetris canvas
const nextcontext = nexttetris.getContext('2d'); //Canvas's context

context.scale(20, 20);
nextcontext.scale(20 , 20);


let currentScore = 0; //Current score
let dropCounter = 0;//time to drop by one unit 
let lastTime = 0;//last refreshing time

/**
* Draw something on canvas
*/
function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    nextcontext.fillStyle = '#000';
    nextcontext.fillRect(0, 0, nexttetris.width, nexttetris.height);

    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
    drawNextTetris(player.nextmatrix,{x:1,y:(5-player.nextmatrix[0].length)/2});
}

/**
* Use requestAnimationFrame method to redraw on canvas  
* @param {int} time 
*/
function update(time = 0) {
    const deltaTime = time - lastTime;
    dropCounter += deltaTime;
    if (dropCounter > player.dropInterval && start === true) {
        playerDrop();
    }
    if (player.score - currentScore >= 100){
        if (player.score < 600){
            currentScore = player.score;
            player.dropInterval = player.dropInterval*0.7;
        }
        else{
            currentScore = player.score;
            player.dropInterval = player.dropInterval*0.9;
        }
    }
    lastTime = time;

    if (pause!==true && start === true) {
        draw();
        requestAnimationFrame(update);
    }
}

/**
* Update the score in html
*/
function updateScore() {
    document.getElementById('score').innerText = "Score: "+player.score;
}

/**
* Update the money in html
*/
function updateMoney(){
    document.getElementById('money').innerText = "Money: "+player.money;
}

/**
* Initialize and clear up everything and restart the game 
*/
function restartGame(){
    arena.forEach(row => row.fill(0));
    player.score = 0;
    player.money = 0;
    player.dropInterval = 1000;
    currentScore = 0;
    updateScore();
    updateMoney();
    player.nextmatrix = null;
    pause = false;
    start = true;
    bomb = false;
    nowbomb = false;
    playerReset();
    update();
}


/**
*Press different keys to trigger different functions
*/
document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        if (pause ===false){
            playerMove(-1);
        }
    } else if (event.keyCode === 39) {
        if (pause ===false){
            playerMove(1);
        }
    } else if (event.keyCode === 40) {
        if (start === true && pause === false){
            playerDrop();
        }       
    } else if (event.keyCode === 81) {
        if (pause ===false){
            playerRotate(-1);
        }
    } else if (event.keyCode === 87) {
        if (pause ===false){
            playerRotate(-1);
        }
    } else if (event.keyCode === 13){
        pause = !pause;
        if (pause === false){
            update();
        }
    } else if (event.keyCode === 82){
        restartGame();
    } else if (event.keyCode === 49){ //item 1
        nextBomb();
    } else if (event.keyCode === 50){ //item 2
        slowDrop();
    } else if (event.keyCode === 51){ //item 3
        randomClear();
    } 

});

var pause = false; //pause state
var start = false; //start state
var bomb = false; //bomb state
var nowbomb = false; //nowbomb state

//Colors array
const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
    '#FFFAFA',
];

//Playfield arena
const arena = createMatrix(12, 20);
//current tetrimino's position and game state
const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    nextmatrix: null,
    score: 0,
    money: 0,
    dropInterval: 1000,
};

playerReset();
updateScore();
updateMoney();
update();

