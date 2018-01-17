/**
* @ignore  =====================================================================================
* @fileoverview This file contains a function about bomb item
* @author  Bowen Yuan, Tim Zhang, Micho Wang
* @version 1.0.0
* @ignore  created in 2017-10-26
* @ignore  =====================================================================================
*/



/**
* Find the location of bomb in arena metrix and trigger the bombSweep function
*/
function lookForBomb(){
    nowbomb = false;
    //console.table(arena);
    for (let x=0;x<arena.length;x++){
        for (let y=0;y<arena[x].length;y++){
            if (arena[x][y] === 8){
                bombSweep(x,y);
                break;
            }
        }
    }
}

/**
* Clear specific area surrouding the bomb and turn nowbomb state into false
* @param {int} x - x index of the bomb
* @param {int} y - y index of the bomb
*/
function bombSweep(x,y){
    for (let i=x-3;i<=x+3;i++){
        for (let j=y+Math.abs(i-x)-3;j<=y+3-Math.abs(i-x);j++){
            if (i>=0&&j>=0&&i<=19&&j<=11){
                arena[i][j] = 0;
            }
        }
    }
    //console.table(arena);
    nowbomb=false;
}


/**
* Make next tetrimino be bomb and set nowbomb true
*/
function setBomb(){
    player.matrix = createPiece('B');
    player.pos.y = 0;
    player.pos.x = arena[0].length / 2 | 0 ;
    bomb = false;
    nowbomb = true;
    const pieces = 'TJLOSZI';
    player.nextmatrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    if (collide(arena, player)) {
        start = false;
        alert('Game over! Your score is ' + player.score);
    }
}

/**
* Set bomb=true and update the money
*/
function nextBomb(){
    if (player.money >= 20  && start === true && pause == false){
        player.money = player.money - 20;
        updateMoney();
        bomb = true;
        player.nextmatrix = createPiece('B');
        nextcontext.fillStyle = '#000';
        nextcontext.fillRect(0, 0, nexttetris.width, nexttetris.height);
        drawNextTetris(player.nextmatrix,{x:1,y:(5-player.nextmatrix[0].length)/2});
    }
}

module.exports = {
    lookForBomb, bombSweep
}