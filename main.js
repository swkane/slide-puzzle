// establish a large board with width 400 x 400
let board = document.createElement('div');
board.id = 'board';
board.style.position = 'relative';
document.body.appendChild(board);

// establish two arrays to keep track of rows and columns
let col = [0, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];
let row = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];

for (var i = 1; i <= 16; i++) {
  let tile = document.createElement('div');
  tile.id = i;
  tile.className = 'tile';
  tile.style.left = col[i] * 100 + 'px';
  tile.style.top = row[i] * 100 + 'px';
  board.appendChild(tile);
  if (i == 16) {
    tile.id = 'blank';
    break;
  }
  tile.addEventListener('click', moveTile);
  tile.textContent = i;
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

let blank = document.getElementById('blank');
function moveTile(e) {
  // adjust widthOfTile to assign value programmatically
  let widthOfTile = e.target.offsetWidth;
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

// write a function that randomizes the board

// write a while loop that checks for a win condition
