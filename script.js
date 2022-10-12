'use strict';

///////////////////// Selecting Element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRole = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const currentS0 = document.querySelector('#current--0');
const currentS1 = document.querySelector('#current--1');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentS0.textContent = 0;
  currentS1.textContent = 0;

  diceEl.classList.add('hidden');
  document.querySelector('#name--0').textContent = 'player 1';
  document.querySelector('#name--1').textContent = 'player 2';
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  
  if (currentScore === 0) {
    btnNew.style.display = 'none';
  }
};

init();

const switchPlayer = function () {
  //////////////// switch to next player ////////////
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  //////////// switching class ///////
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let dice = Math.trunc(Math.random() * 6) + 1;

btnRole.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    
    btnNew.style.display = 'initial';

    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      const audio = new Audio('haha.mp3');
      audio.play();
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentScore;

    activePlayer === 0
      ? (score0El.textContent = scores[0])
      : (score1El.textContent = scores[1]);

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelectorAll('.name')[activePlayer].textContent =
        '🥇 Winner';
    } else {
      switchPlayer();
    }
  }
});

//////////////   reset the game ////////////
btnNew.addEventListener('click', init);
