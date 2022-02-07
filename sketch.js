// fields
var col = ["red", "orange", "yellow", "green", "blue", "purple"];
var code = [];
var maxGuess = 12;
var buttons = [];

// only once
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,20);
  noStroke();
  
  //computer picks code 
  for(i = 0; i<4; i++) {
    code.push(random(col));
  }
  
  //create buttons 
  for(i = 0; i<col.length; i++) {
    buttons.push(new Button (col[i], 10, 50+(i*50)));
    print(col[i]);
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
  
  //show buttons
  for(i=0; i<buttons.length; i++) {
    buttons[i].display();
  }
  
}

// mouse moved
function mouseMoved() {
  //check buttons
  for(i=0; i<buttons.length; i++) {
    buttons[i].isOn(mouseX, mouseY);
  }
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
    
    noStroke();
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
    

    fill(this.col);
    stroke(0); 
    strokeWeight(2);
    circle(this.x, this.y, this.rad*2); //centre x and y
    
    // colour change
    if(this.on) {
      fill(255, 200);
      circle(this.x, this.y, this.rad*2);
    }
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
