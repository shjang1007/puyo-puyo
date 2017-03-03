class MovingPuyo {
  constructor() {
    const colors = ["yellow", "blue", "purple", "red", "green"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.col = 3;
    this.row = 0;
  }

  // Probably can refactor three methods below to one. Something to work on.
  moveDown() {
    this.row += 0.05;
  }

  // Does work, but when it's falling down, a bit iffy.
  moveRight(board) {
    if (this.col + 1 < board.col &&
        board.posEmpty(this.col + 1, Math.ceil(this.row))) {
      this.col += 1;
    }
  }

  moveLeft(board) {
    if (this.col > 0 &&
        board.posEmpty(this.col - 1, Math.ceil(this.row))) {
      this.col -= 1;
    }
  }

  reachedBottom(board) {
    return board.row === Math.floor(this.row) + 1 ||
      board.occupied(this.col, Math.floor(this.row) + 1);
  }

  drawPuyo(ctx) {
    ctx.beginPath();
    ctx.arc(this.col * 50 + 25, this.row * 50 + 25, 25, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    // ctx.beginPath();
    // ctx.rect(this.col * 50, this.row * 50 , 50, 50);
    // ctx.fillStyle = this.color;
    // ctx.fill();
    // ctx.closePath();
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

export default MovingPuyo;
