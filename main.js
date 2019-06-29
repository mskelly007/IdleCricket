var gameData = {
  gameNumber: 0,
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

//update the screen with gameData
function screenUpdate() {
    //Team A Stats
        var overCountA = gameData.overA + "." + gameData.bowlA;
        document.getElementById("overCountA").innerHTML = overCountA;

        document.getElementById("runsA").innerHTML = gameData.runsA;
        document.getElementById("outsA").innerHTML = gameData.outsA;

        var crrA = gameData.runsA / (gameData.overA + (gameData.bowlA/6));
        document.getElementById("crrA").innerHTML = crrA.toFixed(2);

    //Team B Stats
        var overCountB = gameData.overB + "." + gameData.bowlB;
        document.getElementById("overCountB").innerHTML = overCountB;

        document.getElementById("runsB").innerHTML = gameData.runsB;
        document.getElementById("outsB").innerHTML = gameData.outsB;

        var crrB = gameData.runsB / (gameData.overB + (gameData.bowlB/6));
        document.getElementById("crrB").innerHTML = crrB.toFixed(2);

        var runsToWin = (gameData.runsA + 1)-gameData.runsB;
        document.getElementById("runsToWin").innerHTML = runsToWin;

        var bowlsRemaining = (((49 - gameData.overB)*6)+(6-gameData.bowlB));
        document.getElementById("bowlsRemaining").innerHTML = bowlsRemaining;

        var rrrB = runsToWin / (bowlsRemaining/6);
        document.getElementById("rrrB").innerHTML = rrrB.toFixed(2);


}

//load the game
function loadGame(){
    if (localStorage.getItem('CricketSave')){
        gameData = JSON.parse(localStorage.getItem('CricketSave'));
    }
    else {
        newGame();
    }
    document.getElementById("gameNumber").innerHTML = gameData.gameNumber;
    changeSpeed();
    throwBall();
}

//saving the game
function saveGame(){
    localStorage.setItem('CricketSave', JSON.stringify(gameData));
}

//deleting the saved gameData
function deleteSave(){
    localStorage.removeItem('CricketSave');
    location.reload();
}

//load game on window start-up
window.onload = loadGame;

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

    throwBall();

    clearInterval(mainGameLoop);
    mainGameLoop = setInterval(throwBall,5000);
}

function hit() {
    var runs = 0;
    var hitResult = Math.random();
    if (0<hitResult&&hitResult<=(10/300)){
        runs = 6;
    }
    if ((10/300)<hitResult&&hitResult<=(70/300)){
        runs = 4;
    }
    if ((70/300)<hitResult&&hitResult<=(75/300)){
        runs = 3;
    }
    if ((75/300)<hitResult&&hitResult<=(100/300)){
        runs = 2;
    }
    if ((100/300)<hitResult&&hitResult<=1){
        runs = 1;
    }
    return runs;
}

//this function will eventually be filled out and used to award different types of outs for stats purposes for players
/*
function anOut() {
    gameData.outs
}

*/

function throwBall() {
    if (gameData.overB == 50){
        declareWinner();
        return;
    }

    if(gameData.outsB ==  10){
        declareWinner();
        return;
    }

    if(gameData.runsB>gameData.runsA){
        declareWinner();
        return;
    }

    var currentTeam = gameData.overA<50 ? "A" : "B";
    var runs = 0;
    var outs = 0;

//defining the result of a bowl
    var bowlResult = Math.random();
    if (bowlResult <= .5){
        runs = hit();
    }
    else if (bowlResult >= 1-(10/300)) {
        outs = 1;
        }
        else {
      //      return;
        }

//updating the current over count
    if (gameData.overA<50 && gameData.outsA<10) {
        gameData.runsA += runs;
        gameData.outsA += outs;
        gameData.bowlA += gameData.bowlPerClick;

        if (gameData.bowlA > 5) {
            gameData.overA++;
            gameData.bowlA = 0;
        }
        screenUpdate();
     }
    else {
        gameData.bowlB += gameData.bowlPerClick;
        gameData.runsB += runs;
        gameData.outsB += outs;

        if (gameData.bowlB > 5) {
            gameData.overB++;
            gameData.bowlB = 0;
        }
        screenUpdate();
    }
//saving game data to local storage after every ball thrown
    saveGame();

}

//Declares winner at end of game
function declareWinner() {
    var gameWinner = gameData.runsA>gameData.runsB ? "Team A" : "Team B" ;
    if (gameWinner == "Team A") {
        document.getElementById("gameWinner").innerHTML = gameWinner + " won by " + (gameData.runsA - gameData.runsB) + " runs" ;
    }
    else {
        document.getElementById("gameWinner").innerHTML = gameWinner + " won by " + (10 - gameData.outsB) + " wickets" ;
    }
}
//on win
document.getElementById("gameWinner").style += "display:none;"
//on new game
document.getElementById("gameWinner").style += "display:initial;"

//Idle Functionality: throws one pitch every 5 seconds
var mainGameLoop = setInterval(throwBall,5000);

//changing the speed of bowls thrown
function changeSpeed()
{
    var speed = document.getElementById("speedSlider").value * 1000;
    clearInterval(mainGameLoop);
    mainGameLoop = setInterval(throwBall,speed);
    document.getElementById("lblSpeed").innerHTML = (speed / 1000 * 600 / 60);
}

//setting a New Game
function newGame() {

    //saving game stats to a table and calculate points for tournament

    //resetting game stats to 0
    gameData.overA=0;
    gameData.overB=0;
    gameData.bowlA=0;
    gameData.bowlB=0;
    gameData.runsA=0;
    gameData.runsB=0;
    gameData.outsA=0;
    gameData.outsB=0;

    //resetting displays to 0
    document.getElementById("overCountA").innerHTML = "0.0";
    document.getElementById("runsA").innerHTML = 0;
    document.getElementById("outsA").innerHTML = 0;
    document.getElementById("crrA").innerHTML = "0.00";
    document.getElementById("overCountB").innerHTML = "0.0";
    document.getElementById("runsB").innerHTML = 0;
    document.getElementById("outsB").innerHTML = 0;
    document.getElementById("crrB").innerHTML = "0.00";
    document.getElementById("runsToWin").innerHTML = 0;
    document.getElementById("bowlsRemaining").innerHTML = 0;
    document.getElementById("rrrB").innerHTML = "0.00";
    document.getElementById("gameWinner").innerHTML = "";

    //increasing game #
    gameData.gameNumber += 1;
    document.getElementById("gameNumber").innerHTML = gameData.gameNumber;
    saveGame();

}

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
