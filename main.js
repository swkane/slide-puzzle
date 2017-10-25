// establish a large board with width 400 x 400
let board = document.createElement('div');
board.id = 'board';
board.style.position = 'relative';
board.style.border = '1px solid black';
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

// solved pattern for background image
let solvedPicCol = [0, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1];
let solvedPicRow = [0, 0, 0, 0, 0, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1];

// actual data structure we will use
let picCol = [...solvedPicCol];
let picRow = [...solvedPicRow];

// establish array to keep track of order
let array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

function changePuzzle(e) {
  if (board.hasChildNodes()) {
    for (var i = 1; i < 16; i++) {
      board.removeChild(document.getElementById(i));
    }
    board.removeChild(document.getElementById('blank'));
  }
  if (e.target.id === 'random') {
    array = shuffle(array);
  } else if (e.target.id === 'solution') {
    array = solve(array);
    picCol = [...solvedPicCol];
    picRow = [...solvedPicRow];
  }
  for (var i = 1; i <= 16; i++) {
    let tile = document.createElement('div');
    tile.id = array[i];
    tile.className = 'tile';
    tile.style.left = col[i] * 100 + 'px';
    tile.style.top = row[i] * 100 + 'px';
    tile.style.transition = "left 0.5s, top 0.5s";
    board.appendChild(tile);
    if (array[i] == 16) {
      tile.id = 'blank';
    }
    if (array[i] !== 16) {
      tile.style.backgroundImage = 'url("gunther2.jpg")';
      tile.style.backgroundPosition = picCol[array[i]]*100+'px'+ " "+picRow[array[i]]*100+'px';
      tile.addEventListener('click', moveTile);
      // tile.textContent = array[i];
    }
  }
  // establishing the element to be used for moving tiles
  let blank = document.getElementById('blank');
}

function moveTile(e) {
  // adjust widthOfTile to assign value programmatically
  let widthOfTile = e.target.offsetWidth;
  // possibly replace with parseint
  let ex = parseInt(e.target.style.left, 10);
  let ey = parseInt(e.target.style.top, 10);
  let blankx = parseInt(blank.style.left, 10);
  let blanky = parseInt(blank.style.top, 10);
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

// beginning of the implementation of the shuffle move simulator
function shuffleSwapTile(id) {
  let tile = document.getElementById(id);
  let tilex = parseInt(tile.style.left, 10);
  let tiley = parseInt(tile.style.top, 10);
}

function shuffle(arr) {
  // remove 0 before randomizing
  arr.shift();
  var currentIndex = arr.length, temporaryValue, randomIndex;

  // while their remains elements to shuffle
  while (currentIndex !== 0) {
    // pick a remaining element
    randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex --;
    // and swap it with the current element
    temporaryValue = arr[currentIndex];
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
