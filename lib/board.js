import MovingPuyo from "./moving_puyo";

class Board {
  constructor(grid) {
    this.width = 6;
    this.height = 12;
    this.grid = grid ? grid : this.createNewGrid(this.width, this.height);
  }

  createNewGrid(width, height) {
    const defaultGrid = [];
    for (let i = 0; i < height; i++) {
      defaultGrid.push(new Array(width).fill(null));
    }

    return defaultGrid;
  }

  populateGrid(puyo) {
    this.grid[puyo.y][puyo.x] = puyo;
  }

  posEmpty(width, height) {
    return !this.grid[height][width];
  }

  occupied(width, height) {
    return this.grid[height][width];
  }

  drawBoard(ctx) {
    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        if (this.occupied(w, h)) {
          ctx.fillStyle = this.grid[h][w].color;
        } else {
          ctx.fillStyle = "white";
        }
        ctx.fillRect(w * 50, h * 50, 50, 50);
        ctx.strokeStyle = "green";
        ctx.strokeRect(w * 50, h * 50, 50, 50);
      }
    }
  }
}

export default Board;
