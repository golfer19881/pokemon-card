let vStarX;
let vStarY;
let vStarWidth = 70;
let vStarHeight = 90;
let vStarColor = 255;

function setupVStar() {
  vStarX = width - vStarWidth - 20;
  vStarY = height - 3 * vStarHeight - 40;
}

function drawVStar() {
  fill(vStarColor);
  rect(vStarX, vStarY, vStarWidth, vStarHeight);
  fill(0);
  text('VStar', vStarX + vStarWidth / 2, vStarY + vStarHeight / 2);
}

function checkVStarClick() {
  if (mouseX > vStarX && mouseX < vStarX + vStarWidth && mouseY > vStarY && mouseY < vStarY + vStarHeight) {
    vStarColor = vStarColor == 255 ? 50 : 255;
    return true;
  } else {
    return false;
  }
}
