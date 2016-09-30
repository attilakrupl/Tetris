"use strict";

var gameBoard;
const button = document.querySelector('button');
const container = document.querySelector('.container');
var shapeToDisplay = selectRandomShape();
var gameLevel = 0;
var totalScore = 0;
var shapeArray = [];

//Fills up our game board 15X10 boxes with 0-s
//GAMEBOARD OBJECT
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

//Selects a shape from our shapes list randomly
//SHAPE OBJECT
function selectRandomShape() {
  return shapes[Math.floor(Math.random() * 7)];
}

//Inserts a randomly selected item into the game board replacing zeros with color codes
//VOID
function insertShapeToTopOfGameBoard(gameBoard, shapeToDisplay) {
  var xp = 3;
  for (var i = 0; i < 8; i++) {
    gameBoard[parseInt(i/4)][xp+i%4] = shapeToDisplay[i];
  }
  populateDOM(gameBoard);
}

//Erases the Next Item field so we can display the next one
//VOID
function deletePreviousNextItemFields() {
  document.querySelector('.displayNext').innerHTML = "";
}

//Responsible for displaying the next shape in Next Item field
//VOID
function displayShapeInNextItemField(nextShapeToDisplay) {
  var nextItem = document.querySelector('.displayNext');
  for (var i = 0; i < 8; i++) {
    var new_div = document.createElement('div');
    new_div.classList.add('tinyDiv');
    new_div.classList.add(nextShapeToDisplay[i] > 0 ? 'shapeDiv' : 'emptyShapeDiv');
    new_div.classList.add(colorList[nextShapeToDisplay[i]]);
    nextItem.appendChild(new_div);
  }
}

//Creates next item, displays it, and returns with that so we can use the actual shape later
//SHAPE OBJECT
function handleNextItem () {
  var nextShapeToDisplay = selectRandomShape();
  deletePreviousNextItemFields();
  displayShapeInNextItemField(nextShapeToDisplay);
  return nextShapeToDisplay;
};

//Returns the array of shape elements (squares) so we can handle them individually later
//ARRAY OF SHAPE SQUARES
function getActiveShapeObject(gameBoard) {
  var shapeArray = [];
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 8; j++) {
      if (gameBoard[i][j] > 0) {
        shapeArray.push({y_coord : i, x_coord : j, color_code : gameBoard[i][j]})
      }
    }
  }
  return shapeArray;
}

//displays our actual game board in the DOM
//VOID
function populateDOM(gameBoard) {
  container.innerHTML='<div class="blanket"></div>';
  for (var k = 0; k < 150; k++) {
    var new_div = document.createElement('div');
    new_div.classList.add('smallDiv');
    new_div.classList.add(gameBoard[parseInt(k/10)][k%10] > 0 ? 'shapeDiv' : 'emptyShapeDiv');
    new_div.classList.add(colorList[gameBoard[parseInt(k/10)][k%10]]);
    container.appendChild(new_div);
  }
}

//Ereases moving shape's previous position from gameboard, overriding it with 0-s
//VOID
function removeOldShapeFromGameBoard(shapeArray, gameBoard) {
  for (var i = 0; i < shapeArray.length; i++) {
    var actual = shapeArray[i];
    gameBoard[actual.y_coord][actual.x_coord] = 0;
  }
}

//Adds moving shapes's new position to the gameboard, overriding new position color codes to shape's color codes
//VOID
function addNewShapeToGameBoard(newShapeArray, gameBoard) {
  for (var i = 0; i < newShapeArray.length; i++) {
    var actual = newShapeArray[i];
    gameBoard[actual.y_coord][actual.x_coord] = actual.color_code;
  }
}

//GAME OVER CONTROLLER - Responsible for stopping auto motion interval, and displaying game over message, activating new game button
//VOID
function gameOver(myVar) {
  clearInterval(myVar);
  container.innerHTML = '<div class="blanket"><p>Game Over!</p></div>';
  button.disabled = false;
}

//Creates the next shape, inserts recent shape into gameBoard, moves shape towards the bottom
//VOID
function newShape(gameBoard) {
  var nextShape = handleNextItem();
  insertShapeToTopOfGameBoard(gameBoard, shapeToDisplay);
  autoMoveTheNewShapeDownController(gameBoard, nextShape);
}

//MAIN
function main() {
  gameBoard = createGameBoard();
  button.disabled = true;
  newShape(gameBoard);
}
