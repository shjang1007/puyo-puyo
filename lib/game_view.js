// import Board from "./board";
// import MovingPuyo from "./movingPuyo";

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;

    this.play = this.play.bind(this);
  }

  play() {
    this.game.step();
    this.game.draw(this.ctx);

    const gameStart = requestAnimationFrame(this.play);

    this.game.gameOver(gameStart);
  }
}

export default GameView;
