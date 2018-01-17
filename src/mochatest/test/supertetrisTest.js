const assert = require('chai').assert;
const drawmatrix = require('../../module/drawmatrix');
const playerinput = require('../../module/playerinput');
const detect = require('../../module/detect');
const bombitem = require('../../module/bomb')

describe('App', function(){


	it ('Test for bomb sweep(case 1)', function(){
		x = 1;
		y = 1;
 		arena = [];
 		w = 12 ; h = 20
    	while (h--) {
        	arena.push(new Array(w).fill(0));
    	}
    	nowbomb = true
		bombitem.bombSweep(x,y)
		assert.equal(nowbomb, false)
	});

	it ('Test for bombSweep(case 2 normal position)', function(){
		x = 5;
		y = 5;
 		arena = [];
 		w = 12 ; h = 20
    	while (h--) {
        	arena.push(new Array(w).fill(1));
    	}
		bombitem.bombSweep(x,y)
		assert.equal(arena[5][5], 0)
		assert.equal(arena[8][5], 0)
		assert.equal(arena[2][5], 0)
		assert.equal(arena[5][2], 0)
		assert.equal(arena[5][8], 0)
	});

	it ('Test for bombSweep(case 3 line position)', function(){
		x = 0;
		y = 8;
 		arena = [];
 		w = 12 ; h = 20
    	while (h--) {
        	arena.push(new Array(w).fill(1));
    	}
		bombitem.bombSweep(x,y)
		assert.equal(arena[0][8], 0)
		assert.equal(arena[0][11], 0)
		assert.equal(arena[0][5], 0)
		assert.equal(arena[3][8], 0)
	});

	it ('Test for bombSweep(case 4 corner position)', function(){
		x = 0;
		y = 0;
 		arena = [];
 		w = 12 ; h = 20
    	while (h--) {
        	arena.push(new Array(w).fill(1));
    	}
		bombitem.bombSweep(x,y)
		assert.equal(arena[0][0], 0)
		assert.equal(arena[0][3], 0)
		assert.equal(arena[3][0], 0)
		assert.equal(arena[1][2], 0)
		assert.equal(arena[2][1], 0)
	});

	it ('Test for bombSweep(case 5 edge position)', function(){
		x = 5;
		y = 5;
 		arena = [];
 		w = 12 ; h = 20
    	while (h--) {
        	arena.push(new Array(w).fill(1));
    	}
		bombitem.bombSweep(x,y)
		assert.equal(arena[5][8], 0)
		assert.equal(arena[8][5], 0)
		assert.equal(arena[7][7], 1)
		assert.equal(arena[3][3], 1)
	});

	it ('Test for arena sweep', function(){
		player = {money: 0 , score: 0}
		arena = [];
 		w = 12 ; h = 20
    	while (h--) {
        	arena.push(new Array(w).fill(1));
    	}
        for (var i = 0;i < 20;i++){
        	arena[i][0] = 1;
        }
        assert.equal(arena[0][0], 1)
        assert.equal(arena[10][0], 1)
        assert.equal(arena[19][0], 1)
	})


	it ('Test for merging metrix and arena(case 1)', function(){
		player = {matrix: [[1,0],[0,1]] , pos : {x:0, y:0}}
		arena = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
		detect.merge(arena, player)
		assert.equal(arena[0][0], 1)
		assert.equal(arena[0][1], 0)
		assert.equal(arena[1][0], 0)
		assert.equal(arena[1][1], 1)
	});

	it ('Test for merging metrix and arena(case 2)', function(){
		player = {matrix: [[1,0],[0,1]] , pos : {x:1, y:1}}
		arena = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
		detect.merge(arena, player)
		assert.equal(arena[1][1], 1)
		assert.equal(arena[1][2], 0)
		assert.equal(arena[2][1], 0)
		assert.equal(arena[2][2], 1)
	});

	it ('Test for merging metrix and arena(case 3)', function(){
		player = {matrix: [[2,0,2],[0,2,0],[2,0,2]] , pos : {x:1, y:1}}
		arena = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
		detect.merge(arena, player)
		assert.equal(arena[1][1], 2)
		assert.equal(arena[1][2], 0)
		assert.equal(arena[2][1], 0)
		assert.equal(arena[2][2], 2)
	});

	it ('Test for collide function(collide case 1)', function(){
		player = {matrix: [[1,0],[0,1]] , pos : 0}
		arena = [[1,0],[0,0]]
		flag = detect.collide(arena, player)
		assert.equal(flag, true)
	});

	it ('Test for collide function(collide case 2)', function(){
		player = {matrix: [[1,0],[0,1]] , pos : 0}
		arena = [[1,1],[1,1]]
		flag = detect.collide(arena, player)
		assert.equal(flag, true)
	});

	it ('Test for collide function(not collide case 1)', function(){
		player = {matrix: [[0,0],[0,0]] , pos : 0}
		arena = [[0,0],[0,0]]
		flag = detect.collide(arena, player)
		assert.equal(flag, false)
	});

	it ('Test for collide function(not collide case 2)', function(){
		player = {matrix: [[0,0],[0,0]] , pos : 0}
		arena = [[0,0],[0,1]]
		flag = detect.collide(arena, player)
		assert.equal(flag, false)
	});

	it ('Test for collide function(edge case 1)', function(){
		player = {matrix: [[1,0],[0,0]] , pos : 1}
		arena = [[1,0],[0,1]]
		flag = detect.collide(arena, player)
		assert.equal(flag, true)
	});

	it ('Test for collide function(edge case 2)', function(){
		player = {matrix: [[2,1],[1,1]] , pos : 1}
		arena = [[1,0],[0,1]]
		flag = detect.collide(arena, player)
		assert.equal(flag, true)
	});
	
	it ('Test for rotating clockwisely', function(){
		let matrix = [[0,1],[1,0]]
		dir = -1
		playerinput.rotate(matrix, dir)
		assert.equal(matrix[0][0], 1)
		assert.equal(matrix[0][1], 0)
	});

	it ('Test for rotating clockwisely(case 2)', function(){
		let matrix = [[0,1,0],[1,0,1],[0,1,0]]
		dir = -1
		playerinput.rotate(matrix, dir)
		assert.equal(matrix[0][0], 0)
		assert.equal(matrix[0][1], 1)
		assert.equal(matrix[0][2], 0)
	});

	it ('Test for rotating counterclockwisely', function(){
		let matrix = [[0,1],[1,0]]
		dir = 1
		playerinput.rotate(matrix, dir)
		assert.equal(matrix[0][0], 1)
		assert.equal(matrix[0][1], 0)
	});

	it ('Test for creating a piece(normal case)', function(){
		let firstPiece = drawmatrix.createPiece('I');
		let myFirstPiece = [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]
		for (var i = 0; i < firstPiece.length; i++){
			for (var j = 0; j < firstPiece[i].length; j++){
				assert.equal(firstPiece[i][j], myFirstPiece[i][j])
			}
		}
	});

	it ('Test for creating a piece(bomb case)', function(){
		let secondPiece = drawmatrix.createPiece('B');
		let mySecondPiece = [[0,0,0],[0,8,0],[0,0,0]]
		for (var i = 0; i < secondPiece.length ; i++){
			for (var j = 0; j < secondPiece[i].length; j++){
				assert.equal(secondPiece[i][j], mySecondPiece[i][j])
			}
		}
	});

	it ('Test for create a matrix', function(){
		let matrix = drawmatrix.createMatrix(12,8)
		let length = matrix.length
		let innerlength = matrix[0].length
		assert.equal(length, 8);
		assert.equal(innerlength, 12)
	});


});