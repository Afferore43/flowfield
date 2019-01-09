p5.disableFriendlyErrors = true;

var zMove = 0.0;
var xMove = 0.0;
var yMove = 0.0;

var scl = 0.001;
var keySpeed = 0.05;
var zSpeed = 0.001;
var xSpeed = scl / 2.0;

var moveNoise = true;
var moveParticles = true;

var particles = [];
var particleCount = 1000;

var showInfo = false;
var showHelp = false;

const keyboard_controls = ["keyboard controls","","[f] fullscreen on/off","[i] show/hide info", "[?] show/hide keyboard controls", "[+/-] add/subtract 50 from max points","[arrows] move flowfield","[space] stop/star point movement","[n] stop/star flowfield movement","[r] set noise to random position"];

function draw() {
    if(moveParticles) {
        if (particles.length < particleCount) {
            addParticles(1);
        } else if(particles.length > particleCount) {
            deleteParticles(1);
        }
        if(moveNoise) {
            zMove += zSpeed;
            xMove += xSpeed;
        }
        background(0,0,0,10);

        for(var i=0; i<particles.length; i++) {
            particles[i].calculateForce();
            particles[i].update();
            particles[i].show();
            particles[i].edges();
        }
    }
    if(showInfo) {
        var h = 40;
        fill(0);
        rect(0,height-h,width-10,h-10)
        
        strokeWeight(1);
        
        //stroke(0);
        fill(0,0,255);
        textSize(15);
        var t = "fps: " + floor(frameRate()) + ", points: " + particles.length + ", max points: " + particleCount;
        text(t,10,height-18);
    }
    
    if(showHelp) {
        var sx = 20;
        var sy = 20;
        
        fill(0);
        rect(sx,sy,min(265,width),min(keyboard_controls.length*30, height));
        
        textSize(15);
        fill(0,0,255);
        
        for(var i = 0; i<keyboard_controls.length; i++) {
            text(keyboard_controls[i],sx+10,sy+20+i*30);
        }
    }
}

function calculateForce(x,y) {
    return noise(x*scl+xMove,y*scl+yMove,zMove);
}
function addParticles(num) {
    for(var i=0; i<num; i++) {
        particles.unshift(new Particle());
    }
}
function deleteParticles(num) {
    for(var i=0; i<num; i++) {
        particles.pop();
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    colorMode(HSB, 255);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function keyPressed() {
  if (keyCode === 70) { // F
    var fs = fullscreen();
    fullscreen(!fs);
  } else if (keyCode === 73) { // I
      showInfo = !showInfo;
      if(!showInfo) {
          moveParticles = true;
      }
  } else if (keyCode === 187) { // +
      particleCount += 50;
  } else if (keyCode === 189) { // -
      particleCount -= 50;
      if (particleCount < 1) {
          particleCount = 1;
      }
  } else if (keyCode === 191) { // ?
      showHelp = !showHelp;
      if(!showHelp) {
          moveParticles = true;
      }
  } else if (keyCode === UP_ARROW) {
    yMove += keySpeed;
  } else if (keyCode === DOWN_ARROW) {
    yMove -= keySpeed;
  } else if (keyCode === RIGHT_ARROW) {
    xMove -= keySpeed;
  } else if (keyCode === LEFT_ARROW) {
    xMove += keySpeed;
  } else if (keyCode === 32) { // Space
    moveParticles = !moveParticles;
  } else if (keyCode === 78) { // N
    moveNoise = !moveNoise;
  } else if (keyCode === 82) { // R
    xMove = random();
    yMove = random();
    zMove = random();
  }
}