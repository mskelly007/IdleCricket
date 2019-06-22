var gameData = {
  over: 0,
  bowl: 0,
  bowlPerClick: 1
}

function throwBall() {
  gameData.bowl += gameData.bowlPerClick;

  if (gameData.bowl > 5) {
    gameData.over++;
    gameData.bowl = 0;
  }

  document.getElementById("overCount").innerHTML = gameData.over + "." + gameData.bowl;
}

var mainGameLoop = window.setInterval(function() {
  throwBall()
}, 5000)