"use strict";


const colorList = ["emptyDiv", "redDiv", "blueDiv", "yellowDiv", "greenDiv", "whiteDiv", "orangeDiv", "aquamarineDiv" ];
const shapes = [
  [0, 0, 1, 0, 1, 1, 1, 0],
  [0, 2, 0, 0, 0, 2, 2, 2],
  [0, 3, 3, 0, 0, 3, 3, 0],
  [4, 4, 0, 0, 0, 4, 4, 0],
  [0, 0, 0, 0, 5, 5, 5, 5],
  [0, 6, 6, 0, 6, 6, 0, 0],
  [0, 7, 0, 0, 7, 7, 7, 0],
]
var gameBoard = createGameBoard();
var container = document.querySelector('.container');


function selectRandomShape() {
  return shapes[Math.floor(Math.random() * 7)];
}

var shapeToDisplay = selectRandomShape();

function insertShape() {
  var nextShapeToDisplay = populateNextItem();
  var m = 0
  var n = 1
  gameBoard[m][3] = shapeToDisplay[0];
  gameBoard[m][4] = shapeToDisplay[1];
  gameBoard[m][5] = shapeToDisplay[2];
  gameBoard[m][6] = shapeToDisplay[3];
  gameBoard[n][3] = shapeToDisplay[4];
  gameBoard[n][4] = shapeToDisplay[5];
  gameBoard[n][5] = shapeToDisplay[6];
  gameBoard[n][6] = shapeToDisplay[7];
  populateDOM();
  var myVar = setInterval(function(){
    m++;
    n++;
    gameBoard[m][3] = shapeToDisplay[0];
    gameBoard[m][4] = shapeToDisplay[1];
    gameBoard[m][5] = shapeToDisplay[2];
    gameBoard[m][6] = shapeToDisplay[3];
    gameBoard[n][3] = shapeToDisplay[4];
    gameBoard[n][4] = shapeToDisplay[5];
    gameBoard[n][5] = shapeToDisplay[6];
    gameBoard[n][6] = shapeToDisplay[7];
    gameBoard[m-1][3] = 0;
    gameBoard[m-1][4] = 0;
    gameBoard[m-1][5] = 0;
    gameBoard[m-1][6] = 0;
    gameBoard[n-1][3] = shapeToDisplay[0];
    gameBoard[n-1][4] = shapeToDisplay[1];
    gameBoard[n-1][5] = shapeToDisplay[2];
    gameBoard[n-1][6] = shapeToDisplay[3];
    populateDOM()
    if (m === 13 || gameBoard[n+1][4] != 0 || gameBoard[n+1][5] != 0) {
      clearInterval(myVar);
      shapeToDisplay = nextShapeToDisplay;
      insertShape()
    }
  }, 500);
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
    new_div.classList.add(gameBoard[parseInt(k/10)][k%10] > 0 ? 'shapeDiv' : 'emptyShapeDiv');
    new_div.classList.add(colorList[gameBoard[parseInt(k/10)][k%10]]);
    container.appendChild(new_div);
  }
}


function deletePreviousFields() {
  document.querySelector('.displayNext').innerHTML = "";
}

function populateNextItem () {
  deletePreviousFields();
  var nextShapeToDisplay = selectRandomShape();
  var nextItem = document.querySelector('.displayNext');
  for (var i = 0; i < 8; i++) {
    var new_div = document.createElement('div');
    new_div.classList.add('tinyDiv');
    new_div.classList.add(nextShapeToDisplay[i] > 0 ? 'shapeDiv' : 'emptyShapeDiv');
    new_div.classList.add(colorList[nextShapeToDisplay[i]]);
    nextItem.appendChild(new_div);
  }
  return nextShapeToDisplay;
}

var button = document.querySelector('button')
button.addEventListener('click', insertShape)
// insertShape()
function main() {

}
