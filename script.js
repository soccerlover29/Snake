const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restartButton');

let snake, apple, direction, score, gameInterval;

function initializeGame() {
    snake = [{ x: 10, y: 10 }];
    apple = { x: 15, y: 15 };
    direction = { x: 0, y: 0 };
    score = 0;
    scoreDisplay.innerText = score;
    placeApple();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake with rounded segments
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'darkgreen' : 'lightgreen'; // Head is darker
        ctx.beginPath();
        ctx.arc(segment.x * 20 + 10, segment.y * 20 + 10, 10, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw the apple
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(apple.x * 20 + 10, apple.y * 20 + 10, 10, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x === apple.x && head.y === apple.y) {
        score++;
        scoreDisplay.innerText = score;
        placeApple();
    } else {
        snake.pop();
    }

    if (checkCollision(head)) {
        clearInterval(gameInterval);
        alert('Game Over');
        return;
    }

    snake.unshift(head);
}

function placeApple() {
    apple.x = Math.floor(Math.random() * (canvas.width / 20));
    apple.y = Math.floor(Math.random() * (canvas.height / 20));
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

function checkCollision(head) {
    if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20) {
        return true;
    }

    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            return true;
        }
    }

    return false;
}

function gameLoop() {
    update();
    draw();
}

document.addEventListener('keydown', changeDirection);
restartButton.addEventListener('click', initializeGame);

initializeGame();
