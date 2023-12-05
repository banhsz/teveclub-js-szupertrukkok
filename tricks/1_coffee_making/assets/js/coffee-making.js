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
var camel1 = new Image();
camel1.src = 'assets/img/tr2_0a.gif';
var camel2 = new Image();
camel2.src = 'assets/img/tr2_0a_r.gif';
var cofeeMachine = new Image();
cofeeMachine.src = 'assets/img/coffee_machine.png';
var camelLeaving = false;
var camelComing = false;
var camelMakingCoffee = false;
var brewingAnimDuration = 100;
var brewingAnimState = 0;
var camel2x = 0;
var camel2y = 220;

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

    // Draw action buttons
    ctx.drawImage(coffee1, 0, 0, 100, 100);
    ctx.drawImage(coffee2, 140, 0, 100, 100);
    ctx.drawImage(coffee3, 280, 0, 100, 100);

    // Draw camels
    if (!camelMakingCoffee) ctx.drawImage(camel1, 180, 220, 180, 180);
    if (!camelLeaving) ctx.drawImage(camel2, camel2x, 220, 180, 180);

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
}

// Input listeners
// document.addEventListener('keydown', handleKeyDown);
document.addEventListener('click', handleClick);
// Input handlers
function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {

    } else if (event.key === 'ArrowRight') {

    }
}
function handleClick(event) {
    let x = event.offsetX;
    let y = event.offsetY;

    // Handle selection, if click was not on a coffee, then return
    if (!handlePick(x, y)) return;

    // Block input while animation plays
    canvas.style.pointerEvents = "none";
    setTimeout(enableInput, 4000);

    brewingAnimState = 0;
    animMakeCoffee();
}

// Utils
function enableInput() {
    canvas.style.pointerEvents = "auto";
}
function handlePick(x, y) {
    // TODO There must be a better way
    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
        camelPickedCoffee === 1 ? score += getRandomInt(10) : score -= getRandomInt(25);
        return true;
    } else if (x >= 140 && x <= 240 && y >= 0 && y <= 100) {
        camelPickedCoffee === 2 ? score += getRandomInt(10) : score -= getRandomInt(25);
        return true;
    } else if (x >= 280 && x <= 380 && y >= 0 && y <= 100) {
        camelPickedCoffee === 3 ? score += getRandomInt(10) : score -= getRandomInt(25);
        return true;
    }
    return false;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1
}

// Animations
function animCamelLeave() {
    console.log('leaving');
    camelLeaving = true;
    ctx.drawImage(camel1, camel2x, camel2y, 180, 180);
    camel2x -= 3;

    console.log(camel2x);
    if (camel2x > -200) {
        requestAnimationFrame(animCamelLeave);
    } else {
        camelLeaving = false;
        animCamelComing();
    }
}
function animCamelComing() {
    // New coffee
    camelPickedCoffee = getRandomInt(3);

    camelComing = true;
    ctx.drawImage(camel2, camel2x, camel2y, 180, 180);
    camel2x += 3;

    console.log(camel2x);
    if (camel2x < 0) {
        requestAnimationFrame(animCamelComing);
    } else {
        camel2x = 0;
        camelComing = false;
    }
}
function animMakeCoffee() {
    camelMakingCoffee = true;
    ctx.drawImage(camel2, 180, 220, 180, 180);

    // Draw Machine FIXME ugly workaround for layer issues
    ctx.drawImage(cofeeMachine, 320, 200, 80, 80);

    brewingAnimState += 1;
    console.log(brewingAnimState);
    if (brewingAnimState < brewingAnimDuration) {
        requestAnimationFrame(animMakeCoffee);
    } else {
        camelMakingCoffee = false;
        animCamelLeave();
    }
}

