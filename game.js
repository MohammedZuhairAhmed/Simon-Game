var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;
var started = false;

function nextSequence(){

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);

    level++;

    $("h1").text("Level " + level);

    
}

$(".btn").on("click",function(event){

    var userChosenColour = event.currentTarget.id;

    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

    $("#" + userChosenColour).fadeOut(100).fadeIn(100);
    animatePress(userChosenColour);
    playSound(userChosenColour);

});

function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

$(document).on("keypress",function(){
    if(!started)
    {
        nextSequence();
        started = true;
    }    
});

function checkAnswer(index)
{
    if(gamePattern[index] === userClickedPattern[index])
    {   
        if(level === index+1)
        {
            userClickedPattern = [];
            setTimeout(nextSequence,1000);
        }
    }    
    else
    {   
        var over = new Audio("sounds/wrong.mp3");
        over.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        level = 0;
        gamePattern = [];
        started = false;

        $("h1").text("Game Over, Press Any Key to Restart");
    }
}