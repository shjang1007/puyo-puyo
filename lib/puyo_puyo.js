import Game from "./game";
import GameView from "./game_view";
import MovingPuyo from "./moving_puyos";


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("puyo-canvas");
  const nextPuyoCanvasEl = document.getElementById("next-puyo-canvas");

  const ctx = canvasEl.getContext("2d");
  const nextPuyoCtx = nextPuyoCanvasEl.getContext("2d");

  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  nextPuyoCanvasEl.width = 50;
  nextPuyoCanvasEl.height = 100;

  const game = new Game();
  document.addEventListener("keydown", game.handleKeyDown);

  const pauseButton = document.getElementById("pause-button");
  pauseButton.addEventListener("mousedown", game.togglePauseButton);

  const gameView = new GameView(game, ctx, nextPuyoCtx);
  gameView.play();

  const restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("mousedown", gameView.resetGame);
});
