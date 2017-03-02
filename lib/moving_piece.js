class MovingPiece {
  constructor(ctx) {
    const colors = ["yellow", "blue", "purple", "red", "green"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.ctx =ctx;
    this.rightPressed = false;
    this.leftPressed = false;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  draw(ctx) {
    let ballRadius = 10;
    let x = 125;
    let y = 0;

    let dy = 5;

    return () => {
      ctx.clearRect(0, 0, 250, 500);
      this.drawBall(ctx, x, y);

      if(y + dy > 500 - ballRadius) {
        dy = 0;
      }

      if (this.rightPressed && x < 250 - ballRadius) {
        x += 5;
      } else if (this.leftPressed && x > ballRadius) {
        x += -5;
      }

      y += dy;
    };
  }

  drawBall(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  handleKeyDown(e) {
      if (e.which === 39) {
      this.rightPressed = true;
    } else if (e.keyCode === 37) {
      this.leftPressed = true;
    }
  }

  handleKeyUp(e) {
    if (e.keyCode === 39) {
      this.rightPressed = false;
    } else if (e.keyCode === 37) {
      this.leftPressed = false;
    }
  }
}

export default MovingPiece;
