var gameData = {
  overA: 0,
  overB: 0,
  bowlA: 0,
  bowlB: 0,
  runsA: 200,
  runsB: 0,
  bowlPerClick: 1
}

function generatePlayers() {
    var players = [{}];

    for (i = 0; i < 1000; i++) {        
        var player = {
            pitchModifier: Math.random(),
            runModifier: Math.random(),
            //position: Math.random(['Pitcher','Catcher','Etc']),
        };

        players.push(
            player
        );
    }
    
    console.log(players);
}

//I broke the click aspect out into it's own function so you could reset the timer of the main function.
function clickThrowBall() {
    if (gameData.overB == 50){
        return;
    }
  throwBall();

  clearInterval(mainGameLoop);
  mainGameLoop = setInterval(throwBall,5000);
}

function throwBall() {
    if (gameData.overA>=50) {
        gameData.bowlB += gameData.bowlPerClick;

        if (gameData.bowlB > 5) {
            gameData.overB++;
            gameData.bowlB = 0;
        }

        document.getElementById("overCountB").innerHTML = gameData.overB + "." + gameData.bowlB;
        document.getElementById("crrB").innerHTML = gameData.runsB / gameData.overB;
    } else {
        gameData.bowlA += gameData.bowlPerClick;

        if (gameData.bowlA > 5) {
            gameData.overA++;
            gameData.bowlA = 0;
        }

        var overCountA = gameData.overA + "." + gameData.bowlA;
        document.getElementById("overCountA").innerHTML = overCountA;

        var crrA = gameData.runsA / (gameData.overA + (gameData.bowlA/6));
        document.getElementById("crrA").innerHTML = crrA;
    }
    
}

//var mainGameLoop = window.setInterval(function() {
//  throwBall()
//}, 5000)

//I also simplified the above to
//Instead of creating a new function that calls throwball() every 5 seconds, just run throwBall every 5 seconds.
var mainGameLoop = setInterval(throwBall,5000);



//I need to make the timer reset on buttonclick
//I found a thing called clearInterval which I think I just need to add into the throwBall function
//But everytime I add it into the function, throwBall stops working (i.e the button doesn't click anymore)




/*
I would think about this:
Many things on the screen will be updating at different intervals.
Instead of keeping track of multiple different intervals, clearing intervals, changing intervals,
I would create a single repeating function called something like tick()
Have tick() run 10x a second, and call anything else you need from there.
maybe keep a timeSinceLastPitch variable, start it at 0
every tick() loop, add 0.1 to it, then check if it's >= 5 every tick. if so, call throwball and reset to 0
this should let you be a little more flexible, and more easily change the speed at which things happen.

-Chris
*/