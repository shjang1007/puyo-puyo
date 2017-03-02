import MovingPuyo from "./moving_puyo";

class Board {
  constructor(grid) {
    this.col = 6;
    this.row = 12;
    this.grid = grid ? grid : this.createNewGrid(this.col, this.row);
  }

  createNewGrid(col, row) {
    const defaultGrid = [];
    for (let i = 0; i < row; i++) {
      defaultGrid.push(new Array(col).fill(null));
    }

    return defaultGrid;
  }

  populateGrid(puyo) {
    this.grid[Math.floor(puyo.row)][puyo.col] = puyo;
  }

  posEmpty(col, row) {
    return !this.grid[row][col];
  }

  occupied(col, row) {
    return this.grid[row][col];
  }

  drawBoard(ctx) {
    for (let row = 0; row < this.row; row++) {
      for (let col = 0; col < this.col; col++) {
        if (this.occupied(col, row)) {
          ctx.beginPath();
          ctx.arc(col * 50 + 25, row * 50 + 25, 25, 0, Math.PI * 2);
          ctx.fillStyle = this.grid[row][col].color;
          ctx.fill();
          ctx.closePath();
        } else {
          ctx.fillStyle = "white";
          ctx.fillRect(col * 50, row * 50, 50, 50);
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(col * 50, row * 50, 50, 50);
      }
    }
  }
}

export default Board;
