var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var toggle = true;
var level = 0;

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(70).fadeIn(100);

  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
  $("#" + currentColor).removeClass("pressed");
  },50);
}

document.addEventListener("keypress", function(){
  if(toggle===true){
    nextSequence();
    $("h1").text("Level 1");
    toggle = false;
  }

});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }

  else{
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function() {
  $("body").removeClass("game-over");
},200);

$("h1").text("Game Over, Press Any Key on Your Keyboard to Restart");
startOver();

  }
}

function startOver(){
$("h2").text("This github website is made by Eddie - You made it to level " + level + "!");
  level = 0;
  gamePattern = [];
  toggle = true;
}
