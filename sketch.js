// fields
var col = ["red", "orange", "yellow", "green", "blue", "purple"];
var code = [];
var maxGuess = 12;

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
  background(255);
  
  // practice: show computer's code
  for(i=0; i<code.length; i++) {
    var rest = new Peg(code[i], windowWidth-10, 50+(i*50));
    rest.display();
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

    this.rad = (windowWidth/(maxGuess+2) - 20); 
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

    this.rad = (windowWidth/(maxGuess+2) - 20); 

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
