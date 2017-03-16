/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__single_puyo__ = __webpack_require__(4);


class MovingPuyos {
  constructor() {
    this.mainPuyo = new __WEBPACK_IMPORTED_MODULE_0__single_puyo__["a" /* default */]();
    this.adjPuyo = new __WEBPACK_IMPORTED_MODULE_0__single_puyo__["a" /* default */](this.mainPuyo.col, this.mainPuyo.row  - 1);
    this.pattern = 1;
  }

  // Probably can refactor two methods below to one. Something to work on.
  moveDown(speed) {
    if (!this.mainPuyo.stop) {
      this.mainPuyo.row += speed;
    } else {
      this.adjPuyo.row += 0.15;
    }
    if (!this.adjPuyo.stop) {
      this.adjPuyo.row += speed;
    } else {
      this.mainPuyo.row += 0.15;
    }
  }

  move(direction, board) {
    const { mainPuyo, adjPuyo } = this;
    let { col, row } = mainPuyo.col <= adjPuyo.col ? mainPuyo : adjPuyo;
    let nextPos = -1;
    let inBound = (col > 0);

    if (direction === "right") {
      const puyo = mainPuyo.col <= adjPuyo.col ? adjPuyo : mainPuyo;
      col = puyo.col;
      row = puyo.row;
      nextPos = 1;
      inBound = (col + nextPos < board.col);
    }

    if ((row < 0 && col < board.col - 1 && col > 0) ||
        this.nextMoveValid(col + nextPos, row, board)) {
      mainPuyo.col += nextPos;
      adjPuyo.col += nextPos;
    }
  }

  nextMoveValid(col, row, board) {
    const inBound = (col >= 0 && col < board.col) && (row < board.row);
    return (inBound && board.posEmpty(col, Math.ceil(row)));
  }

  rotate(board) {
    const { mainPuyo, adjPuyo } = this;
    const { col, row } = mainPuyo;

    // Handle edge case where both side is occupied.
    if (!this.nextMoveValid(col - 1, Math.ceil(row) ,board) &&
        !this.nextMoveValid(col + 1, Math.ceil(row), board)) {
      return;
    }

    // Case statements to handle 4 types of rotations
    switch (this.pattern) {
      case 1:
        this.pattern = 2;
        if (this.nextMoveValid(col - 1, row, board)) {
          adjPuyo.col = col - 1;
          adjPuyo.row = row;
        } else if (col === 0 ||
                  !board.posEmpty(col - 1, Math.ceil(row))) {
          adjPuyo.row = row;
          mainPuyo.col += 1;
        }
        break;
      case 2:
        this.pattern = 3;
        if (this.nextMoveValid(col, row + 1, board)) {
          adjPuyo.col = mainPuyo.col;
          adjPuyo.row = mainPuyo.row + 1;
        }
        break;
      case 3:
        this.pattern = 4;
        if (this.nextMoveValid(col + 1, row, board)) {
          adjPuyo.col = mainPuyo.col + 1;
          adjPuyo.row = mainPuyo.row;
        } else if (col === board.col - 1 ||
                  !board.posEmpty(col + 1, Math.ceil(row))) {
          adjPuyo.row = row;
          mainPuyo.col -= 1;
        }
        break;
      case 4:
        this.pattern = 1;
        if (this.nextMoveValid(col, row - 1, board)) {
          adjPuyo.col = mainPuyo.col;
          adjPuyo.row = mainPuyo.row - 1;
        }
        break;
      default:
        break;
    }
  }

  // Find the most bottom open space, and drops puyos to those spots
  quickDrop(board) {
    const { mainPuyo, adjPuyo } = this;

    if (mainPuyo.col === adjPuyo.col) {
      const bottomPuyo = mainPuyo.row > adjPuyo.row ? mainPuyo : adjPuyo;
      const topPuyo = bottomPuyo === mainPuyo ? adjPuyo: mainPuyo;
      bottomPuyo.row = board.openBottomRow(bottomPuyo.col);
      topPuyo.row = bottomPuyo.row - 1;
    } else {
      this.mainPuyo.row = board.openBottomRow(mainPuyo.col);
      this.adjPuyo.row = board.openBottomRow(adjPuyo.col);
    }
  }

  drawPuyos(ctx) {
    this.mainPuyo.drawPuyo(ctx);
    this.adjPuyo.drawPuyo(ctx);
  }

  drawNextPuyos(nextPuyoCtx) {
    this.mainPuyo.drawNextPuyo(nextPuyoCtx, 25, 30, this.mainPuyo.color);
    this.adjPuyo.drawNextPuyo(nextPuyoCtx, 25, 70, this.adjPuyo.color);
  }

  disableMoves() {
    const { mainPuyo, adjPuyo } = this;
    return (mainPuyo.stop || adjPuyo.stop);
  }
}

/* harmony default export */ __webpack_exports__["a"] = MovingPuyos;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_puyos__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board__ = __webpack_require__(3);



class Game {
  constructor(ctx) {
    this.board = new __WEBPACK_IMPORTED_MODULE_1__board__["a" /* default */]();
    this.nextPuyos = new __WEBPACK_IMPORTED_MODULE_0__moving_puyos__["a" /* default */]();
    this.currentPuyos = null;
    this.ctx = ctx;
    this.paused = false;
    this.over = false;
    this.speed = 0.03;

    const button = document.getElementById("pause-button");
    button.addEventListener("click", this.togglePauseButton);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.togglePauseButton = this.togglePauseButton.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
  }

  gameOver() {
    const { ctx } = this;
    if (this.board.occupied(3, 0)) {
      this.over = true;
      ctx.fillStyle = "orange";
      ctx.font = "36px Arial";
      ctx.fillText("GAME OVER", 10, Game.DIM_Y / 2);
    }
  }

  resetGame() {
    this.board = new __WEBPACK_IMPORTED_MODULE_1__board__["a" /* default */]();
    this.currentPuyos = new __WEBPACK_IMPORTED_MODULE_0__moving_puyos__["a" /* default */]();
    this.nextPuyos = new __WEBPACK_IMPORTED_MODULE_0__moving_puyos__["a" /* default */]();
    this.over = false;
    this.speed = 0.03;
  }

  step() {
    document.getElementById("score").innerHTML = this.board.score;
    if (!this.paused) {
      if (!this.currentPuyos) {
        this.currentPuyos = new __WEBPACK_IMPORTED_MODULE_0__moving_puyos__["a" /* default */]();
      }

      const { mainPuyo, adjPuyo } = this.currentPuyos;
      if (this.speed < 0.13) {
        this.speed += 0.00005;
      }

      this.currentPuyos.moveDown(this.speed);

      // Right now, everytime we go through step, we are calling this.
      // Is this okay? Maybe only call this when ready?
      mainPuyo.markBoardUponLand(this.board);
      adjPuyo.markBoardUponLand(this.board);

      this.board.clearPuyos();
      this.board.dropToEmptyPos();
      if (mainPuyo.stop && adjPuyo.stop) {
        this.currentPuyos = this.nextPuyos;
        this.nextPuyos = new __WEBPACK_IMPORTED_MODULE_0__moving_puyos__["a" /* default */]();
      }
    }
  }

  togglePauseButton(e) {
    if (this.paused) {
      this.paused = false;
      $(e.target)
        .replaceWith('<i class="fa fa-pause-circle-o fa-fw fa-4x"></i>');
    } else {
      this.paused = true;
      $(e.target)
        .replaceWith('<i class="fa fa-play-circle-o fa-fw fa-4x"></i>');

    }
  }

  draw(ctx, nextPuyoCtx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.board.drawBoard(ctx);
    this.currentPuyos.drawPuyos(ctx);
    this.nextPuyos.drawNextPuyos(nextPuyoCtx);
  }

  handleKeyDown(e) {
    // If puyo landed or the game is paused, disable moves
    if (this.currentPuyos.disableMoves() || this.paused) return;

    if (e.which === 39) {
      this.currentPuyos.move("right", this.board);
    } else if (e.which === 37) {
      this.currentPuyos.move("left", this.board);
    } else if (e.which === 32) {
      this.currentPuyos.rotate(this.board);
    } else if (e.which === 40) {
      this.currentPuyos.quickDrop(this.board);
    }
  }
}

Game.DIM_X = 240;
Game.DIM_Y = 480;

/* harmony default export */ __webpack_exports__["a"] = Game;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// import Board from "./board";
// import MovingPuyo from "./movingPuyo";

class GameView {
  constructor(game, ctx, nextPuyoCtx) {
    this.game = game;
    this.ctx = ctx;
    this.nextPuyoCtx = nextPuyoCtx;
    this.gameStart = null;

    this.play = this.play.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  play() {
    this.game.step();
    this.game.draw(this.ctx, this.nextPuyoCtx);

    if (!this.game.over) {
      this.gameStart = requestAnimationFrame(this.play);
    }

    this.game.gameOver();
  }

  resetGame() {
    this.game.resetGame();

    cancelAnimationFrame(this.gameStart);
    this.play();
  }
}

/* harmony default export */ __webpack_exports__["a"] = GameView;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_puyos__ = __webpack_require__(0);


class Board {
  constructor(grid) {
    this.col = 6;
    this.row = 12;
    this.grid = grid ? grid : this.createNewGrid(this.col, this.row);
    this.puyos = [];
    this.score = 0;
  }

  createNewGrid(col, row) {
    const defaultGrid = [];
    for (let i = 0; i < row; i++) {
      defaultGrid.push(new Array(col).fill(null));
    }

    return defaultGrid;
  }

  populateGrid(puyo) {
    this.grid[puyo.row][puyo.col] = puyo;
  }

  posEmpty(col, row) {
    return !this.grid[row][col];
  }

  occupied(col, row) {
    return this.grid[row][col];
  }

  openBottomRow(col) {
    let unoccupiedBottom;
    for (let row = 0; row < this.row; row++) {
      if (!this.grid[row][col]) {
        unoccupiedBottom = row;
      } else {
        return unoccupiedBottom;
      }
    }
    return unoccupiedBottom;
  }

  //this method is too long brian!
  drawBoard(ctx) {
    for (let row = 0; row < this.row; row++) {
      for (let col = 0; col < this.col; col++) {
        if (this.occupied(col, row)) {
          ctx.beginPath();

          const radialGradient = ctx.createRadialGradient(col * 40 + 18,
                                                          row * 40 + 18,
                                                          1,
                                                          col * 40 + 20,
                                                          row * 40 + 20,
                                                          20);
          radialGradient.addColorStop(0, "white");
          radialGradient.addColorStop(1, this.grid[row][col].color);

          ctx.arc(col * 40 + 20, row * 40 + 20, 20, 0, Math.PI * 2);
          ctx.fillStyle = radialGradient;
          ctx.fill();
          ctx.closePath();
        } else {
          ctx.fillStyle = "white";
          ctx.fillRect(col * 40, row * 40, 40, 40);
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.22;
        ctx.strokeRect(col * 40, row * 40, 40, 40);
      }
    }
  }

  addPuyos(puyo) {
    this.puyos.push(puyo);
  }

// Can add Callback function for inside while loop
  clearPuyos() {
    this.puyos.forEach((puyo) => {
      let count = 1;
      let queue = [puyo];
      let puyoToDestroy = [puyo];
      let el;
      while (queue.length > 0) {
        el = queue.shift();
        el.neighbors(this).forEach( (pos) => {
          const neighbor = this.grid[pos[1]][pos[0]]
          if (neighbor &&
              el.color === neighbor.color &&
              !puyoToDestroy.includes(neighbor)) {
            count += 1;
            queue.push(neighbor);
            puyoToDestroy.push(neighbor);
          }
        });
      }

      if (count >= 4) {
        this.score += puyoToDestroy.length * 10;

        puyoToDestroy.forEach((puyoToDelete) => {
          this.grid[puyoToDelete.row][puyoToDelete.col] = null;
          const idx = this.puyos.indexOf(puyoToDelete);
          this.puyos.splice(idx, 1);
        });
      }
    });
  }

  dropToEmptyPos() {
    let clearPuyos = false;

    this.puyos.forEach( (puyo) => {
      const { row, col } = puyo;
      // For puyo already on the bottom, don't bother checking
      if (row === this.row - 1) return;

      // if puyo's below space is null, then shift the column one down
      if (!this.grid[row + 1][col]) {
        clearPuyos = true;
        for (let i = row; i > 0; i--) {
          // If the grid is occupied, then
          // reset the puyo's row to reflect the shift in position
          if (this.grid[i][col]) {
            const currentPuyo = this.grid[i][col];
            currentPuyo.row = i + 1;
          }
          this.grid[i + 1][col] = this.grid[i][col];
        }
        this.grid[0][col] = null;
      }
    });
    this.puyos.forEach( (puyo) => {
      const { row, col } = puyo;
      // For puyo already on the bottom, don't bother checking
      if (row === this.row - 1) return;

      // if puyo's below space is null, then shift the column one down
      if (!this.grid[row + 1][col]) {
        clearPuyos = false;
        for (let i = row; i > 0; i--) {
          // If the grid is occupied, then
          // reset the puyo's row to reflect the shift in position
          if (this.grid[i][col]) {
            const currentPuyo = this.grid[i][col];
            currentPuyo.row = i + 1;
          }
          this.grid[i + 1][col] = this.grid[i][col];
        }
        this.grid[0][col] = null;
      }
    });
    this.clearPuyos();

    if (clearPuyos) {
      this.dropToEmptyPos();
    }
  }

  resetBoardAndScore() {
    this.createNewGrid(this.col, this.row);
    this.score = 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = Board;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SinglePuyo {
  constructor(col = 3, row = -1) {
    const colors = ["yellow", "blue", "purple", "red", "green"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.col = col;
    this.row = row;
    this.stop = false;
  }

  drawPuyo(ctx) {
    const { row, col, color } = this;
    ctx.beginPath();

    const radialGradient = ctx.createRadialGradient(col * 40 + 18,
                                                    row * 40 + 18,
                                                    1,
                                                    col * 40 + 20,
                                                    row * 40 + 20,
                                                    20);
    radialGradient.addColorStop(0, "white");
    radialGradient.addColorStop(1, color);


    ctx.arc(col * 40 + 20, row * 40 + 20, 20, 0, Math.PI * 2);
    ctx.fillStyle = radialGradient;
    ctx.fill();
    ctx.closePath();
  }

  drawNextPuyo(nextPuyoCtx, x, y, color) {
    nextPuyoCtx.beginPath();

    const radialGradient = nextPuyoCtx.createRadialGradient(x - 4,
                                                            y - 4,
                                                            1,
                                                            x - 2,
                                                            y - 2,
                                                            20);

    radialGradient.addColorStop(0, "white");
    radialGradient.addColorStop(1, color);


    nextPuyoCtx.arc(x, y, 20, 0, Math.PI * 2);
    nextPuyoCtx.fillStyle = radialGradient;
    nextPuyoCtx.fill();
    nextPuyoCtx.closePath();
  }

  reachedBottom(board) {
    if (Math.floor(this.row) < 0) {return false;}

    return board.row === Math.floor(this.row) + 1 ||
      board.occupied(this.col, Math.floor(this.row) + 1);
  }

  markBoardUponLand(board) {
    if (this.reachedBottom(board)) {
      this.stop = true;
      // Round down to make row an integer instead of decimal
      this.row = Math.floor(this.row);

      board.populateGrid(this);
      board.addPuyos(this);
    }
  }

  neighbors(board) {
    const { col, row } = this;
    let neighborPos = [];

    if (row > 0) {
      neighborPos.push([col, row - 1]);
    }

    if (col > 0) {
      neighborPos.push([col - 1, row]);
    }

    if (row < board.row - 1) {
      neighborPos.push([col, row + 1]);
    }

    if (col < board.col - 1) {
      neighborPos.push([col + 1, row]);
    }

    return neighborPos;
  }
}

/* harmony default export */ __webpack_exports__["a"] = SinglePuyo;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__moving_puyos__ = __webpack_require__(0);





document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("puyo-canvas");
  const nextPuyoCanvasEl = document.getElementById("next-puyo-canvas");

  const ctx = canvasEl.getContext("2d");
  const nextPuyoCtx = nextPuyoCanvasEl.getContext("2d");

  canvasEl.width = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_X;
  canvasEl.height = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_Y;

  nextPuyoCanvasEl.width = 50;
  nextPuyoCanvasEl.height = 100;

  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](ctx);
  document.addEventListener("keydown", game.handleKeyDown);

  const pauseButton = document.getElementById("pause-button");
  pauseButton.addEventListener("mousedown", game.togglePauseButton);

  const gameView = new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, ctx, nextPuyoCtx);
  gameView.play();

  const restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("mousedown", gameView.resetGame);
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map