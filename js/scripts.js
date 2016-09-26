"use strict";

for (var i = 0; i < (150); i++) {
  var new_div = document.createElement('div');
  new_div.classList.add('emptyDiv');
  var container = document.querySelector('.container');
  container.appendChild(new_div);
}
