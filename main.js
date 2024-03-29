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
  bowlPerClick: 1,
  gameSpeed:6000,
}

//update the screen with gameData
function screenUpdate() {
    //Team A Stats
        var overCountA = gameData.overA + "." + gameData.bowlA;
        document.getElementById("overCountA").innerHTML = overCountA;

        document.getElementById("runsA").innerHTML = gameData.runsA;
        document.getElementById("outsA").innerHTML = gameData.outsA;

        var crrA = gameData.runsA / (gameData.overA + (gameData.bowlA/6));
        if (!crrA) {
            crrA = 0;
        }
        document.getElementById("crrA").innerHTML = crrA.toFixed(2);

    //Team B Stats
        var overCountB = gameData.overB + "." + gameData.bowlB;
        document.getElementById("overCountB").innerHTML = overCountB;

        document.getElementById("runsB").innerHTML = gameData.runsB;
        document.getElementById("outsB").innerHTML = gameData.outsB;

        var currentTeam = (gameData.overA < 50 && gameData.outsA < 10) ? "A" : "B";
        if (currentTeam == "A") {
            //hide TeamB RRR & runs to win
            document.getElementById("lblRRRb").style.display = "none";
            document.getElementById("rrrB").style.display = "none";
            document.getElementById("trRunsToWin").style.display = "none";
        } else {
            //show TeamB RRR & runs to win
            document.getElementById("lblRRRb").style.display = "";
            document.getElementById("rrrB").style.display = "";
            document.getElementById("trRunsToWin").style.display = "";
        }

    //other
    changeSpeed();

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
    mainGameLoop = setInterval(throwBall,gameData.gameSpeed);
}

function hit() {
    var runs = 0;
    var hitResult = Math.random();
    if (0<hitResult&&hitResult<=(10/300)){
        runs = 6;
    }
    if ((10/300)<hitResult&&hitResult<=(65/300)){
        runs = 4;
    }
    if ((65/300)<hitResult&&hitResult<=(70/300)){
        runs = 3;
    }
    if ((70/300)<hitResult&&hitResult<=(100/300)){
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
        var crrB = gameData.runsB / (gameData.overB + (gameData.bowlB/6));
        document.getElementById("crrB").innerHTML = crrB.toFixed(2);

        var runsToWin = (gameData.runsA + 1)-gameData.runsB;
        document.getElementById("runsToWin").innerHTML = runsToWin;

        var bowlsRemaining = (((49 - gameData.overB)*6)+(6-gameData.bowlB));
        document.getElementById("bowlsRemaining").innerHTML = bowlsRemaining;

        var rrrB = runsToWin / (bowlsRemaining/6);
        if (rrrB >= 36) {
            document.getElementById("rrrB").innerHTML = ">36";
        }
        else {
            document.getElementById("rrrB").innerHTML = rrrB.toFixed(2);
        }

        screenUpdate();
    }
//saving game data to local storage after every ball thrown
    saveGame();

}

//Declares winner at end of game
function declareWinner() {
    //var gameWinner = gameData.runsA>gameData.runsB ? "Team A" : "Team B" ;
    if (gameData.runsA>gameData.runsB) {
        var teamName = document.getElementById("Team 1").innerHTML;
        document.getElementById("gameWinner").innerHTML = teamName + " won by " + (gameData.runsA - gameData.runsB) + " runs" ;
    }
    else if (gameData.runsA<gameData.runsB) {
        var teamName = document.getElementById("Team 2").innerHTML;
        document.getElementById("gameWinner").innerHTML = teamName + " won by " + (10 - gameData.outsB) + " wickets" ;
    } else {
        document.getElementById("gameWinner").innerHTML = "Tie game!";
    }

    //hide RRR and runs to win on game end
    document.getElementById("lblRRRb").style.display = "none";
    document.getElementById("rrrB").style.display = "none";
    document.getElementById("trRunsToWin").style.display = "none";
}

//Idle Functionality: throws one pitch every 5 seconds
var mainGameLoop = setInterval(throwBall,5000);

//changing the speed of bowls thrown
function changeSpeed()
{
    var speed = document.getElementById("speedSlider").value * 1000;
    clearInterval(mainGameLoop);
    mainGameLoop = setInterval(throwBall,speed);
    document.getElementById("lblSpeed").innerHTML = (speed / 1000 * 600 / 60);
    gameData.gameSpeed = speed;
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
    screenUpdate();
    coinFlip();
}

//the coinflip which determines which team gets to choose bowl or bat first
function coinFlip() {
    //the coin flip
    var coinFlip = Math.random();
    if (coinFlip <= 0.5) {
        var flipResult = "heads";
    }
    else {
        var flipResult = "tails";
    }
    //prompt for player's choice
    var choice = prompt("Heads or Tails").toLowerCase();

    //compare coinflip to choice
    if (flipResult == choice) {
        if (flipResult == "heads") {
            alert("The flip was heads and you chose heads...you win!");
        }
        else {
            alert("The flip was tails and you chose tails...you win!");
        }
        //prompt for Bowl first or Bat first
        var inningsChoice = prompt("Bat or Bowl first?").toLowerCase();
        //place teams on appropriate side
        if (inningsChoice == "bat") {
            document.getElementById("Team 1").innerHTML = "Team A";
            document.getElementById("Team 2").innerHTML = "Team B";
        }
        else {
            document.getElementById("Team 2").innerHTML = "Team A";
            document.getElementById("Team 1").innerHTML = "Team B";
        }
    }
    else {
        if (flipResult == "heads") {
            alert("The flip was heads and you chose tails...you lose!");
        }
        else {
            alert("The flip was tails and you chose heads...you lose!");
        }
        //randomly determine whether opposing team chose Bat or Bowl first
        //and place teams on approriate sides
        var aiInningsChoice = Math.random();
        if (aiInningsChoice <= .50) {
            alert("Team B has chosen to Bat first");
            document.getElementById("Team 2").innerHTML = "Team A";
            document.getElementById("Team 1").innerHTML = "Team B";
        }
        else {
            alert("Team B has chosen to Bowl first");
            document.getElementById("Team 1").innerHTML = "Team A";
            document.getElementById("Team 2").innerHTML = "Team B";
        }
    }
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
