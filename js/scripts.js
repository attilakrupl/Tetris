"use strict";

const button = document.querySelector('button');
const container = document.querySelector('.container');
const colorList = ["emptyDiv", "redDiv", "blueDiv", "yellowDiv", "greenDiv", "whiteDiv", "orangeDiv", "aquamarineDiv" ];
const shapes = [
  [0, 0, 0, 1, 0, 1, 1, 1],
  [2, 0, 0, 0, 2, 2, 2, 0],
  [0, 3, 3, 0, 0, 3, 3, 0],
  [4, 4, 0, 0, 0, 4, 4, 0],
  [0, 0, 0, 0, 5, 5, 5, 5],
  [0, 6, 6, 0, 6, 6, 0, 0],
  [0, 7, 0, 0, 7, 7, 7, 0],
];
var shapeToDisplay = selectRandomShape();

//Fills up our game board 15X10 boxes with 0-s
function createGameBoard() {
  var gameBoard = {};
  for (var i = 0; i < 15; i++) {
    gameBoard[i] = [];
    for (var j = 0; j < 10; j++) {
      gameBoard[i].push(0);
    }
  }
  // console.log(gameBoard);
  return gameBoard;
}

//Selects a shape from our shapes list randomly
function selectRandomShape() {
  return shapes[Math.floor(Math.random() * 7)];
}

//Inserts a randomly selected item into the game board replacing zeros with color codes
function insertShapeToTopOfGameBoard(gameBoard, shapeToDisplay) {
  var xp = 3;
  for (var i = 0; i < 8; i++) {
    gameBoard[parseInt(i/4)][xp+i%4] = shapeToDisplay[i];
  }
  populateDOM(gameBoard);
}

    //Erases the Next Item field so we can display the next one
    function deletePreviousNextItemFields() {
      document.querySelector('.displayNext').innerHTML = "";
    }

//Responsible for displaying the next shape in Next Item field
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
function handleNextItem () {
  var nextShapeToDisplay = selectRandomShape();
  deletePreviousNextItemFields();
  displayShapeInNextItemField(nextShapeToDisplay);
  return nextShapeToDisplay;
};

//Returns the array of shape elements (squares) so we can handle them individually later
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
function populateDOM(gameBoard) {
  container.innerHTML="";
  for (var k = 0; k < 150; k++) {
    var new_div = document.createElement('div');
    new_div.classList.add('smallDiv');
    new_div.classList.add(gameBoard[parseInt(k/10)][k%10] > 0 ? 'shapeDiv' : 'emptyShapeDiv');
    new_div.classList.add(colorList[gameBoard[parseInt(k/10)][k%10]]);
    container.appendChild(new_div);
  }
}

function compareElementsYcoordToOthers(element, list) {
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

function getBottomSquaresOfTheShape(gameBoard, shapeArray) {
  var bottomSquares = [];
  for (var i = 0; i < 4; i++) {
    if(compareElementsYcoordToOthers(shapeArray[i], shapeArray)){
      bottomSquares.push(shapeArray[i]);
    }
  }
  return bottomSquares;
}

function theresNothingBelowBottomSquares(gameBoard, bottomSquares) {
  var emptyBelow = true;
  for(var i = 0; i < bottomSquares.length; i++) {
    var actualSquare = bottomSquares[i];
    if (gameBoard[actualSquare.y_coord + 1][actualSquare.x_coord] > 0) {
      return false;
    }
  }
  return emptyBelow;
}

function removeOldShapeFromGameBoard(shapeArray, gameBoard) {
  for (var i = 0; i < shapeArray.length; i++) {
    var actual = shapeArray[i];
    gameBoard[actual.y_coord][actual.x_coord] = 0;
  }
}

function addNewShapeToGameBoard(newShapeArray, gameBoard) {
  for (var i = 0; i < newShapeArray.length; i++) {
    var actual = newShapeArray[i];
    gameBoard[actual.y_coord][actual.x_coord] = actual.color_code;
  }
}

function reachedTheBottom(bottomSquares) {
  var reachedTheBottom = false;
  for(var i = 0; i < bottomSquares.length; i++) {
    if (bottomSquares[i].y_coord == 14) {
      return true;
    }
  }
  return reachedTheBottom;
}

function moveTheNewShape(gameBoard, nextShape) {
  var shapeArray = getActiveShapeObject(gameBoard);

  var myVar = setInterval(function() {
    var newShapeArray = [];
    var escapeVariable = false;
    var bottomSquares = getBottomSquaresOfTheShape(gameBoard, shapeArray);

    if (reachedTheBottom(bottomSquares))

    {
        escapeVariable = true;
    }

    else if (!theresNothingBelowBottomSquares(gameBoard, bottomSquares))

    {
      escapeVariable = true;
    }

    else if (theresNothingBelowBottomSquares(gameBoard, bottomSquares))

    {
      for (var i = 0; i < shapeArray.length; i++) {
        var e = shapeArray[i];
        console.log(e);
        console.log({y_coord : e.y_coord+1, x_coord : e.x_coord , color_code : e.color_code});
        newShapeArray.push({y_coord : e.y_coord+1, x_coord : e.x_coord , color_code : e.color_code});
      }
      removeOldShapeFromGameBoard(shapeArray, gameBoard);
      addNewShapeToGameBoard(newShapeArray, gameBoard);
      // console.log(shapeArray);
      // console.log(newShapeArray);
      shapeArray = newShapeArray;
      // console.log(shapeArray);
      bottomSquares = getBottomSquaresOfTheShape(gameBoard, newShapeArray);
    };


    if(escapeVariable == true) {
      clearInterval(myVar);
      shapeToDisplay = nextShape;
      newShape(gameBoard);
    } else {
      populateDOM(gameBoard);
    }

  }, 100);
}

function newShape(gameBoard) {
  var nextShape = handleNextItem();
  insertShapeToTopOfGameBoard(gameBoard, shapeToDisplay);
  moveTheNewShape(gameBoard, nextShape);
}

function main() {
  var gameBoard = createGameBoard();
  newShape(gameBoard);
}

button.addEventListener('click', main);
