//Movements to the left

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

function MoveLeft(gameBoard) {
  var newShapeArray = moveShapeOneSquareLeft(shapeArray);
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

//-----------------------------------------------------------------------------

//Movements to the right

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

function MoveRight(gameBoard) {
  var newShapeArray = moveShapeOneSquareRight(shapeArray);
  removeOldShapeFromGameBoard(shapeArray, gameBoard);
  addNewShapeToGameBoard(newShapeArray, gameBoard);
  shapeArray = newShapeArray;
  populateDOM(gameBoard);
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

//-----------------------------------------------------------------------------

//Movements to the bottom

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
