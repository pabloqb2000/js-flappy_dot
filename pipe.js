class Pipe {
    constructor() {
        this.pos = createVector(width/2, 0);
        this.corner1 = random(height/2 - 40, -height/2 + pipeSpace + 40);
        this.corner2 = this.corner1 - pipeSpace;
        this.scored = false;
        this.lastDispl = 0;
    }

    update() {
        this.pos.x -= pipeVel;

        if(difficulty >= 2) {
            let d = (noise(frame/1000, this.pos.x/1000)*2 - 1) * 100;
            this.corner1 += d - this.lastDispl;
            this.corner2 += d - this.lastDispl;
            this.lastDispl = d;            
        }
    }

    draw() {
        fill(105, 227, 86);
        // Up pipe
        rect(this.pos.x + 2, height/2, pipeWidth - 4, -height/2 + this.corner1);
        // Down pipe
        rect(this.pos.x + 2, -height/2, pipeWidth - 4, height/2 + this.corner2);
        
        // Thicker part
        stroke(32);
        strokeWeight(0.5);
        rect(this.pos.x, this.corner1, pipeWidth, 20);
        rect(this.pos.x, this.corner2, pipeWidth, -20);
    }
}