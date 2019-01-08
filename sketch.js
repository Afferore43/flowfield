p5.disableFriendlyErrors = true;

var zMove = 0.0;
var xMove = 0.0;

var scl = 0.001;

var particles = [];
var particleCount = 1500;

var showInfo = false;
var showHelp = false;

function setup() {
    document.body.style.backgroundColor = "black";
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < 10; i++) {
        particles[i] = new Particle();
    }
    colorMode(HSB, 255);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function calculateForce(x,y) {
    return noise(x*scl+xMove,y*scl,zMove);
}

function draw() {
    if (particles.length < particleCount) {
        addParticles(1);
    }
    zMove += 0.01;
    xMove += 0.001;
    background(0,0,0,10);
    
    for(var i=0; i<particles.length; i++) {
        particles[i].calculateForce();
        particles[i].show();
        particles[i].update();
        particles[i].edges();
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
        t = ["keyboard controls","","[f] fullscreen on/off","[i] show/hide info", "[?] show/hide keyboard controls", "[+/-] add/delete 100 points"]
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
    console.log(keyCode)
  if (keyCode === 70) { // F
    var fs = fullscreen();
    fullscreen(!fs);
  } else if (keyCode === 73) { // I
      showInfo = !showInfo;
  } else if (keyCode === 187) { // +
      addParticles(100);
  } else if (keyCode === 189) { // -
      deleteParticles(100);
  } else if (keyCode === 191) { // ?
      showHelp = !showHelp;
  }
}

