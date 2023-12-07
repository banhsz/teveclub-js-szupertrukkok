// Game canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Settings / Game elements
let gameSpeed = 10;
var camelPickedCoffee = Math.floor(Math.random() * 3) + 1;
var score = 0;
var coffee1 = new Image();
    coffee1.src = 'assets/img/coffee_1.png';
var coffee2 = new Image();
    coffee2.src = 'assets/img/coffee_2.png';
var coffee3 = new Image();
    coffee3.src = 'assets/img/coffee_3.png';
// FIXME: bad and unsustainable on the long run
var camel1 = new Image();
    camel1.src = '../../common/img/camel_f_d_l.png';
var camel2 = new Image();
    camel2.src = '../../common/img/camel_m_d_l.png';
var camel3 = new Image();
    camel3.src = '../../common/img/camel_f_l_l.png';
var camel4 = new Image();
    camel4.src = '../../common/img/camel_m_l_l.png';
var camel5 = new Image();
    camel5.src = '../../common/img/camel_f_d_r.png';
var camel6 = new Image();
    camel6.src = '../../common/img/camel_m_d_r.png';
var camel7 = new Image();
    camel7.src = '../../common/img/camel_f_l_r.png';
var camel8 = new Image();
    camel8.src = '../../common/img/camel_m_l_r.png';
var cofeeMachine = new Image();
    cofeeMachine.src = 'assets/img/coffee_machine.png';
var healthImg = new Image();
    healthImg.src = '../../common/img/health.png';
var healthLostImg = new Image();
    healthLostImg.src = '../../common/img/health_lost.png';
var camelLeaving = false;
var camelComing = false;
var camelMakingCoffee = false;
var brewingAnimDuration = 100;
var brewingAnimState = 0;
var camel2x = 0;
var camel2y = 220;
var buyerCamel = getRandomInt(4);
var health = 3;
var gamePlaying = true;

// Main game loop
function gameLoop() {
    updateGame();
    drawGame();
}
setInterval(gameLoop, gameSpeed);
// Update game data
function updateGame() {

}
// Draw frame
function drawGame() {
    // Clear frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gamePlaying) {
        // Draw score
        ctx.font = "50px Arial";
        ctx.fillText("Játék vége!", 50, 100);
        ctx.fillText(score.toString() + " pont", 50, 170);
        ctx.font = "25px Arial";
        ctx.fillText("Új játék? Kattints!", 50, 270);
        return;
    }

    // Draw action buttons
    ctx.drawImage(coffee1, 0, 0, 100, 100);
    ctx.drawImage(coffee2, 140, 0, 100, 100);
    ctx.drawImage(coffee3, 280, 0, 100, 100);

    // Draw camels
    if (!camelMakingCoffee) ctx.drawImage(camel4, 180, 220, 160, 160);
    if (!camelLeaving) ctx.drawImage(getCamelForId(buyerCamel, 'right'), camel2x, 220, 160, 160);

    // Draw order
    if (!camelLeaving && !camelComing) {
        switch (camelPickedCoffee) {
            case 1:
                ctx.drawImage(coffee1, 90, 150, 70, 70);
                break;
            case 2:
                ctx.drawImage(coffee2, 90, 150, 70, 70);
                break;
            case 3:
                ctx.drawImage(coffee3, 90, 150, 70, 70);
                break;
        }
    }

    // Draw score
    ctx.font = "50px Arial";
    ctx.fillText(score.toString(), 250, 170);

    // Draw Machine
    ctx.drawImage(cofeeMachine, 320, 200, 80, 80);

    // Draw health
    (health === 3) ? ctx.drawImage(healthImg, 300, 360, 30, 30) : ctx.drawImage(healthLostImg, 300, 360, 30, 30);
    (health >= 2) ? ctx.drawImage(healthImg, 330, 360, 30, 30) : ctx.drawImage(healthLostImg, 330, 360, 30, 30);
    (health >= 1) ? ctx.drawImage(healthImg, 360, 360, 30, 30) : ctx.drawImage(healthLostImg, 360, 360, 30, 30);
}

// Input listeners
// document.addEventListener('keydown', handleKeyDown);
canvas.addEventListener('click', handleClick);
// Input handlers
function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {

    } else if (event.key === 'ArrowRight') {

    }
}
function handleClick(event) {
    if (!gamePlaying) {
        gamePlaying = true;
        score = 0;
        health = 3;
    } else {
        let x = event.offsetX;
        let y = event.offsetY;

        // Handle selection, if click was not on a coffee, then return
        if (!handlePick(x, y)) return;

        if (health === 0) {
            gamePlaying = false;
            return;
        }

        // Block input while animation plays
        canvas.style.pointerEvents = "none";
        setTimeout(enableInput, 4000);

        brewingAnimState = 0;
        animMakeCoffee();
    }
}

// Utils
function enableInput() {
    canvas.style.pointerEvents = "auto";
}
function handlePick(x, y) {
    // TODO There must be a better way
    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
        if(camelPickedCoffee === 1) {
            score += getRandomInt(20)
        } else {
            score -= getRandomInt(25);
            health -= 1;
        }
        return true;
    } else if (x >= 140 && x <= 240 && y >= 0 && y <= 100) {
        if(camelPickedCoffee === 2) {
            score += getRandomInt(20)
        } else {
            score -= getRandomInt(25);
            health -= 1;
        }
        return true;
    } else if (x >= 280 && x <= 380 && y >= 0 && y <= 100) {
        if(camelPickedCoffee === 3) {
            score += getRandomInt(20)
        } else {
            score -= getRandomInt(25);
            health -= 1;
        }
        return true;
    }
    return false;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1
}

// Animations
function animCamelLeave() {
    camelLeaving = true;
    ctx.drawImage(getCamelForId(buyerCamel, 'left'), camel2x, camel2y, 160, 160);
    camel2x -= 3;

    if (camel2x > -200) {
        requestAnimationFrame(animCamelLeave);
    } else {
        camelLeaving = false;
        // New coffee
        camelPickedCoffee = getRandomInt(3);
        // New camel
        buyerCamel = getRandomInt(4);
        animCamelComing();
    }
}
function animCamelComing() {

    camelComing = true;
    ctx.drawImage(getCamelForId(buyerCamel, 'right'), camel2x, camel2y, 160, 160);
    camel2x += 3;

    if (camel2x < 0) {
        requestAnimationFrame(animCamelComing);
    } else {
        camel2x = 0;
        camelComing = false;
    }
}
function animMakeCoffee() {
    camelMakingCoffee = true;
    ctx.drawImage(camel8, 180, 220, 160, 160);

    // Draw Machine FIXME ugly workaround for layer issues
    ctx.drawImage(cofeeMachine, 320, 200, 80, 80);

    brewingAnimState += 1;
    if (brewingAnimState < brewingAnimDuration) {
        requestAnimationFrame(animMakeCoffee);
    } else {
        camelMakingCoffee = false;
        animCamelLeave();
    }
}

function getCamelForId(id, facing) {
    // horrible tbh, but works
    if (facing === 'left') {
        switch (id) {
            case 1:
                return camel1;
            case 2:
                return camel2;
            case 3:
                return camel3;
            case 4:
                return camel4;
        }
    } else {
        switch (id) {
            case 1:
                return camel5;
            case 2:
                return camel6;
            case 3:
                return camel7;
            case 4:
                return camel8;
        }
    }
}

