var buttonColors = ["red", "blue" , "green" , "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0 ;

var started = false;
// keypress to start the game.
$(document).keypress(function(){
    if(!started){
        started=true;
        nextSequence();
    }
});


// on every button click
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
   
    checkAnswer(userClickedPattern.length - 1);
    // console.log(userClickedPattern);
});

// for next sequence
function nextSequence(){

    level++;
    $("#level-title").text("Level " + level);

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

// function to play sound each time.
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// function to animate each button press.
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

// function to check answer each time.
function checkAnswer(lastAnswer){

    if(userClickedPattern[lastAnswer] === gamePattern[lastAnswer]){

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }

    else{
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}
