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
