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

  const game = new Game(ctx);
  document.addEventListener("keydown", game.handleKeyDown);

  const pauseButton = document.getElementById("pause-button");
  pauseButton.addEventListener("mousedown", game.togglePauseButton);

  const gameView = new GameView(game, ctx, nextPuyoCtx);

  // Add event listener to close modal and start the game
  document.addEventListener("keydown", (e) => {
    if (!gameView.start && e.which === 13) {
      document.getElementById("modal-container").style.display = "none";
      gameView.start = true;
      gameView.play();
      document.getElementById("bgm").play();
    } else if (game.over && e.which === 13) {
      document.getElementById("modal-container").style.display = "none";
      gameView.resetGame();

      document.getElementById("game-over-music").pause();
      document.getElementById("game-over-music").currentTime = 0;

      if (document.getElementById("sound-icon").className.includes("off")) {
        document.getElementById("bgm").play();
      }
    }
  });

  // gameView.play();

  const restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("mousedown", gameView.resetGame);
});
