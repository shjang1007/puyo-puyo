import MovingPiece from "./moving_piece";

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("puyo-canvas");
  const ctx = canvasEl.getContext("2d");

  const movingPiece = new MovingPiece(ctx);

  document.addEventListener("keydown", movingPiece.handleKeyDown);
  document.addEventListener("keyup", movingPiece.handleKeyUp);

  setInterval(movingPiece.draw(ctx), 50);
});
