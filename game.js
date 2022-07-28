const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userPattern = [];

let level = 0;

// Start game for desktop
$(document).keypress(function (e) {
  if (e.key === "Enter") {
    startGame();
  }
});

// Start game for mobile touch
if (window.matchMedia("(max-width: 700px)").matches) {
  // Change the heading for mobile devices
  $("h1").text("Touch start to play");
  $(".start-button").click(function () {
    $(".start-button").hide();
    startGame();
  });
}

function startGame() {
  // checking level 0 condition so that repetive start doesn't happen
  if (level === 0) {
    $("h1").text("Let's see how is your memory...");
    setTimeout(nextSequence, 1000);
  }
}

function restartGame() {
  playAudio("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  if (window.matchMedia("(max-width: 700px)").matches) {
    $("h1").text("Game over!");
    $(".start-button").show();
    $(".start-button").text("Restart");
  } else {
    $("h1").text("Game over! Press Enter to restart Game");
  }

  gamePattern = [];
  userPattern = [];
  level = 0;
}

// to generate next random sequence for the game pattern
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playAudio(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

$(".btn").click(function (e) {
  // to prevent user from clicking before the game starts
  if (level === 0) {
    return;
  }
  let userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer();
});

function checkAnswer() {
  let lastIndex = userPattern.length - 1;
  if (userPattern[lastIndex] !== gamePattern[lastIndex]) {
    restartGame();
  } else {
    // Playing audio after checking right or wrong button.
    // if playAudio was called just after the click then
    // on wrong answer, there would be two sounds. One for click
    // and one for wrong.
    playAudio(userPattern[lastIndex]);
    if (userPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userPattern = [];
    }
  }
}

function playAudio(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}
