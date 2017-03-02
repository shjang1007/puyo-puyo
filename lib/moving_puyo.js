class MovingPuyo {
  constructor() {
    const colors = ["yellow", "blue", "purple", "red", "green"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.col = 3;
    this.row = 0;
  }

  moveDown() {
    this.row += 0.05;
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
  //     if (this.rightPressed && x < 250 - ballRadius) {
  //       x += 5;
  //     } else if (this.leftPressed && x > ballRadius) {
  //       x += -5;
  //     }
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
  // handleKeyDown(e) {
  //     if (e.which === 39) {
  //     this.rightPressed = true;
  //   } else if (e.keyCode === 37) {
  //     this.leftPressed = true;
  //   }
  // }
  //
  // handleKeyUp(e) {
  //   if (e.keyCode === 39) {
  //     this.rightPressed = false;
  //   } else if (e.keyCode === 37) {
  //     this.leftPressed = false;
  //   }
  // }
}

export default MovingPuyo;
