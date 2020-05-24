class Dot {
    constructor(){
        this.pos = createVector(-5*width/12, 0);
        this.vel = jumpVel;
    }

    /**
     * @return true if the player died
     */
    update() {
        this.vel -= gravity;
        this.pos.y += this.vel;
        
        if(this.pos.y + playerSize/2 > height/2 || this.pos.y - playerSize/2 < -height/2) {
            return true;
        }

        return this.collidedWith(pipes[0]);
    }

    /**
     * @param pipe pipe to check collision to
     *
     * @return true if the player is colliding with the given pipe
     */
    collidedWith(pipe) {
        // Up pipe
        let closestPt = createVector(max(min(this.pos.x, pipe.pos.x + pipeWidth), pipe.pos.x),
                                     max(min(this.pos.y, height/2), pipe.corner1));
        if(closestPt.dist(this.pos) < playerSize/2) {
            return true;
        }

        // Down pipe
        closestPt = createVector(max(min(this.pos.x, pipe.pos.x + pipeWidth), pipe.pos.x),
                                 max(min(this.pos.y, pipe.corner2), -height/2));
        if(closestPt.dist(this.pos) < playerSize/2) {
            return true;
        }

        return false;
    }

    draw() {
        // Draw player
        fill(playerColor);
        ellipse(this.pos.x, this.pos.y, playerSize, playerSize);

        // Draw eyes
        fill(32);
        ellipse(this.pos.x + playerSize/6, this.pos.y + playerSize/6, playerSize/6, playerSize/6);
        ellipse(this.pos.x - playerSize/6, this.pos.y + playerSize/6, playerSize/6, playerSize/6);
    }

    jump() {
        this.vel = jumpVel;
    }
}