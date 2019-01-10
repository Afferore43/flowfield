function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.h = 0;
    this.z = int(random(numberOfSlices)) * sliceDistance;
    this.prevPos = this.pos.copy();

    this.update = function(timePassed) {
        this.vel.add(this.acc);
        this.vel.limit(maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }
  
    this.calculateForce = function() {
        var force = calculateForce(this.pos.x,this.pos.y,this.z);
        var vector = p5.Vector.fromAngle(force*accMultiplier);
        this.applyForce(vector);
        this.setHue(force);
    }
    this.setHue = function(force) {
        this.h = force*hueMultiplier;
        if (this.h > 255) {
            this.h = this.h%256;
        }
        stroke(this.h, 255, 255, visibility);
    }
    this.show = function() {
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    }
    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }
    this.edges = function() {
        if (this.pos.x > width || this.pos.x < 0 || 
            this.pos.y > height || this.pos.y < 0) {
            this.pos = createVector(random(width), random(height));
            this.vel = createVector(0, 0);
            this.updatePrev();
        }
    }
}