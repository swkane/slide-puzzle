// establish a large board with width 400 x 400
let board = document.createElement('div');
board.id = 'board';
board.style.position = 'relative';
// board.style.border = '1px solid black';
document.body.appendChild(board);

// create buttons
let solution = document.createElement('button');
solution.id = 'solution';
solution.textContent = 'Solution';
solution.addEventListener('click', changePuzzle);
document.body.appendChild(solution);

let random = document.createElement('button');
random.id = 'random';
random.textContent = 'Randomize';
random.addEventListener('click', changePuzzle);
document.body.appendChild(random);

// establish two arrays to keep track of rows and columns
let col = [0, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];
let row = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];

let array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

function changePuzzle(e) {
  if (board.hasChildNodes()) {
    console.log("Board needs to be replaced");
    for (var i = 1; i < 16; i++) {
      board.removeChild(document.getElementById(i));
    }
    board.removeChild(document.getElementById('blank'));
  } else {
    console.log("Board is being placed for the first time");
  }
  if (e.target.id === 'random') {
    array = shuffle(array);
    console.log(array);
  } else if (e.target.id === 'solution') {
    console.log(array);
    array = solve(array);
    console.log(array);
  }
  for (var i = 1; i <= 16; i++) {
    let tile = document.createElement('div');
    tile.id = array[i];
    tile.className = 'tile';
    tile.style.left = col[i] * 100 + 'px';
    tile.style.top = row[i] * 100 + 'px';
    board.appendChild(tile);
    if (array[i] == 16) {
      tile.id = 'blank';
    }
    if (array[i] !== 16) {
      tile.addEventListener('click', moveTile);
      tile.textContent = array[i];
    }
  }
  // establishing the element to be used for moving tiles
  let blank = document.getElementById('blank');
}


// let boardTiles = [
//   [00, 01, 02, 03],
//   [10, 11, 12, 13],
//   [20, 21, 22, 23],
//   [30, 31, 32, 33]
// ];

// Moving to a specific location
// function moveTile(e) {
//   let x = boardTiles[3][3].toString()[1] * 100;
//   ex = x + "px";
// }

function moveTile(e) {
  // adjust widthOfTile to assign value programmatically
  let widthOfTile = e.target.offsetWidth;
  // possibly replace with parseint
  let ex = Number(e.target.style.left.substring(0, e.target.style.left.length - 2));
  let ey = Number(e.target.style.top.substring(0, e.target.style.top.length - 2));
  let blankx = Number(blank.style.left.substring(0, blank.style.left.length - 2));
  let blanky = Number(blank.style.top.substring(0, blank.style.top.length - 2));
  if (Math.abs(ex - blankx) === widthOfTile && ey === blanky || Math.abs(ey - blanky) === widthOfTile && ex === blankx) {
    newBlankX = e.target.style.left;
    newBlankY = e.target.style.top;
    e.target.style.left = blank.style.left;
    e.target.style.top = blank.style.top;
    blank.style.left = newBlankX;
    blank.style.top = newBlankY;
  } else {
    console.log('You must click a tile next to the blank space to move it.');
  }
}

function shuffle(arr) {
  // remove 0 before randomizing
  arr.shift();
  var currentIndex = array.length, temporaryValue, randomIndex;

  // while their remains elements to shuffle
  while (currentIndex !== 0) {
    // pick a remaining element
    randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex --;

    // and swap it with the current element
    temporaryValue = array[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;

  }
  // put 0 back at the beginning
  arr.unshift(0);
  return arr;
}

function solve(arr) {
  arr.sort(function(a,b) {
    return a - b;
  });
  return arr;
}
