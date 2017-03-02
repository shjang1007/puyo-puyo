import MovingPiece from "./moving_piece";

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("puyo-canvas");
  const ctx = canvasEl.getContext("2d");

  let x = canvasEl.width / 2;
  let y = 50;
  let dx = 2;
  let dy = -2;;

  const movingPiece = new MovingPiece();
  setInterval(movingPiece.draw(ctx, x, y, dx, dy, canvasEl), 10);
});
