import MovingPuyo from "./moving_puyo";
import Board from "./board";

class Game {
  constructor(ctx) {
    this.board = new Board();
    this.currentPuyo = new MovingPuyo();
    this.ctx = ctx;
  }

  step() {
    this.currentPuyo.moveDown();
    if (this.currentPuyo.reachedBottom(this.board)) {
      this.board.populateGrid(this.currentPuyo);
      this.currentPuyo = new MovingPuyo();
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.board.drawBoard(ctx);
    this.currentPuyo.drawPuyo(ctx);
  }
}

Game.DIM_X = 300;
Game.DIM_Y = 600;

export default Game;
