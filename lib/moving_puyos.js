import SinglePuyo from "./single_puyo";

class MovingPuyos {
  constructor() {
    this.mainPuyo = new SinglePuyo();
    this.adjPuyo = new SinglePuyo(this.mainPuyo.col, this.mainPuyo.row  - 1);
    this.pattern = 1;
  }

  // Probably can refactor two methods below to one. Something to work on.
  moveDown() {
    let speed = 0.03;

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

  disableMoves() {
    const { mainPuyo, adjPuyo } = this;
    return (mainPuyo.stop || adjPuyo.stop);
  }
}

export default MovingPuyos;
