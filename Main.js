// Constants
const ZOMBIES_RADIUS = 1;
const MAX_ZOMBIES = 5;
const SPEED = 7;
const SHOOT_SPEED = 15;
const SCREEN_WIDTH = 1830;
const SCREEN_HEIGHT = 700;
const GUN_SPEED = 4; // Reduced gun speed

// Game state variables
let bullets = [];
let zombies = [];
let gameEnded = true;
let gameStarted = false;
let gun;
let mySound;
let images = {
  bg: null,
  gun1: null,
  gun2: null,
  gun3: null,
  gun4: null,
  gun5: null,
  gun6: null // Bullet image
};

// Load the sound and images.
function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('pixel-fight-8-bit-arcade-music-background-music-for-video-208775');
  images.bg = loadImage('goran-pesic-artstation-bg5.jpg');
  images.gun1 = loadImage('image 8.png');
  images.gun2 = loadImage('image 7.png');
  images.gun3 = loadImage('image 6.png');
  images.gun4 = loadImage('image 9.png');
  images.gun5 = loadImage('image 20.png');
  images.gun6 = loadImage('image 13.png'); // Bullet image
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  background(images.bg);
  gun = new Gun('image 13.png', images.gun1, images.gun2, images.gun3, images.gun4, images.gun5, images.gun6);
  if (!gameStarted) {
    displayStartMessage();
  }
  mySound.loop();
}

function draw() {
  if (gameStarted) {
    background(100);
    updateZombies();
    updateBullets();
    checkCollisions();
    gun.displayAndMove();
    if (zombies.length === 0) {
      endGame();
    }
  }
}

function keyPressed() {
  if (key === 'Enter' || key === 'Backspace') {
    startGame();
  } else if (keyCode === 340) {
    shootBullet();
  }
}

function updateZombies() {
  for (let i = 0; i < zombies.length; i++) {
    let zombie = zombies[i];
    zombie.display();
    zombie.move();
  }
}

function updateBullets() {
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    bullet.display();
    bullet.move();
	}
}

    
function checkCollisions() {
  // No changes needed here, the collisions with the zombies are already handled
}

function displayStartMessage() {
  fill(200);
  textAlign(CENTER);
  textSize(45);
  fill('yellow');
  text('Welcome! Press Enter To Start Playing With The Zombies', SCREEN_WIDTH /3, SCREEN_HEIGHT / 2.8);
}

function startGame() {
  gameStarted = true;
  for (let i = 0; i < MAX_ZOMBIES; i++) {
    zombies.push(new Zombie(random(SCREEN_WIDTH), random(SCREEN_HEIGHT)));
  }
}

function drawGameOverScreen() {
  clear()
  textAlign(CENTER)
  textSize(50)
  fill('rgb(243,4,4)')
  text("Game Over Out, Game Over...", windowWidth / 2, windowHeight / 2)
  text("Press <ENTER>", windowWidth / 2, windowHeight / 2 + 100)
}

function shootBullet() {
  bullets.push(new Bullet(gun.gunX, gun.gunY, mouseX, mouseY));
}

class Zombie {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = SPEED;
  }

  display() {
    image(images.gun6, this.x, this.y); // Use the zombie image
  }

  move() {
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let dist = sqrt(dx * dx + dy * dy);
    this.x += (dx / dist) * this.speed;
    this.y += (dy / dist) * this.speed;
  }
}

class Bullet {
  constructor(x, y, tx, ty) {
    this.x = x;
    this.y = y;
    this.tx = tx;
    this.ty = ty;
    this.speed = SHOOT_SPEED;
  }

  display() {
    image(images.gun6, this.x, this.y); // Use the bullet image
  }

  move() {
    let dx = this.tx - this.x;
    let dy = this.ty - this.y;
    let dist = sqrt(dx * dx + dy * dy);
    this.x += (dx / dist) * this.speed;
    this.y += (dy / dist) * this.speed;
  }
}

class Gun {
  constructor(name, img1, img2, img3, img4, img5, bulletImg) {
    this.name = name;
    this.images = [img1, img2, img3, img4, img5];
    this.bulletImg = bulletImg; // Bullet image
    this.x = 0; // Starting position of the gun
    this.y = SCREEN_HEIGHT / 2;
    this.gunX = this.x;
    this.gunY = this.y;
    this.speed = GUN_SPEED; // Reduced gun speed
    this.gunWidth = 200; // Width of the gun
  }

  displayAndMove() {
    // Move the gun continuously from left to right
    this.gunX = (this.gunX + this.speed) % (SCREEN_WIDTH + this.gunWidth * this.images.length);

    // Display the gun images
    for (let i = 0; i < this.images.length; i++) {
      image(this.images[i], this.gunX + i * this.gunWidth, this.gunY);
    }
  }
}
