/**
* @ignore  =====================================================================================
* @fileoverview This file contains all functions about random clear items
* @author  Bowen Yuan, Tim Zhang, Micho Wang
* @version 1.0.0
* @ignore  created in 2017-10-31
* @ignore  =====================================================================================
*/


/**
* Clear up 3 random rows and update the money
*/
function randomClear(){
    if (player.money >= 100  && start === true && pause == false){
        player.money = player.money - 100;
        updateMoney();
    let hasTetris = [];
    for (let i=0;i<arena.length;i++){
        for (let j=0;j<arena[i].length;j++){
            if (arena[i][j] !== 0){
                hasTetris.push(i);
                break;
            }
        }
    }
    //console.log(hasTetris);

    for (let i=0;i<Math.min(3,hasTetris.length);i++){
        let num = hasTetris.length * Math.random() | 0 ;
        //console.log(hasTetris[num]);
        for (let j=0;j<arena[hasTetris[num]].length;j++){
            arena[hasTetris[num]][j] = 1;
        }
        hasTetris.splice(num,1);
    }
    arenaSweep();
    updateMoney();
    //console.table(arena);
    }
}