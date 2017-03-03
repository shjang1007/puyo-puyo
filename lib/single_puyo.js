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
    ctx.arc(col * 50 + 25, row * 50 + 25, 25, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
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

export default SinglePuyo;
