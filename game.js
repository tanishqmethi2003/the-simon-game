
var buttonColours = ["red", "blue", "green", "yellow"];
var start = 0;
var gamePattern = [];
var userClickedPattern = [];
var level=0;

$(document).keypress(function(){     
    if(start===0) {
        nextSequence();
        $("#level-title").text("Level " + level);
        start=1;
    }
})


$(".btn").click(function() {

    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var index = userClickedPattern.length-1;
    playSound(userChosenColour);
        
    animatePress(userChosenColour);
    checkAns(index);
})

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random() * 4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
        // $("#"+randomChosenColour).fadeIn(100).fadeOut(100);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);   
    
}

function playSound(name){
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {    

        $("#"+currentColor).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColor).removeClass("pressed");
        },100);
    
}

function checkAns(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        var t=0;
        console.log("Success");
        // for(var i=0;i<currentLevel;i++)
        // {
        //     if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        //         continue;
        //     }
        //     else {
        //         t=1;
        //         break;
        //     }
        // }
        // if (t===0)
        // {
        //     setTimeout(nextSequence(),1000);
        //     userClickedPattern=[];
        // }
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    
    }
    else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        } , 100)
        $("#level-title").text("Game Over, Press Any Key to Restart ");
        startOver();
    }
}
function startOver()
{
    level=0;
    gamePattern=[];
    start=0;
}








