let player = null;
let jumpVel, gravity;
let playerSize, playerColor;
let difficulty = 0, records = [0, 0, 0], points, frame;
let pipes = [];
let pipeSpace, pipeVel, pipeWidth, pipeSpawnRate;
let colors;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(32);

	/*// Create UI elements
	sld = new Slider(start=0, end=255, value=32, 0, 0, width/12, height/60, null, "Background");
	btn = new Button(x=0, y=0, width/12, height/30, "Reset", resetValue);*/

	colors = [color(86, 210, 227), color(227, 226, 86), color(227, 103, 86)];

	/*// Start UI
	UI.tableWidth = 1;
	UI.tableHeight = 100;
	UI.distrubute();*/
}

function draw() {
	// Draw UI
	background(32);
	UI.update();
	UI.draw();

	translate(width/2, height/2);
	if(player == null) {
		startMenu();
	} else {
		scale(1,-1);
		// Spawn pipes
		if(frame % pipeSpawnRate == 0) {
			pipes.push(new Pipe());
		}

		// Update pipes
		for(let p of pipes) {
			p.update();
		}
		// Give points
		if(pipes[0].pos.x - pipeWidth < player.pos.x && !pipes[0].scored) {
			pipes[0].scored = true;
			points++;
		}
		// Remove first pipe if finished
		if(pipes[0].pos.x < -width/2 - pipeWidth) {
			pipes.splice(0,1);
		}

		// Update player
		let died = player.update();
		if(died) {
			player = null;
			intro = 0;
			introLen = 20;
			return;
		}

		// Draw player
		noStroke();
		player.draw();

		// Draw pipes
		for(let p of pipes) {
			p.draw();
		}

		scale(1,-1);
		// Update and draw points
		textAlign(LEFT);
		textSize(playerSize*1.5);
		fill(200);
		text(points.toString(), -width/2 + 20, -height/2 + 20 + playerSize*1.5);

		// Update and draw record
		let record = records[difficulty];
		record = record > points ? record : points;
		textAlign(RIGHT);
		text("Record: " + record.toString(), width/2 - 20, -height/2 + 20 + playerSize*1.5);
		records[difficulty] = record;

		frame++;
	}	
}

function mouseDragged() {
	UI.mouseDragged();
}

function mousePressed() {
	UI.mouseClicked();
	if(player != null) player.jump();
}

function keyPressed() {
	if(keyCode == 32 || keyCode == 18){ // Spacebar / Enter
		if(player != null) player.jump();
	}
}
