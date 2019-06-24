var gameData = {
  overA: 0,
  overB: 0,
  bowlA: 0,
  bowlB: 0,
  runsA: 0,
  runsB: 0,
  outsA: 0,
  outsB: 0,
  bowlPerClick: 6
}

//generate 1000 players with various stats
/*
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
*/

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

function aHit() {
    var hitResult : Math.random(),
    if (0<hitResult<=.2){
        gameData.runsA +1;
    }
    if (.2<hitResult<=.4){
        gameData.runsA +2;
    }
    if (.4<hitResult<=.6){
        gameData.runsA +3;
    }
    if (.6<hitResult<=.8){
        gameData.runsA +4;
    }
    if (.8<hitResult<=1){
        gameData.runsA +1;
    }
}

function anOut() {

}

    var bowlResult: Math.random(),
    if (bowlResult <= .5){
        aHit();
    }
    else {
        if (bowlresult >= 1-(10/300)) {
        anOut();
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
        document.getElementById("outsA").innerHTML = gameData.outsA;

        var crrA = gameData.runsA / (gameData.overA + (gameData.bowlA/6));
        document.getElementById("crrA").innerHTML = crrA;

    }
    else {
        gameData.bowlB += gameData.bowlPerClick;

        if (gameData.bowlB > 5) {
            gameData.overB++;
            gameData.bowlB = 0;
        }
        var overCountB = gameData.overB + "." + gameData.bowlB;
        document.getElementById("overCountB").innerHTML = overCountB;

        var crrB = gameData.runsB / (gameData.overB + (gameData.bowlB/6));
        document.getElementById("crrB").innerHTML = crrB;

        var runsToWin = (gameData.runsA + 1);
        document.getElementById("runsToWin").innerHTML = runsToWin;

        var bowlsRemaining = (((49 - gameData.overB)*6)+(6-gameData.bowlB));
        document.getElementById("bowlsRemaining").innerHTML = bowlsRemaining;

        var rrrB = runsToWin / (bowlsRemaining/6);
        document.getElementById("rrrB").innerHTML = rrrB;

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
