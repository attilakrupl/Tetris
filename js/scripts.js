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

//checkes if curent square has got any other squaers below itself within the shape
//BOOLEAN
function compareSquaresYcoordToOthersWithinShape(element, list) {
  var thisIsAtTheBottom = true;
  for (var i = 0; i < list.length; i++) {
    if (element !== list[i]) {
      if((element.x_coord == list[i].x_coord) && ((element.y_coord + 1) == list[i].y_coord)) {
        return false;
      }
    }
  }
  return thisIsAtTheBottom;
}

//checkes if curent square has got any other squaers to the left to itself within the shape
//BOOLEAN
function compareSquaresXcoordToLeftSideWithinShape(element, list) {
  var thisIsAtTheVeryLeft = true;
  for (var i = 0; i < list.length; i++) {
    if (element !== list[i]) {
      if((element.y_coord == list[i].y_coord) && ((element.x_coord - 1 ) == list[i].x_coord)) {
        return false;
      }
    }
  }
  return thisIsAtTheVeryLeft;
}

//checkes if curent square has got any other squaers to the right to itself within the shape
//BOOLEAN
function compareSquaresXcoordToRightSideWithinShape(element, list) {
  var thisIsAtTheVeryRight = true;
  for (var i = 0; i < list.length; i++) {
    if (element !== list[i]) {
      if((element.y_coord == list[i].y_coord) && ((element.x_coord + 1 ) == list[i].x_coord)) {
        return false;
      }
    }
  }
  return thisIsAtTheVeryRight;
}

//returns with the array of the squares which are at the very bottom squares of the shape in each column
//ARRAY
function getBottomSquaresOfTheShape(shapeArray) {
  var bottomSquares = [];
  for (var i = 0; i < 4; i++) {
    if(compareSquaresYcoordToOthersWithinShape(shapeArray[i], shapeArray)){
      bottomSquares.push(shapeArray[i]);
    }
  }
  return bottomSquares;
}

//checks if there is any other object below any square of the shape
//BOOLEAN
function theresSomethingBelowBottomSquares(gameBoard, bottomSquares) {
  var emptyBelow = false;
  for(var i = 0; i < bottomSquares.length; i++) {
    var actualSquare = bottomSquares[i];
    if (gameBoard[actualSquare.y_coord + 1][actualSquare.x_coord] > 0) {
      return true;
    }
  }
  return emptyBelow;
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

//checkes if the moving shape reached the bottom of the gameboard
//BOOLEAN
function reachedTheBottom(bottomSquares) {
  var reachedTheBottom = false;
  for(var i = 0; i < bottomSquares.length; i++) {
    if (bottomSquares[i].y_coord == 14) {
      return true;
    }
  }
  return reachedTheBottom;
}
console.log("Game Over");

//GAME OVER CONTROLLER - Responsible for stopping auto motion interval, and displaying game over message, activating new game button
//VOID
function gameOver(myVar) {
  clearInterval(myVar);
  container.innerHTML = '<div class="blanket"><p>Game Over!</p></div>';
  button.disabled = false;
}

//Responsible for adding +1 to y_coord, so moving shape downwards
//ARRAY
function moveShapeOneSquareDown(shapeArray) {
  var newShapeArray = [];
  for (var i = 0; i < shapeArray.length; i++) {
    var e = shapeArray[i];
    newShapeArray.push({y_coord : e.y_coord+1, x_coord : e.x_coord , color_code : e.color_code});
  }
  return newShapeArray;
}

//Responsible for deductiong 1 from x_coord, so moving shape to the left
//ARRAY
function moveShapeOneSquareLeft(shapeArray) {
  var newShapeArray = [];
  for (var i = 0; i < shapeArray.length; i++) {
    var e = shapeArray[i];
    newShapeArray.push({y_coord : e.y_coord, x_coord : e.x_coord - 1 , color_code : e.color_code});
  }
  return newShapeArray;
}

//Responsible for adding 1 to x_coord, so moving shape to the right
//ARRAY
function moveShapeOneSquareRight(shapeArray) {
  var newShapeArray = [];
  for (var i = 0; i < shapeArray.length; i++) {
    var e = shapeArray[i];
    newShapeArray.push({y_coord : e.y_coord, x_coord : e.x_coord + 1 , color_code : e.color_code});
  }
  return newShapeArray;
}

//Creates the next shape, inserts recent shape into gameBoard, moves shape towards the bottom
//VOID
function newShape(gameBoard) {
  var nextShape = handleNextItem();
  insertShapeToTopOfGameBoard(gameBoard, shapeToDisplay);
  autoMoveTheNewShapeDownController(gameBoard, nextShape);
}

//Responsible for moving shape down, and setting all the data related
//VOID
function MoveDown(gameBoard, bottomSquares) {
  var newShapeArray = moveShapeOneSquareDown(shapeArray);
  removeOldShapeFromGameBoard(shapeArray, gameBoard);
  addNewShapeToGameBoard(newShapeArray, gameBoard);
  shapeArray = newShapeArray;
  bottomSquares = getBottomSquaresOfTheShape(newShapeArray);
  populateDOM(gameBoard);
}

function MoveLeft(gameBoard) {
  var newShapeArray = moveShapeOneSquareLeft(shapeArray);
  removeOldShapeFromGameBoard(shapeArray, gameBoard);
  addNewShapeToGameBoard(newShapeArray, gameBoard);
  shapeArray = newShapeArray;
  populateDOM(gameBoard);
}

function MoveRight(gameBoard) {
  var newShapeArray = moveShapeOneSquareRight(shapeArray);
  removeOldShapeFromGameBoard(shapeArray, gameBoard);
  addNewShapeToGameBoard(newShapeArray, gameBoard);
  shapeArray = newShapeArray;
  populateDOM(gameBoard);
}

function getLeftmostSquaresOfShapeArray(shapeArray) {
  var leftmostSquares = [];
  for (var i = 0; i < 4; i++) {
    if(compareSquaresXcoordToLeftSideWithinShape(shapeArray[i], shapeArray)){
      leftmostSquares.push(shapeArray[i]);
    }
  }
  return leftmostSquares;
}

function reachedTheLeftWall(leftmostSquares) {
  var reachedTheLeft = false;
  for(var i = 0; i < leftmostSquares.length; i++) {
    if (leftmostSquares[i].x_coord == 0) {
      return true;
    }
  }
  return reachedTheLeft;
}

function theresSomethingToTheLeft(gameBoard, leftmostSquares) {
  var emptyBelow = false;
  for(var i = 0; i < leftmostSquares.length; i++) {
    var actualSquare = leftmostSquares[i];
    if (gameBoard[actualSquare.y_coord][actualSquare.x_coord - 1] > 0) {
      return true;
    }
  }
  return emptyBelow;
}

function getRightmostSquaresOfShapeArray(shapeArray) {
  var rightmostSquares = [];
  for (var i = 0; i < 4; i++) {
    if(compareSquaresXcoordToRightSideWithinShape(shapeArray[i], shapeArray)){
      rightmostSquares.push(shapeArray[i]);
    }
  }
  return rightmostSquares;
}

function reachedTheRightWall(rightmostSquares) {
  var reachedTheRight = false;
  for(var i = 0; i < rightmostSquares.length; i++) {
    if (rightmostSquares[i].x_coord == 9) {
      return true;
    }
  }
  return reachedTheRight;
}

function theresSomethingToTheRight(gameBoard, rightmostSquares) {
  var emptyBelow = false;
  for(var i = 0; i < rightmostSquares.length; i++) {
    var actualSquare = rightmostSquares[i];
    if (gameBoard[actualSquare.y_coord][actualSquare.x_coord + 1] > 0) {
      return true;
    }
  }
  return emptyBelow;
}


//MAIN
function main() {
  gameBoard = createGameBoard();
  button.disabled = true;
  newShape(gameBoard);
}
