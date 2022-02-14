import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const aiScoreEl = document.getElementById('aiScore');
const aiChoiceEl = document.getElementById('aiChoice');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const aiRock = document.getElementById('aiRock');
const aiPaper = document.getElementById('aiPaper');
const aiScissors = document.getElementById('aiScissors');
const aiLizard = document.getElementById('aiLizard');
const aiSpock = document.getElementById('aiSpock');

const allGameIcons = document.querySelectorAll('.far');
const resultText = document.getElementById('resultText');

const choices = {
   rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
   paper: { name: 'Paper', defeats: ['rock', 'spock'] },
   scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
   lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
   spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

//set and reload
let playerScoreNumber = 0;
let aiScoreNumber = 0;
let aiChoice = '';

function resetSelection() {
   allGameIcons.forEach((icon) => {
      icon.classList.remove('selected');
   });
   stopConfetti();
   removeConfetti();
}

function resetAll() {
   playerScoreNumber = 0;
   aiScoreNumber = 0;
   playerScoreEl.textContent = playerScoreNumber;
   aiScoreEl.textContent = aiScoreNumber;
   playerChoiceEl.textContent = '';
   aiChoiceEl.textContent = '';
   resultText.textContent = '';
   resetSelection();
}
window.resetAll = resetAll;

// ai logic 
function aiRandomChoice() {
   const aiChoiceNumber = Math.random();
   if (aiChoiceNumber < 0.2) {
      aiChoice = 'rock';
   } else if (aiChoiceNumber <= 0.4) {
      aiChoice = 'paper';
   } else if (aiChoiceNumber <= 0.6) {
      aiChoice = 'scissors';
   } else if (aiChoiceNumber <= 0.8) {
      aiChoice = 'lizard';
   } else {
      aiChoice = 'spock';
   }
}

function aiChoiceSet() {
   switch (aiChoice) {
     case 'rock':
        aiRock.classList.add('selected');
        aiChoiceEl.textContent = ' --- Rock';
        break;
      case 'paper':
         aiPaper.classList.add('selected');
         aiChoiceEl.textContent = ' ---Paper';
         break;
      case 'scissors':
         aiScissors.classList.add('selected');
         aiChoiceEl.textContent = ' --- Scissors';
         break;
      case 'lizard':
         aiLizard.classList.add('selected');
         aiChoiceEl.textContent = ' --- Lizard';
         break;
      case 'spock':
         aiSpock.classList.add('selected');
         aiChoiceEl.textContent = ' --- Spock';
         break;
      default:
         break;
   }
}
// check result and updateScore as mantion below 
function updateScore(playerChoice) {
   if (playerChoice === aiChoice) {
      resultText.textContent = "BORING!";
   } else {
      const choice = choices[playerChoice];
      if (choice.defeats.indexOf(aiChoice) > -1) {
         startConfetti();
         resultText.textContent = "Humans Won! AI`ll be back!";
         playerScoreNumber++;
         playerScoreEl.textContent = playerScoreNumber;
      } else {
         resultText.textContent = "AI Won. Sad.";
         aiScoreNumber++;
         aiChoiceEl.textContent = aiScoreNumber;
      }
   }
}
// call functions to process turn
function checkResult(playerChoice) {
   resetSelection();
   aiRandomChoice();
   aiChoiceSet();
   updateScore(playerChoice);
}
// human wise choice logic
function select(playerChoice) {
   checkResult(playerChoice);
   switch (playerChoice) {
     case 'rock':
        playerRock.classList.add('selected');
        playerChoiceEl.textContent = ' --- Rock';
        break;
      case 'paper':
         playerPaper.classList.add('selected');
         playerChoiceEl.textContent = ' ---Paper';
         break;
      case 'scissors':
         playerScissors.classList.add('selected');
         playerChoiceEl.textContent = ' --- Scissors';
         break;
      case 'lizard':
         playerLizard.classList.add('selected');
         playerChoiceEl.textContent = ' --- Lizard';
         break;
      case 'spock':
         playerSpock.classList.add('selected');
         playerChoiceEl.textContent = ' --- Spock';
         break;
      default:
         break;
    }
}
window.select = select;
//on start set initial values
resetAll();