var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var str = "hey man";
var level = 0;
function playSounds(id) {
    var audio = new Audio("sounds/" + id + ".mp3");
    audio.play();
}
var started = false;

function nextSequence() {
    userClickedPattern = [];
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    var button = $("#" + randomChosenColour);
    playSounds(button.attr('id'));
    level++;
}

function shine(button) {
    button.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(".btn").click(function() {
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSounds(this.id);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(userChosenColour) {
    $("#" + userChosenColour).addClass("pressed");
    setTimeout(function() {
        $("#" + userChosenColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function (e) {
    if (started == false) {
        started = true;
        nextSequence();
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log(true);
        if (currentLevel == gamePattern.length - 1) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }, 200);
    }
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}