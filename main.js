var gameData = {
  overA: 0,
  overB: 0,
  bowlA: 0,
  bowlB: 0,
  runsA: 0,
  runsB: 0,
  outsA: 0,
  outsB: 0,
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

function clickThrowBall() {
    if (gameData.overB == 50){
        return;
    }
  throwBall();

  clearInterval(mainGameLoop);
  mainGameLoop = setInterval(throwBall,5000);
}

function throwBall() {
//defining the result of a bowl
/*
    var bowlResult: Math.random(),
    if (bowlResult <= .25){
        gameData.runsA ++
    }
    else {
        if (bowlresult >= .75) {
            gameData.outsA ++
        }
        else {
            return;
        }
    }
*/

//updating the current over count
    if (gameData.overA<50) {
        gameData.bowlA += gameData.bowlPerClick;

        if (gameData.bowlA > 5) {
            gameData.overA++;
            gameData.bowlA = 0;
        }

        var overCountA = gameData.overA + "." + gameData.bowlA;
        document.getElementById("overCountA").innerHTML = overCountA;

        document.getElementById("runsA").innerHTML = gameData.runsA;

        var crrA = gameData.runsA / (gameData.overA + (gameData.bowlA/6));
        document.getElementById("crrA").innerHTML = crrA;
    }
    else {
        gameData.bowlB += gameData.bowlPerClick;

        if (gameData.bowlB > 5) {
            gameData.overB++;
            gameData.bowlB = 0;
        }
        var overCountA = gameData.overB + "." + gameData.bowlB;
        document.getElementById("overCountB").innerHTML = overCountB;

        var crrA = gameData.runsB / (gameData.overB + (gameData.bowlB/6));
        document.getElementById("crrB").innerHTML = crrB;
    }

    if(gameData.overB == 50) {
        return;
    }
}

//Idle Functionality: throws one pitch every 5 seconds
var mainGameLoop = setInterval(throwBall,5000);

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
