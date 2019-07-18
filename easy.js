// distance: number of pixels a puzzle piece will move
const DISTANCE = 100;
const boxes = document.querySelectorAll("main div");
var result = false;
/**********************************
// STEP 1 - Create puzzlePieces data structure.
// I suggest using an array of objects but feel free to change that
// An example of a puzzle piece object could be: { name: ".box1", x: 0, y: 0 }
**********************************/

//declaring the x and y co-ordinates so the base gets ready

const puzzlePieces = [
  { name: ".box1", x:0, y:0},
  { name: ".box2", x:100, y:0},
  { name: ".box3", x:200, y:0},
  { name: ".box4", x:300, y:0},
  { name: ".box5", x:0, y:100},
  { name: ".box6", x:100, y:100},
  { name: ".box7", x:200, y:100},
  { name: ".box8", x:300, y:100},
  { name: ".box9", x:0, y:200},
  { name: ".box10", x:100, y:200},
  { name: ".box11", x:200, y:200},
  { name: ".box12", x:300, y:200},
  { name: ".box13", x:0, y:300},
  { name: ".box14", x:100, y:300},
  { name: ".box15", x:200, y:300},
];

// blankSpace: initialize blank square as last piece so as to remember where it is.
// Will eventually use it to ask direction of clicked puzzle piece(s).
// Once pieces move, must remember to update x,y values to new blank space coords
const blankSpace = { x: 300, y: 300, order: 16 };

// I'm structuring my program sort of like how Vue does it - all in my puzzle object below.

//declaring an object called puzzle
const puzzle = {
  pieces: puzzlePieces,
  distance: DISTANCE,
  blankSpace,
  currentPiece: null,
  directionToMove: "",
  //initialize funtion to start the game
  initialize: function() {

    /************************************     
    // STEP 2 - Implement initialize function such that it
    // attache click event handlers for each piece
    // and within that, invokes the slide function
    ***************************************/

    boxes.forEach(box=>box.addEventListener('click', this.slide));
    // show puzzle pieces
    this.display();
  },

  //this function right here displays what we've defined above
  display: function() {
    // initialize pieces to their proper order
    this.pieces.forEach(piece => {
      const pieceDOM = document.querySelector(piece.name);
      TweenLite.set(pieceDOM, { x: piece.x, y: piece.y });
    });
  },


  //slide function to actually move the puzzle pieces 
  //also passing an event to it to focus on the div tag on which the user has clicked on

  slide: function(e) {
    // call isMoveable to find out direction to move
    // remember to adjust coordinates including adjusting blank piece's coordinates
    /************************************
    // STEP 4 - Implement slide function so that you set x,y coordinates of appropriate puzzle piece(s)
    *********************************/
    puzzle.currentPiece = puzzle.pieces[e.target.dataset.idx];
    puzzle.secondPiece = puzzle.pieces[e.target.dataset.idx - 1];
    puzzle.thirdPiece = puzzle.pieces[e.target.dataset.idx - 2];
    directionToMove = puzzle.isMoveable();

    console.log(this);
    // Now animate current puzzle piece now that x, y coordinates have been set above
    
  
    //  TweenMax.to(puzzle.currentPiece, 0.17, {
    //    x: puzzle.pieces[this.currentPiece.dataset.idx].x,
    //    y: puzzle.pieces[this.currentPiece.dataset.idx].y,
    //    ease: Power0.easeNone
    //  });

    //code to move the puzzle piece
    if((directionToMove=="up-down")||(directionToMove=="left-right")){
       TweenMax.to(this, 0.17, {
       x: puzzle.currentPiece.x,//blankSpace.x,
       y: puzzle.currentPiece.y,//blankSpace.y,
       ease: Power0.easeNone
     });
    }
    

  },

  //this is the function that checks the direction and sees if the cube is moving in x or in y 

  isMoveable: function() {
    /********************************************
    // STEP 3 - Implement isMoveable function to find out / return which direction to move
    // Is the clicked piece movable?
    // If yes, then return a direction to one of: "up", "down", "left", "right"
    // If no, then return a direction of ""
    /******************************************/
    // console.log(puzzle.currentPiece);
    // console.log(blankSpace);
    

    //if conditions to determine if the cube is movable
    if(puzzle.currentPiece.x == blankSpace.x){
       
        if((puzzle.currentPiece.y == blankSpace.y - 100)||(puzzle.currentPiece.y == blankSpace.y + 100)){
          var yOfCurrent = puzzle.currentPiece.y;
          puzzle.currentPiece.y = blankSpace.y;
          blankSpace.y = yOfCurrent;
          console.log("change in y");
          return "up-down";
        }
        else {
          return "too far";
        }
    }
    if(puzzle.currentPiece.y == blankSpace.y){
      if((puzzle.currentPiece.x == blankSpace.x - 100)||(puzzle.currentPiece.x == blankSpace.x + 100)){
        var xOfCurrent = puzzle.currentPiece.x;
        puzzle.currentPiece.x = blankSpace.x;
        blankSpace.x = xOfCurrent;
        console.log("change in x");
        return "left-right";
      }
      else{
        return "too far";
      }
    }
  }
};

//calling in initialize function to get the code going!
puzzle.initialize();

/* 
STEP 5 - Comment each function implemented
STEP 6 - Submit to github
STEP 7 - host on web server
*/
