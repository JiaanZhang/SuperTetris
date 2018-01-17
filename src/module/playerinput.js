/**
* @ignore  =====================================================================================
* @fileoverview This file contains all player input functions(such as rotating the tetriminos)
* @author  Bowen Yuan, Tim Zhang, Micho Wang
* @version 1.0.0
* @ignore  created in 2017-11-11
* @ignore  =====================================================================================
*/



/**
* Rotate the current tetrimino 
* @param {int[][]} matrix - current tetrimino's metrix
* @param {int} dir - rotating direction(clockwise or counterclockwise)
*/
function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

/**
* Drop the current tetrimino by one unit and check whether collide or not
*/
function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        player.score++;
        //console.table(arena);
        if (nowbomb === true){
            lookForBomb();
        }
        else{
            arenaSweep();
        }
        if (bomb === false){
            playerReset();
        }
        else{
            setBomb();
        }
        updateScore();
        updateMoney();
        //console.log(player.dropInterval);
    }
    dropCounter = 0;
}

/**
* Move the current tetrimino left or right by one unit
* @param {int} offset - direction (1 means move to left, -1 means move to right)
*/
function playerMove(offset) {
    player.pos.x += offset;
    if (collide(arena, player)) {
        player.pos.x -= offset;
    }
}

/**
* Pick a random tetrimino and place it in the top-middle of the playfield
*/
function playerReset() {
    const pieces = 'TJLOSZI';
    if (player.nextmatrix == null){
        player.nextmatrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    }
    //player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.matrix = player.nextmatrix;
    player.nextmatrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
    //console.log(player.pos.x,player.pos.y);
    //console.table(arena);
    if (collide(arena, player)) {
        start = false;
        alert('Game over! Your score is ' + player.score);
    }
}

/**
* Make tetriminoes can be rotated when they are against the arena's border
* @param {int} dir - rotating direction 
*/
function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

module.exports = {
    rotate, playerMove
}