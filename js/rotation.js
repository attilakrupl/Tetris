function shapeIsHorizontal() {
  var xMax = shapeArray[0].x_coord;
  var xMin = shapeArray[0].x_coord;
  var yMax = shapeArray[0].y_coord;
  var yMin = shapeArray[0].y_coord;

  for (var i = 0; i < shapeArray.length; i++) {
    var actual = shapeArray[i];
    if (actual.x_coord > xMax) {
      xMax = actual.x_coord;
    } else if (actual.x_coord < xMin) {
      xMin = actual.x_coord;
    }

    if (actual.y_coord > yMax) {
      yMax = actual.y_coord;
    } else if (actual.y_coord < yMin) {
      yMin = actual.y_coord;
    }
  }

  if ((xMax - xMin) == (yMax - yMin)) {
    return true;
  } else if((xMax - xMin) >= 2) {
    return true;
  } else if ((yMax - yMin) >= 2) {
    return false;
  }

}

function rotateShape() {
  console.log(shapeIsHorizontal());
}
