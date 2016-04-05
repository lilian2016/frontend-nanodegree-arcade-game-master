// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //Setting the Enemy initial location
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 50;
    this.direction = 1; //right

    //Setting the Enemy speed 
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed = Math.floor(Math.random() * 250 + 50);

    this.checkCollisions();

    /*this.x = this.x + this.speed * dt;
    if (this.x > 500) {
      this.x = 1;
    }*/
    this.loc(dt);
    //this.picture();
    //this.move(dt);

};




// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {

    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y + this.height > player.y &&
        this.y < player.y + player.height) {
        prompt("You Got Squashed By The Bug!");
        player.reset();
    }
}

Enemy.prototype.loc = function(dt) {
    if (this.x + dt * this.speed > 500) {
        this.direction = 2;// left direction
        this.x = this.x - dt * this.speed;
        this.sprite = 'images/enemy-bug-head-left-copy.png';
    } else if (this.x - dt * this.speed < 0) {
        this.direction = 1; //right direction
        this.x = this.x + dt * this.speed;
        this.sprite = 'images/enemy-bug.png';
    }
};


/*Enemy.prototype.move = function(dt) {
    if (this.direction == 2) {
        this.x = this.x - (dt * this.speed);
        this.sprite = 'images/enemy-bug-head-left-copy.png';
    } else if (this.direction == 1) {
        this.x = this.x + (dt * this.speed);
        this.sprite = 'images/enemy-bug.png';
    }
};*/

/*Enemy.prototype.picture = function() {
    if (this.direction == 1) {
        this.sprite = 'images/enemy-bug.png';
    } else if (this.direction == 2) {
        this.sprite = 'images/enemy-bug-head-left-copy.png';
    }
};*/


// Now write your own player class
// This class requires an update(), render() and
var Player = function(x, y) {
    //Setting the Player's initial location
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 50;
    this.sprite = 'images/char-boy.png';
};


Player.prototype.update = function() {

};


Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case 'left': //press left button on the keyboard to move to left
            this.x = this.x - 30;
            if (this.x < -15) {
                this.x = -15;
            }
            break;
        case 'right':
            this.x = this.x + 30;
            if (this.x > 420) {
                this.x = 420;
            }
            break;
        case 'up':
            this.y = this.y - 30;
            if (this.y < 5) {
                this.x = 200;
                this.y = 400;
            }
            break;
        case 'down':
            this.y = this.y + 30;
            if (this.y > 400) {
                this.y = 400;
            }
            break;
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(0, 55, 3),
    new Enemy(0, 140, 200),
    new Enemy(0, 145, 70),
    new Enemy(0, 225, 2)
];



var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});