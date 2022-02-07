// fields
var col = ["red", "orange", "yellow", "green", "blue", "purple"];
var code = [];

// only once
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,20);
  noStroke();
  
  //computer picks code 
  for(i = 0; i<4; i++) {
    code.push(random(col));
  }
}

// gets called every frame
function draw() {
  background(0,8);
  
  // practice: show computer's code
  for(i=0; i<code.length; i++) {
    var one = new Peg(code[0], 50, 30);
    var two = new Peg(code[1], 100, 30);
    var three = new Peg(code[2], 150, 30);
    var four = new Peg(code[3], 200, 30);
  }
  
}

// mouse moved
function mouseMoved() {

}

// mouse pressed
function mousePressed() {

}

// mouse dragged
function mouseDragged() {

}  

// mouse released
function mouseReleased() {

}

class Peg {
  constructor(col, xval, yval) {
    this.col = col;
    
    this.x = xval; 
    this.y = yval; 

    this.rad = 20; 
  }

  display() {
    //background colour change
    fill(this.col);

    stroke(0); 
    strokeWeight(2);
    circle(this.x, this.y, this.rad*2);
  }
}

class Button {
  constructor(col, xval, yval) {
    this.col = col;
    
    this.x = xval; 
    this.y = yval; 

    this.rad = 20; 

    this.on = false;
  }

  display() {
    //background colour change
    if(this.on) fill(this.col, 0.5);
    else fill(this.col);

    stroke(0); 
    strokeWeight(2);
    circle(this.x, this.y, this.rad*2); //centre x and y
  }
  
  isOn(xval, yval) {
    if(xval > this.x - this.rad && xval < this.x + this.rad) {
      if(yval > this.y - this.rad && yval < this.y + this.rad) {
        this.on = true;
        return;
      }
    }
    this.on = false;
  }
}
