var player;
var joystickElem;
var joystickContainer;
var isMouseDown = false;
var joystickPosition = { x: 0, y: 0 };

var gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
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

function preload() {
    this.load.image('player', 'assets/player.png');
}

function create() {
    // Инициализация игрока
    player = this.physics.add.sprite(400, 300, 'player');
    player.setCollideWorldBounds(true);

    // Слушаем клики и касания по всему игровому контейнеру
    this.input.on('pointerdown', startJoystickMove, this);
    this.input.on('pointermove', moveJoystick, this);
    this.input.on('pointerup', stopJoystickMove, this);

    // Создаем контейнер для джойстика, но не привязываем его к игровому полю
    joystickContainer = document.createElement('div');
    joystickContainer.id = 'joystick-container';
    document.body.appendChild(joystickContainer);
    
    joystickContainer.style.position = 'absolute';
    joystickContainer.style.width = '12%';
    joystickContainer.style.height = '12%';
    joystickContainer.style.borderRadius = '50%';
    joystickContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    
    // Джойстик внутри контейнера
    joystickElem = document.createElement('div');
    joystickElem.id = 'joystick';
    joystickElem.style.width = '70%';
    joystickElem.style.height = '70%';
    joystickElem.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    joystickElem.style.borderRadius = '50%';
    joystickElem.style.position = 'absolute';
    joystickContainer.appendChild(joystickElem);
}

function update() {
    // Перемещение игрока в зависимости от джойстика
    if (isMouseDown) {
        const speed = 5;
        player.x += joystickPosition.x * speed;
        player.y += joystickPosition.y * speed;
    }
}

function startJoystickMove(pointer) {
    // Когда происходит клик или касание, устанавливаем позицию контейнера джойстика
    const containerX = pointer.x - joystickContainer.offsetWidth / 2;
    const containerY = pointer.y - joystickContainer.offsetHeight / 2;
    
    joystickContainer.style.left = `${containerX}px`;
    joystickContainer.style.top = `${containerY}px`;
    
    isMouseDown = true;
    joystickPosition = { x: 0, y: 0 }; // Сброс позиции джойстика
}

function moveJoystick(pointer) {
    if (isMouseDown) {
        // Расстояние от центра контейнера
        const joystickCenter = {
            x: joystickContainer.offsetLeft + joystickContainer.offsetWidth / 2,
            y: joystickContainer.offsetTop + joystickContainer.offsetHeight / 2
        };

        const dx = pointer.x - joystickCenter.x;
        const dy = pointer.y - joystickCenter.y;

        const maxDistance = joystickContainer.offsetWidth / 2;
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);
        const angle = Math.atan2(dy, dx);

        const x = distance / maxDistance * Math.cos(angle);
        const y = distance / maxDistance * Math.sin(angle);

        joystickPosition = { x, y };

        // Обновляем позицию джойстика внутри контейнера
        joystickElem.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
    }
}

function stopJoystickMove() {
    isMouseDown = false;
    joystickPosition = { x: 0, y: 0 };
    joystickElem.style.transform = 'translate(0, 0)';
}
