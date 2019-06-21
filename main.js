var gameData = {
  over: 0,
  bowl: 0,
  bowlPerClick: 1
}

function throwBall() {
  gameData.bowl += gameData.bowlPerClick
document.getElementById("overCount").innerHTML = gameData.over + "." + gameData.bowl
}

//if bowl=6, gameData.over += 1, gameData.bowl -= 6
//else