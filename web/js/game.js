var player;
var joystick;
var gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

var game = new Phaser.Game(gameConfig);

var joystickPosition = { x: 0, y: 0 };  // Хранение текущей позиции джойстика

function preload() {
    // Загрузить изображения
    this.load.image('player', 'assets/player.png');
}

function create() {
    // Инициализация игрока
    player = this.physics.add.sprite(400, 300, 'player');
    player.setCollideWorldBounds(true);

    // Слушатель событий для джойстика
    const joystickElem = document.getElementById('joystick');

    joystickElem.addEventListener('mousedown', startJoystickMove);
    joystickElem.addEventListener('touchstart', startJoystickMove);
    window.addEventListener('mousemove', moveJoystick);
    window.addEventListener('touchmove', moveJoystick);
    window.addEventListener('mouseup', stopJoystickMove);
    window.addEventListener('touchend', stopJoystickMove);
}

function update() {
    // Двигаем игрока на основе позиции джойстика
    const speed = 5;
    player.x += joystickPosition.x * speed;
    player.y += joystickPosition.y * speed;
}

function startJoystickMove(event) {
    // Начало перемещения джойстика
    event.preventDefault();  // Отключаем стандартное поведение
    joystickPosition = getJoystickDirection(event);
}

function moveJoystick(event) {
    // Обновляем направление джойстика во время движения
    event.preventDefault();
    if (joystickPosition) {
        joystickPosition = getJoystickDirection(event);
        updateJoystickUI(joystickPosition);
    }
}

function stopJoystickMove() {
    // Останавливаем джойстик
    joystickPosition = { x: 0, y: 0 };
    updateJoystickUI(joystickPosition);
}

function getJoystickDirection(event) {
    // Получаем координаты и конвертируем их в координаты джойстика
    const joystickElem = document.getElementById('joystick');
    const joystickContainer = document.getElementById('joystick-container');
    const joystickCenter = {
        x: joystickContainer.offsetLeft + joystickContainer.offsetWidth / 2,
        y: joystickContainer.offsetTop + joystickContainer.offsetHeight / 2
    };

    const mouseX = event.touches ? event.touches[0].clientX : event.clientX;
    const mouseY = event.touches ? event.touches[0].clientY : event.clientY;

    const dx = mouseX - joystickCenter.x;
    const dy = mouseY - joystickCenter.y;

    const maxDistance = joystickContainer.offsetWidth / 2;

    // Нормализуем значения
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);
    const angle = Math.atan2(dy, dx);

    const x = distance / maxDistance * Math.cos(angle);
    const y = distance / maxDistance * Math.sin(angle);

    return { x, y };
}

function updateJoystickUI(position) {
    // Обновляем стиль джойстика
    const joystickElem = document.getElementById('joystick');
    joystickElem.style.transform = `translate(${position.x * 50}px, ${position.y * 50}px)`;
}
