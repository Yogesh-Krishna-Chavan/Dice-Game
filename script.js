'use strict';

//Selecting elemnets
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0E1 = document.querySelector('.player--0');
const player1E1 = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceE1 = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//starting conditions
const init = function(){

    
    scores = [0,0]; 
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    diceE1.classList.add('hidden');
    player0E1.classList.remove('player--winner');
    player1E1.classList.remove('player--winner');
    player0E1.classList.add('player--active');
    player1E1.classList.remove('player--active');
}
init();

const switchPlayer = function(){
document.getElementById(`current--${activePlayer}`).textContent = 0;
currentScore = 0;
activePlayer = activePlayer === 0 ? 1 : 0;
player0E1.classList.toggle('player--active');
player1E1.classList.toggle('player--active');
}


//Rolling dice
btnRoll.addEventListener('click', function(){
if(playing){

//1. Genrating random roll
const dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);

//2.Display dice
diceE1.classList.remove('hidden');
diceE1.src = `dice-${dice}.png`;

//3. check for rolled 1: if true, 
if (dice !== 1){
//Add dice score to current score
currentScore += dice;
// current0El.textContent = currentScore; //Change later
document.getElementById(`current--${activePlayer}`).textContent = currentScore;
}
else{
//switch to next player
switchPlayer();
}
}
});



//Holding Score
btnHold.addEventListener('click', function(){
//Add score to the Active Player
if(playing){
scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore;
document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

//Check if player score >= 100 Then Finish Game
if(scores[activePlayer] >= 100){
    playing = false;
diceE1.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
}
else{
//Switch to next player
switchPlayer();
}
}
});


btnNew.addEventListener('click', init);