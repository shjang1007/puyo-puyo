// import Board from "./board";
// import MovingPuyo from "./movingPuyo";

class GameView {
  constructor(game, ctx, nextPuyoCtx) {
    this.game = game;
    this.ctx = ctx;
    this.nextPuyoCtx = nextPuyoCtx;
    this.start = false;
    this.gameStart = null;

    this.play = this.play.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  play() {
    this.game.step();
    this.game.draw(this.ctx, this.nextPuyoCtx);

    if (!this.game.over) {
      this.gameStart = requestAnimationFrame(this.play);
    }

    this.game.gameOver();
  }

  resetGame() {
    this.game.resetGame();

    cancelAnimationFrame(this.gameStart);
    this.play();
  }
}

export default GameView;
