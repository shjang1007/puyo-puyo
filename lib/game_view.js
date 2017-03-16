// import Board from "./board";
// import MovingPuyo from "./movingPuyo";

class GameView {
  constructor(game, ctx, nextPuyoCtx) {
    this.game = game;
    this.ctx = ctx;
    this.nextPuyoCtx = nextPuyoCtx;
    this.play = this.play.bind(this);
  }

  play() {
    this.game.step();
    this.game.draw(this.ctx, this.nextPuyoCtx);

    const gameStart = requestAnimationFrame(this.play);

    this.game.gameOver(gameStart);
  }
}

export default GameView;
