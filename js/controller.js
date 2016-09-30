//AUTOMATIC MOTION CONTROLLER
function autoMoveTheNewShapeDown(gameBoard, nextShape) {
  shapeArray = getActiveShapeObject(gameBoard);

  var myVar = setInterval(function() {
    var escapeVariable = false;
    var bottomSquares = getBottomSquaresOfTheShape(shapeArray);

    if (reachedTheBottom(bottomSquares))
        {
          escapeVariable = true;
        }
    else if (!theresNothingBelowBottomSquares(gameBoard, bottomSquares)  && bottomSquares[0].y_coord == 1)
        {
          gameOver(myVar);
        }
    else if (!theresNothingBelowBottomSquares(gameBoard, bottomSquares))
        {
          escapeVariable = true;
        }
    else if (theresNothingBelowBottomSquares(gameBoard, bottomSquares))
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
