"use strict";

var colorList = ["emptyDiv", "redDiv", "blueDiv", "yellowDiv", "greenDiv"];

var gameBoard = {};
for (var i = 0; i < 15; i++) {
  gameBoard[i] = [];
  for (var j = 0; j < 10; j++) {
    gameBoard[i].push(0);
  }
}

gameBoard[4][5] = 1;
gameBoard[5][6] = 1;
gameBoard[5][4] = 1;
gameBoard[5][5] = 1;

for (var k = 0; k < 150; k++) {
  var new_div = document.createElement('div');
  new_div.classList.add('smallDiv');
  new_div.classList.add(colorList[gameBoard[parseInt(k/10)][k%10]]);
  var container = document.querySelector('.container');
  container.appendChild(new_div);
}

console.log(gameBoard);
