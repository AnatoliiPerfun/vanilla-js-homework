const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const aiScoreEl = document.getElementById('aiScore');
const aiChoiceEl = document.getElementById('aiChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerScissors = document.getElementById('playerScissors');
const playerPaper = document.getElementById('playerPaper');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const aiRock = document.getElementById('aiRock');
const aiScissors = document.getElementById('aiScissors');
const aiPaper = document.getElementById('aiPaper');
const aiLizard = document.getElementById('aiLizard');
const aiSpock = document.getElementById('aiSpock');

const allGameIcons = document.querySelectorAll('.far');

const choices = {
   rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
   paper: { name: 'Paper', defeats: ['rock', 'spock'] },
   scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
   lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
   spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let aiChoice = '';

function resetSelection() {
   allGameIcons.forEach((icon) => {
      icon.classList.remove('selected');
   });
}

function aiRandomChoice() {
   const aiChoiceNumber = Math.random();
   if (aiChoiceNumber < 0.2) {
      aiChoice = 'rock';
   } else if (aiChoiceNumber <= 0.4) {
      aiChoice = 'paper';
   } else if (aiChoiceNumber == 0.4) {
      aiChoice = 'scissors';
   }
}

function checkResult() {
   resetSelection();
   aiRandomChoice();
}

function select(playerChoice) {
   checkResult();

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
    }
}