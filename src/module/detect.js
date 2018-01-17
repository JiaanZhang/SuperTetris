/**
* @ignore  =====================================================================================
* @fileoverview This file contains functions about detecting collision and checking if any rows 
*                need to be cleared up.
* @author  Bowen Yuan, Tim Zhang, Micho Wang
* @version 1.0.0
* @ignore  created in 2017-11-20
* @ignore  =====================================================================================
*/




/**
* Check if there are any lines full of tetriminoes which can be sweeped
*/
function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length -1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        player.money += rowCount * 10;
        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

/**
* Check if the current tetrimino collide the arena
* @param {int[][]} arena} - arena metrix
* @param {player} - player object
* @return return if they collide
*/
function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

/**
* Merge the current tetrimino's metrix and arena's metrix
* @param {int[][]} arena - playfield's arena
* @param {player} player - current tetrimino's metrix
*/
function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

module.exports = {
    merge , collide
}