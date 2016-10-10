'use strict';

var list = [9,8,7,6,5,4,3,2,1];
var counter =0;

function listAscending(list) {
  for (var i = 0; i < list.length -1 ; i++) {
    // console.log(list[i+1]);
    counter++;
    if(list[i] > list[i+1]) {
      return false;
    }
  }
  return true;
}

function order(list) {
  if(listAscending(list)) {
    console.log(counter);
    return list;
  } else {
    for (var j = 0; j < list.length - 1; j++) {
      counter++;
      if (list[j] > list[j+1]){
        list[j] += list[j+1];
        list[j+1] = list[j] - list[j+1];
        list[j] -= list[j+1];
      }
    }
    return order(list);
  }
}

console.log(order(list));
