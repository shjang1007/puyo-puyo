import SinglePuyo from "./single_puyo";

class MovingPuyos {
  constructor() {
    this.mainPuyo = new SinglePuyo();
    this.adjPuyo = new SinglePuyo(this.mainPuyo.col, this.mainPuyo.row  - 1);
    this.pattern = 1;
  }

  // Probably can refactor two methods below to one. Something to work on.
  moveDown() {
    if (!this.mainPuyo.stop) {
      this.mainPuyo.row += 0.05;
    }
    if (!this.adjPuyo.stop) {
      this.adjPuyo.row += 0.05;
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

    if (this.nextMoveValid(col + nextPos, row, board)) {
      mainPuyo.col += nextPos;
      adjPuyo.col += nextPos;
    }
  }

  nextMoveValid(col, row, board) {
    const inBound = (col >= 0 && col < board.col) &&
                    (row < board.row);
    return (inBound && board.posEmpty(col, Math.ceil(row)));
  }

  rotate(board) {
    const { mainPuyo, adjPuyo } = this;
    const { col, row } = mainPuyo;

    // If either puyo lands, no more rotate;
    if (mainPuyo.stop || adjPuyo.stop) return;

    switch (this.pattern) {
      case 1:
        this.pattern = 2;
        if (this.nextMoveValid(col - 1, row, board)) {
          adjPuyo.col = col - 1;
          adjPuyo.row = row;
        } else if (col === 0) {
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
        } else if (col === board.col - 1) {
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

    // if (mainPuyo.row === adjPuyo.row) {
    //   if (mainPuyo.col > adjPuyo.col) {
    //     adjPuyo.col += 1;
    //     adjPuyo.row += 1;
    //   } else if (mainPuyo.col < adjPuyo.col) {
    //     adjPuyo.col -= 1;
    //     adjPuyo.row -= 1;
    //   }
    // } else if (mainPuyo.col === adjPuyo.col) {
    //   if (mainPuyo.row > adjPuyo.row) {
    //     adjPuyo.col -= 1;
    //     adjPuyo.row += 1;
    //   } else if (mainPuyo.row < adjPuyo.row) {
    //     adjPuyo.col += 1;
    //     adjPuyo.row -= 1;
    //   }
    // }
  }

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

  // handleKeyUp(e) {
  //   if (e.keyCode === 39) {
  //     this.rightPressed = false;
  //   } else if (e.keyCode === 37) {
  //     this.leftPressed = false;
  //   }
  // }

  // constructor(ctx) {
  //   const colors = ["yellow", "blue", "purple", "red", "green"];
  //   this.color = colors[Math.floor(Math.random() * colors.length)];
  //   this.ctx =ctx;
  //   this.rightPressed = false;
  //   this.leftPressed = false;
  //
  //   this.handleKeyDown = this.handleKeyDown.bind(this);
  //   this.handleKeyUp = this.handleKeyUp.bind(this);
  // }
  //
  // draw(ctx) {
  //   let ballRadius = 10;
  //   let x = 125;
  //   let y = 0;
  //
  //   let dy = 5;
  //
  //   return () => {
  //     ctx.clearRect(0, 0, 250, 500);
  //     this.drawBall(ctx, x, y);
  //
  //     if(y + dy > 500 - ballRadius) {
  //       dy = 0;
  //     }
  //

  //
  //     y += dy;
  //   };
  // }
  //
  // drawBall(ctx, x, y) {
  //   ctx.beginPath();
  //   ctx.arc(x, y, 10, 0, Math.PI * 2);
  //   ctx.fillStyle = this.color;
  //   ctx.fill();
  //   ctx.closePath();
  // }
  //

}

export default MovingPuyos;
