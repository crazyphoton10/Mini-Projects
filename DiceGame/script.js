"use strict";
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

//Initializion
let currentScore, activePlayer, playing;
let scores = [];

const init = function () {
  diceEl.classList.add("hidden");

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = score1El.textContent = 0;
  current0El.textContent = current1El.textContent = 0;

  document.querySelector(`#name--${activePlayer}`).textContent = `PLAYER 1`;

  document
    .querySelector(`#name--${activePlayer}`)
    .classList.remove("infinite-color-change");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = Number(!activePlayer);
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

init();

btnRoll.addEventListener("click", function () {
  if (playing) {
    const roll = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `images/dice-${roll}.png`;
    diceEl.classList.remove("hidden");

    if (roll !== 1) {
      currentScore += roll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //Add current score to total score of active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if player's score>=100 then finish the game
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.querySelector(
        `#name--${activePlayer}`
      ).textContent = `🎉 WINNER 🎉`;

      document
        .querySelector(`#name--${activePlayer}`)
        .classList.add("infinite-color-change");
    } else {
      //Switch player
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);

// cloudflared tunnel --url http://localhost:5500/index.html --protocol quic --edge-ip-version auto --loglevel debug --metrics 127.0.0.1:4600
