'use strict'


const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const flapImg = new Image();
flapImg.src = '/img/flappy_dunk.png'


/* COnstant of game */

let FLAP_SPEED = -5;
let BIRD_WIDTH = 40;
let BIRD_HEIGHTS = 30;
let PIPE_WIDTH = 50;
let PIPE_GAP = 125;

let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 0.1;

let pipeX = 400;
let pipeY = canvas.height - 200;


let scoreDiv = document.querySelector('.score-display');
let score = 0;
let scored = false;
let highScore = 0;

document.querySelector('body').addEventListener('keyup', (e) => {
    //console.log(e);
    if (e.code === 'Space') {
        console.log(e);
        birdVelocity = FLAP_SPEED;
    }
})

document.querySelector('#restart-btn').addEventListener('click', () => {
    hideEndMenu()
    resetGame()
})


function increasedScore() {
    document.querySelector('.score-display').innerHTML = score
    if (scored) {
        score++
    }
}
function bestScore() {
    let bestScore = document.querySelector('#best-score');

    if (score > highScore) {
        highScore = score
    }
    bestScore.innerHTML = highScore
}

function colissionChek() {
    let birdBox = {
        x: birdX,
        y: birdY,
        width: BIRD_WIDTH,
        height: BIRD_HEIGHTS,
    }

    let pipeTop = {
        x: pipeX,
        y: pipeY - PIPE_GAP + BIRD_HEIGHTS,
        width: PIPE_WIDTH,
        height: pipeY,
    }

    let pipeBottom = {
        x: pipeX,
        y: pipeY + PIPE_GAP + BIRD_HEIGHTS,
        width: PIPE_WIDTH,
        height: canvas.height - pipeY - PIPE_GAP,
    }

    if (birdBox.x + birdBox.width > pipeTop.x &&
        birdBox.x < pipeTop.x + pipeTop.width &&
        birdBox.y < pipeTop.y
    ) {
        return true
    }

    if (birdBox.x + birdBox.width > pipeBottom.x &&
        birdBox.x < pipeBottom.x + pipeBottom.width &&
        birdBox.y + birdBox.height > pipeBottom.y
    ) {
        return true
    }

    return false

}

function hideEndMenu() {
    document.querySelector('.end-menu').style.display = 'none';
}


function showEndMenu() {
    console.log(document.querySelector('.end-menu').style.dispaly);
    document.querySelector('.end-menu').style.display = 'block';
    document.querySelector('#end-score').innerHTML = score;
    bestScore()
}

function resetGame() {
    FLAP_SPEED = -5;
    BIRD_WIDTH = 40;
    BIRD_HEIGHTS = 30;
    PIPE_WIDTH = 50;
    PIPE_GAP = 125;

    birdX = 50;
    birdY = 50;
    birdVelocity = 0;
    birdAcceleration = 0.1;

    pipeX = 400;
    pipeY = canvas.height - 200;
    game()
}

function endGAme() {
    showEndMenu();
    scored = false;
    score = 0;
}

function game() {
    scored = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(flapImg, birdX, birdY)

    birdVelocity += birdAcceleration;
    birdY += birdVelocity
    ctx.fillStyle = '#444'
    // fill top pipes
    ctx.fillRect(pipeX, -100, PIPE_WIDTH, pipeY);
    // fill bottom pipes
    ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.height - pipeY);
    pipeX -= 1.5

    if (pipeX < -50) {
        pipeX = 400;
        pipeY = Math.random() * (canvas.height - PIPE_GAP) + PIPE_WIDTH
    }

    if (birdY < 0 + BIRD_WIDTH / 2) {
        birdY = 0 + BIRD_WIDTH / 2
    }
    if (birdY > canvas.height - BIRD_WIDTH) {
        endGAme();
        return
    }
    if(colissionChek()) {
        endGAme();
        return  
    }
    increasedScore()
    requestAnimationFrame(game)
}
game()