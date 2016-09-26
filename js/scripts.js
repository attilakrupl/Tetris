"use strict";

const colorList = ["emptyDiv", "redDiv", "blueDiv", "yellowDiv", "greenDiv", "whiteDiv", "orangeDiv", "aquamarineDiv" ];
const shapes = [
  [0, 0, 1, 0, 1, 1, 1, 0],
  [0, 2, 0, 0, 0, 2, 2, 2],
  [0, 3, 3, 0, 0, 3, 3, 0],
  [0, 4, 4, 0, 0, 0, 4, 4],
  [0, 0, 0, 0, 5, 5, 5, 5],
  [0, 6, 6, 0, 6, 6, 0, 0],
  [0, 7, 0, 0, 7, 7, 7, 0],
]
var gameBoard = createGameBoard();
var container = document.querySelector('.container');

function selectRandomShape() {
  return shapes[Math.floor(Math.random() * 7)];
}

function insertShape() {
  var shapeToDisplay = selectRandomShape();
  var m = 0
  var n = 1
  function doShit() {
    gameBoard[m][3] = shapeToDisplay[0];
    gameBoard[m][4] = shapeToDisplay[1];
    gameBoard[m][5] = shapeToDisplay[2];
    gameBoard[m][6] = shapeToDisplay[3];
    gameBoard[n][3] = shapeToDisplay[4];
    gameBoard[n][4] = shapeToDisplay[5];
    gameBoard[n][5] = shapeToDisplay[6];
    gameBoard[n][6] = shapeToDisplay[7];
    populateDOM();
    m++;
    n++;
  }

doShit();
//   while(m!=13) {
//     setTimeout(doShit(), 1000);
//   }
}

function createGameBoard() {
  var gameBoard = {};
  for (var i = 0; i < 15; i++) {
    gameBoard[i] = [];
    for (var j = 0; j < 10; j++) {
      gameBoard[i].push(0);
    }
  }
  return gameBoard;
}

function populateDOM() {
  container.innerHTML="";
  for (var k = 0; k < 150; k++) {
    var new_div = document.createElement('div');
    new_div.classList.add('smallDiv');
    new_div.classList.add(colorList[gameBoard[parseInt(k/10)][k%10]]);
    container.appendChild(new_div);
  }
}

function main() {
  insertShape();

}

main();
