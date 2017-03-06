import MovingPuyos from "./moving_puyos";
import Board from "./board";

class Game {
  constructor(ctx) {
    this.board = new Board();
    this.currentPuyos = new MovingPuyos();
    this.ctx = ctx;

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  gameOver(reqAnimationId) {
    if (this.board.occupied(3, 0)) {
      cancelAnimationFrame(reqAnimationId);
    }
  }

  step() {
    const { mainPuyo, adjPuyo } = this.currentPuyos;
    this.currentPuyos.moveDown();

    // Right now, everytime we go through step, we are calling this.
    // Is this okay? Maybe only call this when ready?
    mainPuyo.markBoardUponLand(this.board);
    adjPuyo.markBoardUponLand(this.board);
    this.board.clearPuyos();
    this.board.dropToEmptyPos();
    if (mainPuyo.stop && adjPuyo.stop) {
      this.currentPuyos = new MovingPuyos();
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.board.drawBoard(ctx);
    this.currentPuyos.drawPuyos(ctx);
  }

  handleKeyDown(e) {
    if (e.which === 39) {
      this.currentPuyos.move("right", this.board);
    } else if (e.which === 37) {
      this.currentPuyos.move("left", this.board);
    } else if (e.which === 32) {
      this.currentPuyos.rotate(this.board);
    } else if (e.which === 40) {
      this.currentPuyos.quickDrop(this.board);
    }
  }
}

Game.DIM_X = 300;
Game.DIM_Y = 600;

export default Game;
