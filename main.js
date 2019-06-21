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

//if bowl=6, gameData.over += 1, gameData.bowl -= 6
//else