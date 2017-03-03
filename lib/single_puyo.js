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
      board.populateGrid(this);
    }
  }
}

export default SinglePuyo;
