button.addEventListener('click', main);
window.addEventListener('keydown', (event) => {
  var code = event.keyCode;
  if (code == leftAlpha || code == leftCursor) {
    userMoveTheShapeLeftController(gameBoard);
  } else if ((code == rightAlpha) || (code == rightCursor)) {
    userMoveTheShapeRightController(gameBoard);
  } else if ((code == downAlpha) || (code == downCursor)) {
    userMoveTheShapeDownController(gameBoard)
  } else if (code == rotate) {
    rotateShape();
  }
});
