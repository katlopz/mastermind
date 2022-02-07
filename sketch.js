// fields
var col = ["red", "orange", "yellow", "green", "blue", "purple"];
var code = [];
var maxGuess = 12;
var buttons = [];
var guesses = [];
var feedback = [];
var currentGuess = []; //just colour names
var gameOver = false;
var columnWidth = 0;
var radius = 0; 

//red = correct place, white = correct colour wrong place

// only once
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,20);
  noStroke();
  
  columnWidth = (windowWidth/(maxGuess+2));
  radius = (columnWidth*(2/3))/2;
  
  //computer picks code 
  for(i = 0; i<4; i++) {
    code.push(random(col));
  }
  
  //create buttons 
  for(i = 0; i<col.length; i++) {
    buttons.push(new Button (col[i], columnWidth/2, 50+(i*50)));
  }
}

// gets called every frame
function draw() {
  if(gameOver) return;
  background(255);
  
  // practice: show computer's code
  for(i=0; i<code.length; i++) {
    var rest = new Peg(code[i], windowWidth-(columnWidth/2), 50+(i*50));
    rest.display();
  }
  
  //show buttons
  for(i=0; i<buttons.length; i++) {
    buttons[i].display();
  }
  
  //show guesses
  for(i=0; i<guesses.length; i++) {
    for(j=0; j<4; j++) {
      guesses[i][j].display();
    }
  }
  
  //show feedback
  for(i=0; i<feedback.length; i++) {
    if(feedback[i] == null) continue;
    for(j=0; j<4; j++) {
      feedback[i][j].display();
    }
  }
  
  
  
  //show current guess
  for(i=0; i<currentGuess.length; i++) {
    currentGuess[i].display();
  }
  
  //check guess 
  if(currentGuess.length==4) {
    //check guess 
    addressed = [];
    rest = [];
    
    //right colour, right place
    for(i=0; i<4; i++) {   
      if(currentGuess[i].col == code[i]) {
        print("red");
        rest.push(new Key ("red", (columnWidth/2)+(columnWidth*(guesses.length+1)), 250+(rest.length*10)) );
        addressed.push(i)//i in code has been addressed
        continue;
      }
    }
    //right colour, wrong place
    for(i=0; i<4; i++) {   
      for(j=0; j<4; j++) {
       if(j==i) continue;
       if(addressed.includes(j)) continue;
        
        if(currentGuess[i].col == code[j]) {
          print("white");
          rest.push(new Key ("white", (columnWidth/2)+(columnWidth*(guesses.length+1)), 250+(rest.length*10)) );
          addressed.push(j);
          break;
        }
      }  
    }
    if(addressed.length != 0) feedback.push(rest);
    else feedback.push(null);
    
    //bank this guess
    var rest = [];
    for(i=0; i<4; i++) {
      rest.push(currentGuess[i]);
    }
    guesses.push(rest);
    currentGuess = [];
    
    if(guesses.length==maxGuess) gameOver = true;
  }
  
}

// mouse moved
function mouseMoved() {
  //check buttons
  for(i=0; i<buttons.length; i++) {
    buttons[i].isOn(mouseX, mouseY);
  }
}

// mouse released
function mouseReleased() {
  //check buttons
  for(i=0; i<buttons.length; i++) {
    if(buttons[i].on) {
      currentGuess.push(new Peg (buttons[i].col, (columnWidth/2)+(columnWidth*(guesses.length+1)), 50+(currentGuess.length*50)) );
    }
  }
  
  
}

class Peg {
  constructor(col, xval, yval) {
    this.col = col;
    
    this.x = xval; 
    this.y = yval; 

    this.rad = radius;
  }

  display() {
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

    this.rad = radius;

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

class Key {
  constructor(col, xval, yval) {
    this.col = col;
    
    this.x = xval; 
    this.y = yval; 

    this.rad = 2.5;
  }

  display() {
    fill(this.col);
    
    stroke(0)
    strokeWeight(1);
    circle(this.x, this.y, this.rad*2);
  }
}
