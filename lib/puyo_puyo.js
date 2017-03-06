import Game from "./game";
import GameView from "./game_view";
import MovingPuyo from "./moving_puyos";


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("puyo-canvas");
  const ctx = canvasEl.getContext("2d");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  //
  // const MovingPuyo = new MovingPuyo(ctx);
  // document.addEventListener("keyup", MovingPuyo.handleKeyUp);
  //
  // setInterval(MovingPuyo.draw(ctx), 50);

  //  canvasBoard.width = Game.DIM_X;
  //  canvasBoard.height = Game.DIM_Y;
   const game = new Game();
   document.addEventListener("keydown", game.handleKeyDown);
   new GameView(game, ctx).play();
});
