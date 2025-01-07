const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

let player = { x: 200, y: 200, size: 20, color: 'blue' };
let enemies = [];

// Генерация врагов
function spawnEnemy() {
    enemies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 15,
        color: 'red'
    });
}

// Обновление игры
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем игрока
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Рисуем врагов
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    });
}

// Управление игроком
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') player.y -= 10;
    if (e.key === 'ArrowDown') player.y += 10;
    if (e.key === 'ArrowLeft') player.x -= 10;
    if (e.key === 'ArrowRight') player.x += 10;
});

setInterval(() => {
    spawnEnemy();
}, 1000);

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}
gameLoop();
