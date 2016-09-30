button.addEventListener('click', main);
window.addEventListener('keydown', (event) => {
  // console.log(event.keyCode);
  var code = event.keyCode;
  if (code == leftAlpha || code == leftCursor) {
    MoveLeft(gameBoard);
  } else if ((code == rightAlpha) || (code == rightCursor)) {
    MoveRight(gameBoard);
  } else if ((code == downAlpha) || (code == downCursor)) {
    MoveDown(gameBoard);
  } else if (code == rotate) {
    console.log('rotate');
  }
});
