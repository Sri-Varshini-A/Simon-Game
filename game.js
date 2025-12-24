var gamePattern = [];
var userPattern = [];
var buttonColors = ["red","green","blue","yellow"];
var level = 0;

var started = false;

//START THE GAME
$(document).on("keypress",function(){
    if(!started)
    {
        started = true;
        nextSequence();
    }
});

function nextSequence(){

    userPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    
    var randomNum = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNum];
    gamePattern.push(randomColor);

    //flash
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //sound
    playSound(randomColor);
}

//Detect UserClick pattern
$(".btn").on("click",function(){
    var userColor = $(this).attr("id");
    userPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);

    checkAnswer(userPattern.length-1);
});


function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(name)
{
    $("#"+name).addClass("pressed");

    setTimeout(function(){
        $("#"+name).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
    if(userPattern[currentLevel] === gamePattern[currentLevel])
    {
        var count = 0;
        for(var i=0; i<gamePattern.length; i++)
        {
            if(userPattern[i] === gamePattern[i])
            {
                count++;
            }
        }

        if(count===gamePattern.length)
        {
            setTimeout(nextSequence(),5000);
        }
    }
    else
    {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver()
{
    gamePattern = [];
    level = 0;
    started = false;
}

