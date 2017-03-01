class MovingPiece {
  constructor(pos, vel, radius, color, game) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.game = game;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI
    );
    ctx.fill();
  }

  move(timeDelta) {

  }

  hitsBottom() {

  }
}

export default MovingPiece;
