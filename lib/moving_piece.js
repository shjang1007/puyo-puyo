class MovingPiece {
  constructor() {

  }

  draw(ctx, x, y, dx, dy, canvasEl) {
    let ballRadius = 10;

    return () => {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      this.drawBall(ctx, x, y, ballRadius);

      if(x + dx > canvasEl.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if(y + dy > canvasEl.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
      }

      x += dx;
      y += dy;
    };
  }

  drawBall(ctx, x, y, ballRadius) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  move(timeDelta) {

  }

  hitsBottom() {

  }
}

export default MovingPiece;
