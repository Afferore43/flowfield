p5.disableFriendlyErrors = true;

var zMove = 0.0;
var xMove = 0.0;
var yMove = 0.0;

var scl = 0.001;
var keySpeed = 0.05;
var zSpeed = 0.005;
var xSpeed = scl;

var moveNoise = true;
var moveParticles = true;

var particles = [];
var particleCount = 1000;

var showInfo = false;
var showHelp = false;

function setup() {
    document.body.style.backgroundColor = "black";
    
    colorMode(HSB, 255);
    
    createCanvas(windowWidth, windowHeight);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



function calculateForce(x,y) {
    return noise(x*scl+xMove,y*scl+yMove,zMove);
}

function draw() {
    if(moveParticles) {
        if (particles.length < particleCount) {
            addParticles(1);
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
        t = ["keyboard controls","","[f] fullscreen on/off","[i] show/hide info", "[?] show/hide keyboard controls", "[+/-] add/delete 100 points","[arrows] move flowfield","[space] stop/star point movement","[n] stop/star noise movement","[r] set noise to random position"]
        var sx = 20;
        var sy = 20;
        
        fill(0);
        rect(sx,sy,min(250,width),min(t.length*30, height));
        
        textSize(15);
        fill(0,0,255);
        
        for(var i = 0; i<t.length; i++) {
            
            text(t[i],sx+10,sy+20+i*30);
        }
    }
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

function keyPressed() {
    console.log(keyCode);
  if (keyCode === 70) { // F
    var fs = fullscreen();
    fullscreen(!fs);
  } else if (keyCode === 73) { // I
      showInfo = !showInfo;
      if(!showInfo) {
          moveParticles = true;
      }
  } else if (keyCode === 187) { // +
      addParticles(100);
  } else if (keyCode === 189) { // -
      deleteParticles(100);
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

