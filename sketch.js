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
var back = null;

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
    buttons.push(new Button (col[i], columnWidth/2, (columnWidth/2)+(columnWidth*i) ));
  }
  
  //create back button
  back = new Button("black", columnWidth/2, (columnWidth/2)+(columnWidth*6));
}

// gets called every frame
function draw() {
  background(255);
  
  //show buttons
  for(i=0; i<buttons.length; i++) {
    buttons[i].display();
  }
  
  //show back button
  back.display();
  
  //show guesses
  for(i=0; i<guesses.length; i++) {
    for(j=0; j<4; j++) {
      guesses[i][j].display();
    }
  }
  
  //show feedback
  for(i=0; i<feedback.length; i++) {
    if(feedback[i] == null) continue;
    for(j=0; j<feedback[i].length; j++) { //not all feedback has pegs
      feedback[i][j].display();
    }
  }
  
  //game over scenarios
  if(guesses.length==maxGuess) gameOver = true;
  if(feedback[feedback.length-1] != null) {
    var red = 0;
    if(feedback[feedback.length-1].length == 4) {
      for(i=0; i<4; i++) {
        if(feedback[feedback.length-1][i].col == "red") red++;
      }
      if(red == 4) gameOver = true;
    }
  }
  
  if(gameOver) { //show answer
    // practice: show computer's code
    for(i=0; i<code.length; i++) {
      var rest = new Peg(code[i], windowWidth-(columnWidth/2), (columnWidth/2)+(columnWidth*i));
      rest.display();
    }
    return;
  }
  
  //show current guess
  for(i=0; i<currentGuess.length; i++) {
    currentGuess[i].display();
  }
  
  //check guess 
  if(currentGuess.length==4) {

    rest = [];
    hasMatch = [];
    addressed = [];
    //counts
    var r = 0;
    var w = 0;
    
    //right colour, right place
    for(i=0; i<4; i++) {  
      if(currentGuess[i].col == code[i]) { 
        r++;
        addressed.push(i);//i in code has been addressed
        hasMatch.push(i);//i in guess has match
        continue;
      }
    }
    
    //right colour, wrong place
    for(i=0; i<4; i++) { //guess
      if(hasMatch.includes(i)) continue;
       
      for(j=0; j<4; j++) { //code
       if(j==i) continue;
       if(addressed.includes(j)) continue;
        
        if(currentGuess[i].col == code[j]) {
          w++;
          addressed.push(j);
          break;
        }
      }
    }
    
    
    // Load feedback
    for(i=0; i<r; i++) rest.push(new Key ("red", (columnWidth/2)+(columnWidth*(guesses.length+1)), (columnWidth/2)+(columnWidth*4)+(rest.length*(columnWidth/4)) ) );
    for(i=0; i<w; i++) rest.push(new Key ("white", (columnWidth/2)+(columnWidth*(guesses.length+1)), (columnWidth/2)+(columnWidth*4)+(rest.length*(columnWidth/4)) ) );
    
    if(addressed.length != 0) feedback.push(rest);
    else feedback.push(null);
    
    //bank this guess
    var rest = [];
    for(i=0; i<4; i++) {
      rest.push(currentGuess[i]);
    }
    guesses.push(rest);
    currentGuess = [];
  }
}

// mouse moved
function mouseMoved() {
  //check buttons
  for(i=0; i<buttons.length; i++) {
    buttons[i].isOn(mouseX, mouseY);
  }
  
  //check back
  back.isOn(mouseX, mouseY);
}

// mouse released
function mouseReleased() {
  //check buttons
  for(i=0; i<buttons.length; i++) {
    if(buttons[i].on) {
      currentGuess.push(new Peg (buttons[i].col, (columnWidth/2)+(columnWidth*(guesses.length+1)), (columnWidth/2)+(columnWidth*currentGuess.length) ) ); 
    }
  }
  
  //check back
  if(back.on && currentGuess.length != 0 && currentGuess.length != 4) {
    //delete last peg on current guess
    currentGuess.pop();
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
    rectMode(CENTER);
    if(this.col == "black") rect(this.x, this.y, this.rad*2, this.rad*2);
    else circle(this.x, this.y, this.rad*2); //centre x and y
    
    // colour change
    if(this.on) {
      fill(255, 200);
      
      if(this.col == "black") rect(this.x, this.y, this.rad*2, this.rad*2);
      else circle(this.x, this.y, this.rad*2); //centre x and y
    }
    
    //optional text
    if(this.col == "black") {
      fill(0);
      noStroke();
      var fontSize = (this.rad*2)/3; // 1/3 size of button 
      var letWidth = fontSize/2;
      textSize(fontSize);   
      text("Back", this.x-(letWidth*2), this.y-this.rad-3); //assume width of letter if half the font size
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

    this.rad = columnWidth/8;
  }

  display() {
    fill(this.col);
    
    stroke(0)
    strokeWeight(1);
    circle(this.x, this.y, this.rad*2);
  }
}
