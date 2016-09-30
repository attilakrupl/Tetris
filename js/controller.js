//AUTOMATIC MOTION CONTROLLER
function autoMoveTheNewShapeDownController(gameBoard, nextShape) {
  shapeArray = getActiveShapeObject(gameBoard);
  var newShapeArray = [];
  var myVar = setInterval(function() {
    var escapeVariable = false;
    var bottomSquares = getBottomSquaresOfTheShape(shapeArray);

    if (reachedTheBottom(bottomSquares))
        {
          escapeVariable = true;
        }
    else if (theresSomethingBelowBottomSquares(gameBoard, bottomSquares)  && bottomSquares[0].y_coord == 1)
        {
          gameOver(myVar);
        }
    else if (theresSomethingBelowBottomSquares(gameBoard, bottomSquares))
        {
          escapeVariable = true;
        }
    else if (!theresSomethingBelowBottomSquares(gameBoard, bottomSquares))
        {
          MoveDown(gameBoard, bottomSquares);
        };

    if(escapeVariable == true) {
      clearInterval(myVar);
      shapeToDisplay = nextShape;
      newShape(gameBoard);
    } else {
      populateDOM(gameBoard);
    }

  }, gameSpeed);
}


function userMoveTheShapeLeftController(gameBoard) {
  var leftmostSquares = getLeftmostSquaresOfShapeArray(shapeArray);
  // console.log(leftmostSquares);
  if (reachedTheLeftWall(leftmostSquares)) {
    //do nothing
  } else if (theresSomethingToTheLeft(gameBoard, leftmostSquares)) {
    //do nothing
  } else {
    MoveLeft(gameBoard);
  }
}

function userMoveTheShapeRightController(gameBoard) {
  var rightmostSquares = getRightmostSquaresOfShapeArray(shapeArray);
  // console.log(rightmostSquares);
  if (reachedTheRightWall(rightmostSquares)) {
    //do nothing
  } else if (theresSomethingToTheRight(gameBoard, rightmostSquares)) {
    //do nothing
  } else {
    MoveRight(gameBoard);
  }
}

function userMoveTheShapeDownController(gameBoard) {
  var bottomSquares = getBottomSquaresOfTheShape(shapeArray);
  // console.log(bottomSquares);
  if (reachedTheBottom(bottomSquares)) {
    //do nothing
  } else if (theresSomethingBelowBottomSquares(gameBoard, bottomSquares)) {
    //do nothing
  } else {
    MoveDown(gameBoard, bottomSquares);
  }
}
