const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const width = canvas.width / gridSize;
const height = canvas.height / gridSize;

let snake = [{ x: width / 2, y: height / 2 }];
let direction = 'right';
let food = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
let score = 0;

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function drawSnake() {
    snake.forEach((segment, index) => {
        if (index === 0) {
            drawSquare(segment.x, segment.y, 'green');
        } else {
            drawSquare(segment.x, segment.y, 'white');
        }
    });
}

function drawFood() {
    drawSquare(food.x, food.y, 'red');
}

function updateSnake() {
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
        // game over
        clearInterval(gameLoop);
    }

    if (head.x === food.x && head.y === food.y) {
        // comer
        score++;
        food = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
    } else {
        
        snake.pop();
    }

    snake.unshift(head);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    drawScore();
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

let gameLoop = setInterval(function () {
    updateSnake();
    draw();
}, 100);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    } else if (e.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    } else if (e.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (e.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    }
});