const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Размеры игрового поля
canvas.width = 800; // Ширина экрана
canvas.height = 600; // Высота экрана
// Размеры игрового поля
const width = canvas.width;
const height = canvas.height;

// Персонаж
const player = {
  x: 100,
  y: 100,
  width: 32,
  height: 32,
  speed: 10,
  health: 100,
  attackSpeed: 1, // скорость атаки
  attackCooldown: 0,
  level: 1,
  experience: 0,
  experienceToLevel: 100, // Количество опыта для повышения уровня
  damage: 10, // Урон персонажа
};

// Мобы
const enemies = [
    { x: 300, y: 300, width: 32, height: 32, health: 50 },
    { x: 500, y: 500, width: 32, height: 32, health: 50 }
  ];
  function generateEnemy() {
    // Создаем моба в случайной позиции
    const newEnemy = {
      x: Math.random() * (width - 32), // случайная позиция по оси X
      y: Math.random() * (height - 32), // случайная позиция по оси Y
      width: 32,
      height: 32,
      health: 50
    };
  
    // Добавляем нового моба в массив enemies
    enemies.push(newEnemy);
  }
  
  // Запуск создания новых мобов каждые 3 секунды
  setInterval(generateEnemy, 3000);
// Функция для отрисовки
function draw() {
  ctx.clearRect(0, 0, width, height);

  // Рисуем игрока
  ctx.fillStyle = 'green';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Рисуем врагов
  enemies.forEach(enemy => {
    ctx.fillStyle = 'red';
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  });

  // Отображаем информацию о игроке
  ctx.fillStyle = 'black';
  ctx.fillText(`Level: ${player.level}   XP: ${player.experience}/${player.experienceToLevel}`, 10, 20);
}

// // Функция для обработки движения
// function movePlayer(dx, dy) {
//   player.x += dx;
//   player.y += dy;
//   checkCollisions();
// }

// Проверка столкновений
function checkCollisions() {
  enemies.forEach(enemy => {
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      // Если персонаж столкнулся с врагом
      console.log('Столкновение с врагом!');
      enemy.health -= player.damage;  // Враг получает урон

      // Если враг мертв
      if (enemy.health <= 0) {
        console.log('Враг убит!');
        // Удаляем врага из игры
        const index = enemies.indexOf(enemy);
        if (index !== -1) {
          enemies.splice(index, 1);
          // Получаем опыт
          player.experience += 50;
          checkLevelUp();
        }
      }
    }
  });
}

// Проверка на повышение уровня
function checkLevelUp() {
  if (player.experience >= player.experienceToLevel) {
    player.level++;
    player.experience -= player.experienceToLevel;
    player.experienceToLevel = Math.floor(player.experienceToLevel * 1.5); // Увеличиваем опыт для следующего уровня
    console.log(`Уровень повышен! Новый уровень: ${player.level}`);
  }
}


const joystick = new JoyStick({
  container: document.body,   // Контейнер для джойстика (можно выбрать любой элемент)
  size: 100,                  // Размер джойстика
  sticky: true,               // Держать джойстик на месте после отпускания
  transparent: true,          // Прозрачность
  moveSpeed: 5                // Скорость движения
});

// Обработка движения
function update() {
  const move = joystick.getDirection();
  if (move) {
    // Используй move.x и move.y для движения персонажа
    player.x += move.x * player.speed; // Изменяем координату X
    player.y += move.y * player.speed; // Изменяем координату Y
  }
  // Обновляем экран, например, рисуем персонажа
  renderPlayer();
  
  requestAnimationFrame(update);
}
update();

// Функция для отображения персонажа (например, рисуем его на холсте)
function renderPlayer() {
  const playerElement = document.getElementById('player');
  playerElement.style.left = `${player.x}px`;
  playerElement.style.top = `${player.y}px`;
}


// Отрисовываем игру
function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
