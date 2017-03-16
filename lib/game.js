import MovingPuyos from "./moving_puyos";
import Board from "./board";

class Game {
  constructor(ctx) {
    this.board = new Board();
    this.nextPuyos = new MovingPuyos();
    this.currentPuyos = null;
    this.ctx = ctx;
    this.paused = false;

    const button = document.getElementById("pause-button");
    button.addEventListener("click", this.togglePauseButton);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.togglePauseButton = this.togglePauseButton.bind(this);
  }

  gameOver(reqAnimationId) {
    if (this.board.occupied(3, 0)) {
      cancelAnimationFrame(reqAnimationId);
    }
  }

  step() {
    if (!this.paused) {
      if (!this.currentPuyos) {
        this.currentPuyos = new MovingPuyos();
      }

      const { mainPuyo, adjPuyo } = this.currentPuyos;
      this.currentPuyos.moveDown();

      // Right now, everytime we go through step, we are calling this.
      // Is this okay? Maybe only call this when ready?
      mainPuyo.markBoardUponLand(this.board);
      adjPuyo.markBoardUponLand(this.board);

      this.board.clearPuyos();
      this.board.dropToEmptyPos();
      if (mainPuyo.stop && adjPuyo.stop) {
        this.currentPuyos = this.nextPuyos;
        this.nextPuyos = new MovingPuyos();
      }
    }
  }

  togglePauseButton(e) {
    if (this.paused) {
      this.paused = false;
      $(e.target)
        .replaceWith('<i class="fa fa-pause-circle-o fa-fw fa-4x"></i>');
    } else {
      this.paused = true;
      $(e.target)
        .replaceWith('<i class="fa fa-play-circle-o fa-fw fa-4x"></i>');

    }
  }

  draw(ctx, nextPuyoCtx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.board.drawBoard(ctx);
    this.currentPuyos.drawPuyos(ctx);
    this.nextPuyos.drawNextPuyos(nextPuyoCtx);
  }

  handleKeyDown(e) {
    // If puyo landed or the game is paused, disable moves
    if (this.currentPuyos.disableMoves() || this.paused) return;

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

Game.DIM_X = 240;
Game.DIM_Y = 480;

export default Game;
