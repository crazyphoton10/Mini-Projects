"use strict";
//Whenever we get something from user interface eg. input field - it is in form of string

const generateRandomNumber = () => Math.trunc(Math.random() * 20) + 1;

let secretNumber = generateRandomNumber();
let score = 20;
let highscore = 0;

//DRY
const updateStyle = (element, property, value) => {
  document.querySelector(element).style[property] = value;
};

const displayMessage = (message) => {
  document.querySelector(".message").textContent = message;
};

const updateScore = (newScore) => {
  document.querySelector(".score").textContent = newScore;
};

//Main Code
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess);

  if (!guess) {
    displayMessage("No number entered! 😔 ");
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number guessed! 🤑");

    updateStyle("body", "backgroundColor", "#60b347");
    updateStyle(".number", "width", "30rem");

    document.querySelector(".number").textContent = secretNumber;

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "Too High! 📈" : "Too Low! 📉");
      score--;
      updateScore(score);
    } else {
      displayMessage("You lost the game! ☹");
      updateScore(0);
    }
  }
});

//Reset
document.querySelector(".again").addEventListener("click", function () {
  secretNumber = generateRandomNumber();
  displayMessage("Start guessing...");
  score = 20;
  document.querySelector(".score").textContent = score;
  updateStyle("body", "backgroundColor", "#000");
  updateStyle(".number", "width", "15rem");
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
});
