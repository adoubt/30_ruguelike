import Phaser from 'phaser';


var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var player;
var cursors;

var game = new Phaser.Game(config);

function preload() {
  // Загрузите изображения или спрайты
  this.load.image('player', 'assets/player.png');
}

function create() {
  // Инициализация игрока
  player = this.physics.add.sprite(400, 300, 'player');
  player.setCollideWorldBounds(true);

  
  // Инициализация джойстика
  joystick = new Joystick();
  
}

// Обновление с использованием джойстика
function update() {
  const direction = joystick.getDirection();

  // Перемещение персонажа на основе джойстика
  player.x += direction.x / 10;  // Настроить чувствительность
  player.y += direction.y / 10;
}