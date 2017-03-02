// import Board from "./board";
// import MovingPuyo from "./movingPuyo";

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;

    this.play = this.play.bind(this);
  }

  play() {
    // const timeDelta = time - this.lastTime;
    this.game.step();
    this.game.draw(this.ctx);
    // this.lastTime = time;
    requestAnimationFrame(this.play);
  }
}

export default GameView;
