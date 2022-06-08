let TOP = topWall.getBoundingClientRect().height;

let BOTTOM =
  leftWall.getBoundingClientRect().height -
  bottomWall.getBoundingClientRect().height;
let RIGHT = topWall.getBoundingClientRect().width;
let LEFT = leftWall.getBoundingClientRect().width;

let lose_rect = document.querySelector(".lose");

document.addEventListener("keydown", keyDownBita);
document.addEventListener("keyup", keyUpBita);

let score_points_element = document.querySelector(".score__value");
let score = 0;
score_points_element.innerHTML = score;

let vx = 1,
  vy = 1;
let ballStyle = ball.getBoundingClientRect();
let BW = ballStyle.width / 2;
let posX = ballStyle.left + BW,
  posY = ballStyle.top + BW;

let bStyle = bita.getBoundingClientRect();
let WBITA = bStyle.width;
let HBITA = bStyle.height;
let posBitaY = bStyle.top;
let vBita = 1;

// let idGo = setInterval(go, 1000 / 50);

let keyUp = 38;
let keyDown = 40;

let keyUpState = false;
let keyDownState = false;

let step_per_frame = 0;

function keyDownBita(event) {
  if (event.keyCode == keyUp) {
    keyUpState = true;
  }

  if (event.keyCode == keyDown) {
    keyDownState = true;
  }
}

function keyUpBita(event) {
  if (event.keyCode == keyUp) {
    keyUpState = false;
  }

  if (event.keyCode == keyDown) {
    keyDownState = false;
  }
}

let speed = 15;

let start,
  previousTimeStamp = 0;
function sync_with_refreshrate(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }

  step_per_frame = speed / (timestamp - previousTimeStamp);

  let stBita = bita.getBoundingClientRect();
  posX += vx * step_per_frame;
  posY += vy * step_per_frame;

  //шар ударился о левую границу
  if (posX - BW < LEFT) {
    posX = LEFT + BW;
    vx = -vx;
  }

  //шар ударился о верхнюю границу
  if (posY - BW < TOP) {
    posY = TOP + BW;
    vy = -vy;
  }

  //шар ударился о нижнюю границу
  if (posY + BW > BOTTOM) {
    posY = BOTTOM - BW;
    vy = -vy;
  }

  //шар ударился о биту
  if (posX + BW > RIGHT - WBITA) {
    if (posY >= stBita.top && posY <= stBita.top + stBita.height) {
      posX = RIGHT - WBITA - BW;
      vx = -vx;
      score += 1;
      score_points_element.innerHTML = score;
    }
  }

  ball.style.top = posY + "px";
  ball.style.left = posX + "px";

  //шар ударился о правую границу
  if (posX + BW > RIGHT) {
    document.removeEventListener("keydown", keyDownBita);
    document.removeEventListener("keyup", keyUpBita);
    lose_rect.toggleAttribute("hidden");
    // alert("Вы проиграли");

    return;
  }

  //обработка движения биты
  if (keyUpState == true) {
    posBitaY -= vBita * step_per_frame;
  }

  if (keyDownState == true) {
    posBitaY += vBita * step_per_frame;
  }

  if (posBitaY < TOP) posBitaY = TOP;
  if (posBitaY + HBITA > BOTTOM) posBitaY = BOTTOM - HBITA;
  bita.style.top = posBitaY + "px";

  // console.log(timestamp - previousTimeStamp);

  previousTimeStamp = timestamp;

  window.requestAnimationFrame(sync_with_refreshrate);
}

window.requestAnimationFrame(sync_with_refreshrate);
