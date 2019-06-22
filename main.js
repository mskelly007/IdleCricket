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

//I need to make the timer reset on buttonclick
//I found a thing called clearInterval which I think I just need to add into the throwBall function
//But everytime I add it into the function, throwBall stops working (i.e the button doesn't click anymore)