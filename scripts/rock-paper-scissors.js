// Default Operator "||"
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

function pickComputerMove() {
  let computerMove = '';
  const randomNumber = Math.random();
  
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

//const autoPlay = () => {
//
//};
document.querySelector('.js-auto-button')
  .addEventListener('click', () => {
    autoPlay();
    activateIconTurn();
    
  })


let iconChecker = true;

function activateIconTurn() {
  const icon = document.querySelector('.js-refresh-icon');
  const iconParagraph = document.querySelector('.js-refresh-paragraph');

  if (iconChecker) {
    icon.style.opacity = '1';
    iconParagraph.style.opacity = '1';
    iconChecker = false;
  } else if (!iconChecker) {
    icon.style.opacity = '0';
    iconParagraph.style.opacity = '0';
    iconChecker = true;
  }
}

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      createResult(playerMove);   
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-button')
      .innerHTML = 'Stop Playing'
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-button')
      .innerHTML = 'Auto Play'
  }  
}

function clickEvent(pick) {
  document.querySelector(`.js-${pick}-button`)
    .addEventListener('click', () => {
      createResult(pick);
    });
}
clickEvent('rock');
clickEvent('paper');
clickEvent('scissors');



document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    resetConfirmation();
  });


document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    createResult('rock');
  } else if (event.key === 'p') {
    createResult('paper');
  } else if (event.key === 's') {
    createResult('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    resetConfirmation();
  }
});

document.body.addEventListener('keydown', (event) => {
  console.log(event.key);
});

let resetTimeoutId;

function resetConfirmation() {
  let resetParagraph = document.querySelector('.js-reset-paragraph');
  resetParagraph.style.opacity = '1';
  resetParagraph.style.visibility = 'visible';
  clearTimeout(resetTimeoutId, () => {
    resetParagraph.style.opacity = '0';
    setTimeout(() => resetParagraph.style.display = '0', 500)    
  });

  document.querySelector('.js-auto-yes')
    .addEventListener('click', () => {
      resetScore();
      resetParagraph.style.opacity = '0';
      resetParagraph.style.visibility = 'hidden';

      clearTimeout(resetTimeoutId, () => {
        resetParagraph.style.opacity = '0';
        setTimeout(() => resetParagraph.style.display = '0', 500)    
      });
    });
  document.querySelector('.js-auto-no')
    .addEventListener('click', () => {
      resetParagraph.style.opacity = '0';
      resetParagraph.style.visibility = 'hidden';

      clearTimeout(resetTimeoutId, () => {
        resetParagraph.style.opacity = '0';
        setTimeout(() => resetParagraph.style.display = 'none', 200)    
      });
    });
  
  resetTimeoutId = setTimeout(() => resetParagraph.style.opacity = '0', 5000);
}

function createResult(playerPick) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerPick === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerPick === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }

  } else if (playerPick === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  }

  if (result === 'You win.') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result')
    .innerHTML = `${result}`;

  document.querySelector('.js-moves')
    .innerHTML = `You <img src="pictures/${playerPick}-emoji.png" class="move-icon"> <img src="pictures/${computerMove}-emoji.png" class="move-icon"> Computer`;
  

  updateScoreElement();
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}