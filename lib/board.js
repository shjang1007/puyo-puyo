import MovingPuyos from "./moving_puyos";

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

export default Board;
