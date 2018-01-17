/**
* @ignore  =====================================================================================
* @fileoverview This file contains all functions about create and draw Matrix and piece
* @author  Bowen Yuan, Tim Zhang, Micho Wang
* @version 1.0.0
* @ignore  created in 2017-11-11
* @ignore  =====================================================================================
*/



/**
* Create a metrix with width w and height h
* @param {int} w - width of the metrix
* @param {int} h - height of the metrix
* @return matrix 
*/
function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

/**
* Return a specific tetrimino's metrix by inputing type
* @param {char} type 
* @return A specific tetrimino's metrix
*/
function createPiece(type)
{
    if (type === 'I') {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (type === 'L') {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (type === 'J') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0],
        ];
    } else if (type === 'O') {
        return [
            [4, 4],
            [4, 4],
        ];
    } else if (type === 'Z') {
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'T') {
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    } else if (type === 'B'){
        return [
            [0, 0, 0],
            [0, 8, 0],
            [0, 0, 0]
        ];
    }
}

/**
* Draw a matrix in canvas
* @param {int[][]} matrix - the target matrix
* @param {offset} offset - the offset of matrix
*/
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

function drawNextTetris(matrix,offset){
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                nextcontext.fillStyle = colors[value];
                nextcontext.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

module.exports = {
    createMatrix, createPiece, drawMatrix, drawNextTetris
}