
class Joystick {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.maxDistance = 100;
        this.touch = null;
        this.createJoystick();
    }

    createJoystick() {
        this.joystick = document.createElement('div');
        this.joystick.style.position = 'absolute';
        this.joystick.style.width = '100px';
        this.joystick.style.height = '100px';
        this.joystick.style.borderRadius = '50%';
        this.joystick.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        this.joystick.style.bottom = '50px';
        this.joystick.style.left = '50px';
        document.body.appendChild(this.joystick);

        // Обработчики для перетаскивания
        this.joystick.addEventListener('touchstart', this.startDrag.bind(this));
        this.joystick.addEventListener('touchmove', this.moveJoystick.bind(this));
        this.joystick.addEventListener('touchend', this.endDrag.bind(this));
    }

    startDrag(event) {
        event.preventDefault();
        const touch = event.touches[0];
        this.touch = touch;
    }

    moveJoystick(event) {
        if (!this.touch) return;

        const touch = event.touches[0];
        const dx = touch.pageX - this.touch.pageX;
        const dy = touch.pageY - this.touch.pageY;

        const distance = Math.min(Math.sqrt(dx * dx + dy * dy), this.maxDistance);
        this.x = (dx / distance) * this.maxDistance;
        this.y = (dy / distance) * this.maxDistance;

        this.joystick.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    endDrag() {
        this.touch = null;
        this.x = 0;
        this.y = 0;
        this.joystick.style.transform = `translate(0px, 0px)`;
    }

    getDirection() {
        return { x: this.x, y: this.y };
    }
}

// Инициализируем джойстик
var joystick = new Joystick();
