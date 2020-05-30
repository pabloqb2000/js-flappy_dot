let mouseUp = true;
let factors = [1, 1.15, 1.3];
let intro = 0, introLen = 90;

function startMenu() {
    // Tittle
    textSize(45);
    fill(200);
    textAlign(CENTER);
    textStyle(BOLD);
    text("Flappy dot", 0, -height/2 + 65);
    // Draw player
    ellipse(0, -height/2 + 120, 60, 60);
    fill(32);
    ellipse( 10, -height/2 + 120 - 10, 10, 10);
    ellipse(-10, -height/2 + 120 - 10, 10, 10);

    // Play
    fill(105, 227, 86);
    textSize(mouseX < width/2 && intro >= introLen ? 60 : 40);
    text("Play!", -width/4, 0);

    // Difficulty
    fill(colors[difficulty]);
    textSize(40);
    if(mouseX >= width/2 && intro >= introLen) {
        textSize(20);
        text("Change difficulty", width/4, 30);
        textSize(60);
    }
    let l = ["Easy", "Medium", "Hardcore"];
    text(l[difficulty], width/4, 0);
    // Record
    text("Record: " + records[difficulty].toString(), width/4, height/4);

    //Intro
    if(intro < introLen) {
        background(32, 255 - (intro/introLen)**3*255);
        intro++;
    }


    // Input
    if(mouseIsPressed && intro >= introLen) {
        if(mouseX < width/2) startGame(factors[difficulty]);
        else if(mouseUp) {
            difficulty = (difficulty + 1) % 3;
            mouseUp = false;
        }
    } else {
        mouseUp = true;
    }
}

function startGame(factor = 1) {
    jumpVel = 10 * factor;
    gravity = 0.6 * factor;
    playerSize = 25 * factor;
    playerColor = colors[difficulty];
    points = 0;
    pipeSpace = 200 / factor;
    pipeVel = 6 * factor;
    pipeWidth = 60 * factor;
    frame = 0;
    pipeSpawnRate = round(60 / factor);
    pipes = [];
    player = new Dot();
}