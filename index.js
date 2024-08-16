const computerChose = ['rock', 'paper', 'scissors'];

const scoreObject = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };
// if the browser does not have data stored it will use the default data that i provided
displayScore();

let intervalID;
const autoPlayButton = document.querySelector('.auto-paly-button');
let isAutoPlaying = false;


document.querySelector('#reset').addEventListener('click', message);

autoPlayButton.addEventListener('click', () => {
    autoPlay();
})

document.querySelectorAll('.play-button').forEach((button) => {
    button.addEventListener('click', function () {

        if (!isAutoPlaying) {
            const userMove = this.getAttribute('id');
            const computerMove = computerChose[Math.floor(Math.random() * 3)];
            determineOutcome(userMove, computerMove);
        }

    });
})


document.body.addEventListener('keydown', (event) => {
    const theKey = event.key;
    const computerMove = computerChose[Math.floor(Math.random() * 3)];
    switch (theKey) {
        case 'r' || 'R':
            determineOutcome('rock', computerMove);
            break;
        case 'p' || 'P':
            determineOutcome('paper', computerMove);
            break;
        case 's' || 'S':
            determineOutcome('scissors', computerMove);
            break;
        case 'a' || 'A':
            autoPlay();
            break;
        case ' ':
            message();
            break;
    }
});

function determineOutcome(userMove, computerMove) {
    let result;
    if (userMove === computerMove) {
        scoreObject.ties++;
        result = 'it is a tie';

    } else if ((userMove === 'rock' && computerMove === 'scissors') ||
        (userMove === 'scissors' && computerMove === 'paper') ||
        (userMove === 'paper' && computerMove === 'rock')) {
        scoreObject.wins++;
        result = 'you won';

    } else {
        scoreObject.losses++;
        result = 'you lost';
    }
    localStorage.setItem('score', JSON.stringify(scoreObject));
    displayScore();
    displayMoves(userMove, computerMove, result);

    //we converted the object to json 
    //because localStorage only takes strings
}

function displayScore() {
    document.querySelector('.ties').innerHTML = `ties: ${scoreObject.ties}`;
    document.querySelector('.wins').innerHTML = `wins: ${scoreObject.wins}`;
    document.querySelector('.losses').innerHTML = `losses: ${scoreObject.losses}`;
}


function displayMoves(userMove, computerMove, wonOrLost) {
    document.querySelector('.won-lost').innerHTML = wonOrLost;
    userMove = transformToEmoji(userMove);
    computerMove = transformToEmoji(computerMove);
    document.querySelector('.the-players').classList.add('active');
    document.querySelector('.moves').innerHTML = ` ${userMove} ${computerMove} `;


}

function autoPlay() {
    if (!isAutoPlaying) {
        autoPlayButton.innerHTML = "Stop auto play";
        intervalID = setInterval(() => {
            const autoComputerMove = computerChose[Math.floor(Math.random() * 3)];
            const autoUserMove = computerChose[Math.floor(Math.random() * 3)];
            determineOutcome(autoUserMove, autoComputerMove);
        }, 1500)
        isAutoPlaying = true;
    } else {
        autoPlayButton.innerHTML = 'auto play';
        clearInterval(intervalID);
        isAutoPlaying = false;
    }
}

function transformToEmoji(move) {
    const emojis = {
        'rock': '✊🏼',
        'paper': '🖐🏼',
        'scissors': '✌🏼'
    };
    return emojis[move];
}

function resetScore() {
    scoreObject.losses = 0;
    scoreObject.wins = 0;
    scoreObject.ties = 0;

    localStorage.removeItem('score');
    //to update the storage after the reset

    displayScore();

}

function message() {
    document.querySelector('.confirm-js').innerHTML = `
        <div class="confirem-div">
            <p class="reset-confirm the-font">
                Are you sure you want to reset the score?
            </p>
            <button class="yes-button the-font">Yes</button>
            <button class="no-button the-font">No</button>
        </div>
  `
    document.querySelector('.yes-button').addEventListener('click', function () {
        resetScore();
        document.querySelector('.confirm-js').innerHTML = ''
    })

    document.querySelector('.no-button').addEventListener('click', function () {
        document.querySelector('.confirm-js').innerHTML = ''
    })
}

