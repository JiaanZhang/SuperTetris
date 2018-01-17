/**
* @ignore  =====================================================================================
* @fileoverview This file contains a function about slow droping speed item
* @author  Bowen Yuan, Tim Zhang, Micho Wang
* @version 1.0.0
* @ignore  created in 2017-10-26
* @ignore  =====================================================================================
*/

/**
* Slow the droping speed for 15 seconds and update the money
*/
function slowDrop(){
    if (player.money >= 10 && start === true && pause == false){
        player.money = player.money - 10;
        updateMoney();
        player.dropInterval = player.dropInterval * 2 ;   
        var dropTime = setTimeout(function(){
        player.dropInterval = player.dropInterval / 2 ; 
        },15000);
    }
}